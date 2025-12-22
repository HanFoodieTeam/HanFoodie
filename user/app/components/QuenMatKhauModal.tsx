// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function QuenMatKhauPage() {
//   const [email, setEmail] = useState("");
//   const [thongBao, setThongBao] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setThongBao("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/quen_mat_khau", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.thong_bao || "Gửi yêu cầu thất bại");
//       }

//       setThongBao("✅ Mật khẩu mới đã được gửi đến email của bạn!");
//       setEmail("");

//       setTimeout(() => {
//         router.push("/dang-nhap");
//       }, 2000);
//     } catch (error) {
//       setThongBao(
//         error instanceof Error
//           ? `❌ ${error.message}`
//           : "❌ Có lỗi xảy ra, vui lòng thử lại!"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Quên Mật Khẩu
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Nhập email của bạn
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="example@gmail.com"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg text-white font-semibold transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-emerald-600 hover:bg-emerald-700"
//             }`}
//           >
//             {loading ? "Đang xử lý..." : "Gửi mật khẩu mới"}
//           </button>
//         </form>

//         {thongBao && (
//           <p
//             className={`text-center mt-4 font-medium ${
//               thongBao.startsWith("✅") ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {thongBao}
//           </p>
//         )}

//         <div className="text-center mt-6 text-sm text-gray-600">
//           <p>
//             Đã nhớ mật khẩu?{" "}
//             <button
//               type="button"
//               onClick={() => router.push("/dang-nhap")}
//               className="text-emerald-600 font-medium hover:underline"
//             >
//               Đăng nhập ngay
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

interface QuenMatKhauModalProps {
  onClose: () => void;
}

export default function QuenMatKhauModal({ onClose }: QuenMatKhauModalProps) {
  const [email, setEmail] = useState("");
  const [thongBao, setThongBao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setThongBao("");
    setLoading(true);

    try {
      const res = await fetch("/api/quen_mat_khau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.thong_bao || "Gửi yêu cầu thất bại");

      setThongBao("✅ Mật khẩu mới đã được gửi đến email của bạn!");
      setEmail("");
    } catch (error) {
      setThongBao(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Có lỗi xảy ra, vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        {/* nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Quên mật khẩu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nhập email của bạn
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="@gmail.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Gửi mật khẩu mới"}
          </button>
        </form>

        {thongBao && (
          <p
            className={`text-center mt-4 font-medium ${
              thongBao.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {thongBao}
          </p>
        )}
      </div>
    </div>
  );
}
