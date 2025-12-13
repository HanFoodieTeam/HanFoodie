"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IBanner } from "@/lib/cautrucdata";

type LoaiKey = "all" | "main" | "sub";

function BannerListContent() {
    const router = useRouter();
    const params = useSearchParams();
    
    const loaiParam = (params.get("loai") || "all") as LoaiKey;
    const qParam = params.get("search") || "";
    const pageParam = Number(params.get("page") || 1);

    const [allData, setAllData] = useState<IBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(qParam);
    const [confirmItem, setConfirmItem] = useState<IBanner | null>(null);

    const pageSize = 10;

    const updateQuery = (updates: Record<string, string | undefined>) => {
        const newParams = new URLSearchParams(params.toString());
        Object.entries(updates).forEach(([key, val]) => {
            if (val && val !== "") newParams.set(key, val);
            else newParams.delete(key);
        });
        router.replace(`/banner?${newParams.toString()}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/banner");
                const json = await res.json();
                setAllData(json.data || []);
            } catch (err) {
                console.error("Lỗi lấy banner:", err);
                setAllData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setSearchInput(qParam);
    }, [qParam]);

    useEffect(() => {
        const delay = setTimeout(() => {
            updateQuery({
                search: searchInput.trim() || undefined,
                page: "1",
            });
        }, 500);
        return () => clearTimeout(delay);
    }, [searchInput]);

    const filtered = useMemo(() => {
        let tmp = [...allData];

        const q = qParam.trim().toLowerCase();
        if (q) {
            tmp = tmp.filter((x) => (x.mo_ta || "").toLowerCase().includes(q));
        }

        if (loaiParam === "main") {
            tmp = tmp.filter((x) => Number(x.loai) === 0); 
        }
        else if (loaiParam === "sub") {
            tmp = tmp.filter((x) => Number(x.loai) === 1); 
        }


        return tmp;
    }, [allData, qParam, loaiParam]);


    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(Math.max(1, pageParam), totalPages);
    const pageData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const confirmToggle = async () => {
        if (!confirmItem) return;

        const id = confirmItem.id;
        const newState = !confirmItem.an_hien;

        try {
            const res = await fetch(`/api/banner/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ an_hien: newState }),
            });

            if (res.ok) {
                setAllData((prev) =>
                    prev.map((it) => (it.id === id ? { ...it, an_hien: newState } : it))
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setConfirmItem(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Banner</h1>

                <div className="flex items-center gap-2">

                    <select value={loaiParam} onChange={(e) =>
                            updateQuery({
                                loai: e.target.value === "all" ? undefined : e.target.value,
                                page: "1",
                            })
                        }
                        className="border rounded-lg px-3 py-1.5 text-sm" >
                        <option value="all">Tất cả</option>
                        <option value="main">Banner chính</option>
                        <option value="sub">Banner phụ</option>
                    </select>

                    {/* <div className="flex items-center border rounded-lg px-2 py-1.5 bg-white relative">
                        <input type="text" placeholder="Tìm mô tả..." value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="outline-none text-sm w-52"/>
                        {searchInput && (
                            <button
                                onClick={() => {
                                    setSearchInput("");
                                    updateQuery({ search: undefined });
                                }}
                                className="absolute right-2 text-gray-500 hover:text-red-500">
                                ✕
                            </button>
                        )}
                    </div> */}

                    <Link
                        href="/banner/them"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded-lg text-sm shadow">
                        Thêm banner
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="min-w-full text-base text-left">
                    <thead className="bg-gray-300 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-3 ">Ảnh</th>
                            <th className="px-4 py-3 text-center">Mô tả</th>
                            <th className="px-4 py-3 text-center">Thứ tự</th>
                            <th className="px-4 py-3 text-center">Loại</th>
                            <th className="px-4 py-3 text-center">Trạng thái</th>
                            <th className="px-4 py-3 text-center">Sửa</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-6">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : pageData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            pageData.map((b) => (
                                <tr key={b.id} className="border-t hover:bg-gray-100">


                                    <td className="px-4 py-3 w-[400px]">
                                        <div className="relative w-full h-[140px] rounded overflow-hidden">
                                            <Image src={b.hinh} alt="" fill className="object-cover"/>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 max-w-[250px] truncate text-center">
                                        {b.mo_ta || "-"}
                                    </td>

                                    <td className="px-4 py-3 text-center text-base">{b.thu_tu}</td>

                                    <td className="px-4 py-3 text-center text-base">
                                        {Number(b.loai) === 0 ? (
                                            <span className="text-blue-600 font-semibold">Banner chính</span>
                                        ) : (
                                            <span className="text-orange-600 font-semibold">Banner phụ</span>
                                        )}
                                    </td>

                                    <td
                                        className="px-4 py-3 text-center cursor-pointer text-2xl text-center"
                                        onClick={() => setConfirmItem(b)} >
                                        {b.an_hien ? "✅" : "❌"}
                                    </td>

                                    <td className="px-4 py-3 text-center text-center">
                                        <Link
                                            href={`/banner/${b.id}`}
                                            className="text-blue-600 hover:text-blue-800" >
                                            Sửa
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={() => updateQuery({ page: "1" })} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded">
                    Đầu
                </button>

                {Array.from({ length: 3 }, (_, i) => {
                    const p = currentPage - 1 + i;
                    return (
                        p >= 1 &&
                        p <= totalPages && (
                            <button
                                key={p}
                                onClick={() => updateQuery({ page: String(p) })}
                                className={`px-3 py-1 rounded ${p === currentPage ? "bg-blue-500 text-white font-bold" : "bg-gray-200"
                                    }`}>
                                {p}
                            </button>
                        )
                    );
                })}

                <button
                    onClick={() => updateQuery({ page: String(totalPages) })}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded">
                    Cuối
                </button>
            </div>

            {confirmItem && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow w-[380px]">
                        <h2 className="text-lg font-semibold mb-3 text-center">
                            Thay đổi trạng thái
                        </h2>
                        <p className="text-center mb-5">
                            Bạn muốn {confirmItem.an_hien ? "ẩn" : "hiển thị"} banner này?
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={confirmToggle}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                Có
                            </button>
                            <button
                                onClick={() => setConfirmItem(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function BannerList() {
    return (
        <Suspense fallback={<div className="p-4">Đang tải banner...</div>}>
            <BannerListContent />
        </Suspense>
    );
}
