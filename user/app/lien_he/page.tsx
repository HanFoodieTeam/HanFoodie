"use client";

import { useState } from "react";
import { Truck, Shield, Gift, Headphones } from "lucide-react";

export default function LienHePage() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/lien_he", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setStatus("Gửi thất bại. Vui lòng thử lại!");
        setIsSending(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setStatus("Gửi thành công!");
        form.reset();
      } else {
        setStatus("Gửi thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi fetch API:", error);
      setStatus("Gửi thất bại. Vui lòng thử lại!");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF1F1] overflow-x-hidden">
      <div className="flex flex-col md:flex-row min-h-screen">

        {/* Cột trái: Logo + info + 4 box hỗ trợ */}
        <div className="md:w-1/2 flex flex-col items-center justify-start bg-[#6A0A0A] p-6 md:p-12 overflow-hidden">
          <div className="w-full flex flex-col items-center overflow-y-auto max-h-screen">
            <img
              src="/logo.png"
              alt="HanFoodie Logo"
              className="w-72 md:w-96 object-contain mb-8"
            />
            <div className="text-white space-y-2 text-center mb-8">
              <p><span className="font-semibold">Địa chỉ:</span> 123 Đường Han, Quận 1, TP. HCM</p>
              <p><span className="font-semibold">Email:</span> support@hanfoodie.com</p>
              <p><span className="font-semibold">Điện thoại:</span> +84 912 345 678</p>
              <p><span className="font-semibold">Giờ làm việc:</span> 8:00 - 20:00 (T2-CN)</p>
            </div>

            {/* Box chính sách & hỗ trợ */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <Truck className="w-6 h-6 text-[#6A0A0A]" />
                <div>
                  <h3 className="font-semibold text-[#6A0A0A] mb-1">Giao hàng nhanh</h3>
                  <p className="text-gray-600 text-sm">Đảm bảo giao hàng trong 24h với mọi đơn hàng.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <Shield className="w-6 h-6 text-[#6A0A0A]" />
                <div>
                  <h3 className="font-semibold text-[#6A0A0A] mb-1">Bảo mật thông tin</h3>
                  <p className="text-gray-600 text-sm">Cam kết bảo mật dữ liệu khách hàng 100%.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <Gift className="w-6 h-6 text-[#6A0A0A]" />
                <div>
                  <h3 className="font-semibold text-[#6A0A0A] mb-1">Ưu đãi đặc biệt</h3>
                  <p className="text-gray-600 text-sm">Nhận voucher và khuyến mãi dành riêng cho bạn.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <Headphones className="w-6 h-6 text-[#6A0A0A]" />
                <div>
                  <h3 className="font-semibold text-[#6A0A0A] mb-1">Hỗ trợ 24/7</h3>
                  <p className="text-gray-600 text-sm">Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Form liên hệ */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-6 overflow-hidden">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">Liên hệ với HanFoodie</h1>
            <p className="text-gray-700 mb-6">
              Vui lòng điền thông tin để chúng tôi hỗ trợ bạn nhanh nhất.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0A0A] transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Tiêu đề"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0A0A] transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0A0A] transition"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Nội dung liên hệ..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A0A0A] transition resize-none"
              />

              {!isSending ? (
                <button
                  type="submit"
                  className="mt-2 py-3 rounded-xl bg-[#6A0A0A] text-white font-semibold hover:bg-[#8C0F0F] transition-transform active:scale-95"
                >
                  Gửi
                </button>
              ) : (
                <div className="mt-2 py-3 rounded-xl bg-gray-300 text-gray-700 font-semibold text-center">
                  Đang gửi...
                </div>
              )}

              {status && (
                <p
                  className={`mt-2 text-center font-medium ${status.includes("thành công") ? "text-green-600" : "text-red-600"}`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
