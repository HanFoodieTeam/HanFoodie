"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ILoaiBaiViet } from "@/app/lib/cautrucdata";

export default function SuaLoaiBaiViet() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState<ILoaiBaiViet>({
    id: 0,
    ten_loai: "",
    slug: "",
    thu_tu: 0,
    an_hien: true,
  });
  const [loading,setLoading] = useState(false);
  const [initialLoading,setInitialLoading] = useState(true);
  const [error,setError] = useState<string|null>(null);

  useEffect(()=>{
    if(!id) return;
    const fetchData = async ()=>{
      try{
        const res = await fetch(`/api/loai_bai_viet/${id}`);
        const json = await res.json();
        if(!res.ok || !json.success) throw new Error("Không có dữ liệu");
        setForm({...json.data, an_hien: !!json.data.an_hien});
      }catch(err){
        console.error(err);
        alert("Lỗi khi tải dữ liệu");
        router.push("/loai_bai_viet");
      }finally{ setInitialLoading(false); }
    }
    fetchData();
  },[id,router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value,type} = e.target;
    setForm(prev=>({...prev,[name]:type==="number"?Number(value):type==="radio"?value==="true":value}));
  };

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.ten_loai.trim()){ setError("Tên loại không được để trống"); return; }
    setLoading(true);
    try{
      const res = await fetch(`/api/loai_bai_viet/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ten_loai:form.ten_loai, slug:form.slug, thu_tu:form.thu_tu, an_hien:form.an_hien})
      });
      const json = await res.json();
      if(res.ok && json.success){ alert("Cập nhật thành công"); router.push("/loai_bai_viet"); }
      else alert("Cập nhật thất bại: "+json.message);
    }catch(err){ console.error(err); alert("Lỗi server"); }
    finally{ setLoading(false); }
  };

  if(initialLoading) return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">CẬP NHẬT LOẠI BÀI VIẾT</h1>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label>Tên loại</label>
          <input name="ten_loai" value={form.ten_loai} onChange={handleChange} className="border p-2 rounded w-full"/>
        </div>
        <div>
          <label>Slug</label>
          <input name="slug" value={form.slug?? ""} onChange={handleChange} className="border p-2 rounded w-full"/>
        </div>
        <div>
          <label>Thứ tự</label>
          <input type="number" name="thu_tu" value={form.thu_tu} onChange={handleChange} className="border p-2 rounded w-full"/>
        </div>
        <div>
          <label>Trạng thái</label>
          <div className="flex gap-6">
            <label><input type="radio" name="an_hien" value="true" checked={form.an_hien===true} onChange={handleChange}/> Hiện</label>
            <label><input type="radio" name="an_hien" value="false" checked={form.an_hien===false} onChange={handleChange}/> Ẩn</label>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end mt-4">
          <button disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded-lg">{loading?"Đang lưu...":"Cập nhật"}</button>
        </div>
      </form>
    </div>
  );
}
