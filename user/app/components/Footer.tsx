"use client";

import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#640000] text-white py-3">
      <div className="mx-auto max-w-[80%] grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* Cột 1 - Logo + mô tả */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="HanFoodie"
              width={140}
              height={80}
              className="object-contain"
            />
          </div>

          <p className="opacity-90 leading-relaxed text-sm">
            HanFoodie - Mang hương vị chuẩn Hàn đến bữa ăn Việt.
            Chuyên cung cấp món ăn, nguyên liệu và thực phẩm Hàn Quốc chất lượng cao.
          </p>
        </div>

        {/* Cột 2 - Sản phẩm */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-yellow-300">Sản phẩm</h4>
          <ul className="space-y-2 text-sm opacity-95">
            <li className="hover:text-yellow-300 cursor-pointer">Món ăn Hàn Quốc</li>
            <li className="hover:text-yellow-300 cursor-pointer">Kim chi & đồ muối</li>
            <li className="hover:text-yellow-300 cursor-pointer">Tokbokki & Topokki</li>
            <li className="hover:text-yellow-300 cursor-pointer">Mì - Gia vị - Nước sốt</li>
            <li className="hover:text-yellow-300 cursor-pointer">Combo ăn nhanh</li>
            <li className="hover:text-yellow-300 cursor-pointer">Thực phẩm khô</li>
          </ul>
        </div>

        {/* Cột 3 - Chính sách */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-yellow-300">Chính sách</h4>
          <ul className="space-y-2 text-sm opacity-95">
            <li className="hover:text-yellow-300 cursor-pointer">Chính sách giao hàng</li>
            <li className="hover:text-yellow-300 cursor-pointer">Chính sách đổi trả</li>
            <li className="hover:text-yellow-300 cursor-pointer">Chính sách bảo mật</li>
            <li className="hover:text-yellow-300 cursor-pointer">Điều khoản sử dụng</li>
            <li className="hover:text-yellow-300 cursor-pointer">Hướng dẫn mua hàng</li>
            <li className="hover:text-yellow-300 cursor-pointer">Liên hệ hỗ trợ</li>
          </ul>
        </div>

        {/* Cột 4 - Thông tin cửa hàng */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-yellow-300">Thông tin cửa hàng</h4>
          <ul className="space-y-2 text-sm opacity-95">
            <li>Mã số thuế: 023122004</li>
            <li>Ngày thành lập: 10/10/2025</li>
            <li>Đ/c: CVPM Quang Trung - TP.HCM</li>
            <li>Hotline: 0789 214 856</li>
            <li>Email: hanfoodie@gmail.com</li>
            <li>Thời gian hoạt động: 8:00 - 22:00 (T2 - CN)</li>
          </ul>
        </div>
      </div>

      <div className="mt-1 border-t border-white/20 pt-5 text-center text-sm opacity-80">
        © 2025 HanFoodie - Korean Food Store. All rights reserved.
      </div>
    </footer>
  );
}
