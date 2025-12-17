
// "use client";

// import { useState } from "react";
// import { INguoiDung } from "@/lib/cautrucdata";

// interface LoginFormProps {
//   onClose: () => void;
//   onLoginSuccess: (nguoiDung: INguoiDung) => void;
//   onSwitchToRegister: () => void;
// }

// export default function LoginForm({
//   onClose,
//   onLoginSuccess,
//   onSwitchToRegister,
// }: LoginFormProps) {
//   const [email, setEmail] = useState("");
//   const [matKhau, setMatKhau] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [thongBao, setThongBao] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setThongBao("");

//     try {
//       const res = await fetch("/api/dang_nhap", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, mat_khau: matKhau }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.thong_bao || "Đăng nhập thất bại");

//       const nguoiDung: INguoiDung = {
//         ...data.nguoi_dung,
//         sdt: Number(data.nguoi_dung.sdt),
//       };

//       localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDung));
//       localStorage.setItem("token", data.token);

//       setThongBao("Đăng nhập thành công!");


//       setTimeout(() => onClose(), 1000);
//     } catch (error) {
//       setThongBao(error instanceof Error ? error.message : "Lỗi không xác định");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-xl font-semibold text-center">Đăng nhập</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full border rounded-lg p-2"
//         required
//       />

//       <input
//         type="password"
//         placeholder="Mật khẩu"
//         value={matKhau}
//         onChange={(e) => setMatKhau(e.target.value)}
//         className="w-full border rounded-lg p-2"
//         required />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-[#6A0A0A] text-white py-2 rounded-lg hover:bg-[#800000] transition"
//       >
//         {loading ? "Đang xử lý..." : "Đăng nhập"}
//       </button>
//       <p className="text-center text-sm">
//         Bạn chưa có tài khoản tại HanFoodie?
//         <span
//           className="text-blue-600 cursor-pointer ml-1 hover:underline"
//           onClick={(e) => {
//             e.preventDefault();
//             console.log("ĐÃ CLICK ĐĂNG nhập");
//             onSwitchToRegister?.();
//           }} >
//           Đăng ký
//         </span>
//       </p>

//       {thongBao && <p className="text-center text-sm text-red-500">{thongBao}</p>}
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { INguoiDung } from "@/lib/cautrucdata";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (nguoiDung: INguoiDung) => void;
  onSwitchToRegister: () => void;
}

interface FormErrors {
  email?: string;
  matKhau?: string;
  chung?: string;
}

export default function LoginForm({
  onClose,
  onLoginSuccess,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loading, setLoading] = useState(false);
  const [dangThanhCong, setDangThanhCong] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      newErrors.email = "Email phải đúng định dạng @gmail.com";
    }

    if (!matKhau) {
      newErrors.matKhau = "Mật khẩu không được để trống";
    } else if (matKhau.length < 6) {
      newErrors.matKhau = "Mật khẩu phải ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/dang_nhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mat_khau: matKhau }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ chung: data.thong_bao || "Đăng nhập thất bại" });
        return;
      }

      const nguoiDung: INguoiDung = {
        ...data.nguoi_dung,
        sdt: Number(data.nguoi_dung.sdt),
      };

      localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDung));
      localStorage.setItem("token", data.token);

      onLoginSuccess(nguoiDung);
      setDangThanhCong(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch {
      setErrors({ chung: "Có lỗi xảy ra, vui lòng thử lại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Đăng nhập</h2>

      <div>
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading || dangThanhCong}
          className="w-full border rounded-lg p-2" />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={matKhau}
          onChange={(e) => setMatKhau(e.target.value)}
          disabled={loading || dangThanhCong}
          className="w-full border rounded-lg p-2"/>
        {errors.matKhau && (
          <p className="text-sm text-red-500">{errors.matKhau}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || dangThanhCong}
        className={`w-full py-2 rounded-lg text-white transition ${
          dangThanhCong
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#6A0A0A] hover:bg-[#800000]"
        }`}>
        {loading
          ? "Đang xử lý..."
          : dangThanhCong
          ? "Đăng nhập thành công"
          : "Đăng nhập"}
      </button>

      {errors.chung && (
        <p className="text-center text-sm text-red-500">{errors.chung}</p>
      )}

      <p className="text-center text-sm">
        Bạn chưa có tài khoản tại HanFoodie?
        <span
          className="text-blue-600 cursor-pointer ml-1 hover:underline"
          onClick={onSwitchToRegister}>
          Đăng ký
        </span>
      </p>
    </form>
  );
}
