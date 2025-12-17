
// "use client";

// import { useState } from "react";
// import { INguoiDung } from "@/lib/cautrucdata";

// interface RegisterFormProps {
//   onClose: () => void;
//   onRegisterSuccess: (nguoiDungMoi: INguoiDung) => void;
//   onSwitchToLogin: () => void;   
// }

// export default function RegisterForm({
//   onClose,
//   onRegisterSuccess,
//   onSwitchToLogin,     
// }: RegisterFormProps) {
//   const [ho_ten, setHoTen] = useState("");
//   const [email, setEmail] = useState("");
//   const [sdt, setSdt] = useState<number | undefined>();
//   const [mat_khau, setMatKhau] = useState("");
//   const [go_lai_mat_khau, setGoLaiMatKhau] = useState("");
//   const [thongBao, setThongBao] = useState("");
//   const [dangThanhCong, setDangThanhCong] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!sdt) return setThongBao("Vui lòng nhập số điện thoại");

//     const res = await fetch("/api/dang_ky", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ho_ten, email, sdt, mat_khau, go_lai_mat_khau }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setThongBao(data.thong_bao);
//     } else {
//       setThongBao("Đăng ký thành công!");
//       setDangThanhCong(true);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       const nguoiDungMoi: INguoiDung = data.nguoi_dung;
//       localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDungMoi));
//       onRegisterSuccess(nguoiDungMoi);

//       setTimeout(() => onClose(), 2000);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <h2 className="text-xl font-semibold text-center">Đăng ký</h2>

//       <input
//         type="text"
//         placeholder="Họ tên"
//         value={ho_ten}
//         onChange={(e) => setHoTen(e.target.value)}
//         className="border w-full p-2 rounded"
//         disabled={dangThanhCong}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border w-full p-2 rounded"
//         disabled={dangThanhCong}
//       />

//       <input
//         type="number"
//         placeholder="Số điện thoại"
//         value={sdt ?? ""}
//         onChange={(e) => setSdt(Number(e.target.value))}
//         className="border w-full p-2 rounded"
//         disabled={dangThanhCong}
//       />

//       <input
//         type="password"
//         placeholder="Mật khẩu"
//         value={mat_khau}
//         onChange={(e) => setMatKhau(e.target.value)}
//         className="border w-full p-2 rounded"
//         disabled={dangThanhCong}
//       />

//       <input
//         type="password"
//         placeholder="Gõ lại mật khẩu"
//         value={go_lai_mat_khau}
//         onChange={(e) => setGoLaiMatKhau(e.target.value)}
//         className="border w-full p-2 rounded"
//         disabled={dangThanhCong}
//       />

//       <button
//         type="submit"
//         disabled={dangThanhCong}
//         className={`w-full p-2 rounded text-white transition-all ${
//           dangThanhCong
//             ? "bg-green-600 cursor-not-allowed"
//             : "bg-[#6A0A0A] hover:opacity-90"
//         }`}
//       >
//         {dangThanhCong ? "Đăng ký thành công" : "Đăng ký"}
//       </button>

//       <p className="text-center text-sm">
//         Đã có tài khoản?{" "}
//         <button
//           type="button"
//           onClick={onSwitchToLogin}    
//           className="text-blue-600 hover:underline"
//         >
//           Đăng nhập
//         </button>
//       </p>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { INguoiDung } from "@/lib/cautrucdata";

interface RegisterFormProps {
  onClose: () => void;
  onRegisterSuccess: (nguoiDungMoi: INguoiDung) => void;
  onSwitchToLogin: () => void;
}

interface FormErrors {
  ho_ten?: string;
  email?: string;
  sdt?: string;
  mat_khau?: string;
  go_lai_mat_khau?: string;
  chung?: string;
}

export default function RegisterForm({
  onClose,
  onRegisterSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [ho_ten, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState(""); // ⚠️ dùng string cho SĐT
  const [mat_khau, setMatKhau] = useState("");
  const [go_lai_mat_khau, setGoLaiMatKhau] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [dangThanhCong, setDangThanhCong] = useState(false);

  // ===== VALIDATE FRONTEND =====
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (ho_ten.trim().length < 5) {
      newErrors.ho_ten = "Họ tên phải ít nhất 5 ký tự";
    }

    if (!/^[^\s@]+@gmail\.com$/.test(email)) {
      newErrors.email = "Email phải đúng định dạng @gmail.com";
    }

    if (!/^0\d{9}$/.test(sdt)) {
      newErrors.sdt = "Số điện thoại phải gồm 10 số và bắt đầu bằng 0";
    }

    if (mat_khau.length < 6) {
      newErrors.mat_khau = "Mật khẩu phải ít nhất 6 ký tự";
    }

    if (go_lai_mat_khau !== mat_khau) {
      newErrors.go_lai_mat_khau = "Mật khẩu nhập lại không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/dang_ky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ho_ten,
          email,
          sdt,
          mat_khau,
          go_lai_mat_khau,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ chung: data.thong_bao || "Đăng ký thất bại" });
        return;
      }

      setDangThanhCong(true);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      const nguoiDungMoi: INguoiDung = data.nguoi_dung;
      localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDungMoi));

      onRegisterSuccess(nguoiDungMoi);

      setTimeout(() => onClose(), 2000);
    } catch {
      setErrors({ chung: "Có lỗi xảy ra, vui lòng thử lại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-semibold text-center">Đăng ký</h2>

      <div>
        <input
          type="text"
          placeholder="Họ tên"
          value={ho_ten}
          onChange={(e) => setHoTen(e.target.value)}
          disabled={dangThanhCong}
          className="border w-full p-2 rounded" />
        {errors.ho_ten && <p className="text-sm text-red-500">{errors.ho_ten}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={dangThanhCong}
          className="border w-full p-2 rounded" />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Số điện thoại"
          value={sdt}
          maxLength={10}
          onChange={(e) =>
            setSdt(e.target.value.replace(/\D/g, ""))
          }
          disabled={dangThanhCong}
          className="border w-full p-2 rounded" />
        {errors.sdt && <p className="text-sm text-red-500">{errors.sdt}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={mat_khau}
          onChange={(e) => setMatKhau(e.target.value)}
          disabled={dangThanhCong}
          className="border w-full p-2 rounded" />
        {errors.mat_khau && (
          <p className="text-sm text-red-500">{errors.mat_khau}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Gõ lại mật khẩu"
          value={go_lai_mat_khau}
          onChange={(e) => setGoLaiMatKhau(e.target.value)}
          disabled={dangThanhCong}
          className="border w-full p-2 rounded" />
        {errors.go_lai_mat_khau && (
          <p className="text-sm text-red-500">
            {errors.go_lai_mat_khau}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || dangThanhCong}
        className={`w-full p-2 rounded text-white transition ${dangThanhCong
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#6A0A0A] hover:opacity-90"
          }`}>
        {loading
          ? "Đang xử lý..."
          : dangThanhCong
            ? "Đăng ký thành công"
            : "Đăng ký"}
      </button>

      {errors.chung && (
        <p className="text-center text-sm text-red-500">{errors.chung}</p>
      )}

      <p className="text-center text-sm">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:underline">
          Đăng nhập
        </button>
      </p>
    </form>
  );
}
