// // "use client";

// // import Image from "next/image";
// // import React from "react";

// // export default function Footer() {
// //   return (
// //     <footer className="mt-20 bg-[#7a0c0c] text-white py-10">
// //       <div className="container-footer container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

// //         {/* Logo */}
// //         <div className="footer-item">
// //           <Image
// //             src="....."
// //             alt="HanFoodie"
// //             width={140}
// //             height={80}
// //             className="object-contain"
// //           />
// //         </div>

// //         {/* Sản phẩm */}
// //         <div className="footer-item">
// //           <h4 className="font-semibold mb-3">Sản phẩm về chúng tôi</h4>
// //           <div className="footer-tt">.......</div>
// //           <div className="footer-tt">.......</div>
// //           <div className="footer-tt">.......</div>
// //           <div className="footer-tt">.......</div>
// //           <div className="footer-tt">.......</div>
// //           <div className="footer-tt">.......</div>
// //         </div>

// //         {/* Thông tin */}
// //         <div className="footer-item">
// //           <h4 className="font-semibold mb-3">Thông tin</h4>
// //           <div className="footer-tt">Mã số thuế: 023122004</div>
// //           <div className="footer-tt">Ngày thành lập: 10/10/2025</div>
// //           <div className="footer-tt">Đ/c: CVPM Quang Trung</div>
// //         </div>

// //         {/* Chính sách */}
// //         <div className="footer-item">
// //           <h4 className="font-semibold mb-3">Chính sách</h4>
// //           <div className="footer-tt">Về chính sách giao hàng</div>
// //           <div className="footer-tt">Về chính sách tuyển dụng</div>
// //           <div className="footer-tt">Về chính sách hoàn trả</div>
// //           <div className="footer-tt">Về chính sách đổi mới</div>
// //         </div>

// //         {/* Subscribe */}
// //         <div className="footer-item">
// //           <h4 className="font-semibold mb-3">Subscribe</h4>

// //           <label className="flex items-center bg-white rounded-lg overflow-hidden">
// //             <input
// //               type="email"
// //               className="footer_email flex-1 px-3 py-2 text-black outline-none"
// //               placeholder="Địa chỉ email..."
// //             />
// //             <a
// //               href="#"
// //               className="bg-orange-400 px-4 py-2 text-white hover:bg-orange-500"
// //             >
// //               <i className="fa-solid fa-arrow-right"></i>
// //             </a>
// //           </label>

// //           <p className="mt-3 text-sm opacity-90">
// //             Xin chào, nếu bạn có thắc mắc gì vui lòng hãy liên hệ với chúng tôi qua email.
// //             Mọi thắc mắc sẽ được hỗ trợ trong thời gian sớm nhất.
// //           </p>
// //         </div>

// //       </div>
// //     </footer>
// //   );
// // }
// "use client";

// import Image from "next/image";
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="mt-0 bg-[#640000] text-white py-14 relative">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-5">

//         {/* Logo + intro */}
//         <div>
//           <div className="flex items-center gap-3 mb-4">
//             <Image
//               src="/public/logo.png"
//               alt="HanFoodie"
//               width={60}
//               height={60}
//               className="object-contain"
//             />
//           </div>

//           <p className="opacity-90 leading-relaxed text-sm">
//             HanFoodie - Mang hương vị chuẩn Hàn đến bữa ăn Việt.
//             Chúng tôi cung cấp các món ăn, thực phẩm và nguyên liệu Hàn Quốc chất lượng cao.
//           </p>
//         </div>

//         {/* Product categories */}
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Sản phẩm</h4>
//           <ul className="space-y-2 text-sm opacity-95">
//             <li className="hover:text-yellow-300 cursor-pointer">Món ăn Hàn Quốc</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Kim chi & đồ muối</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Các loại Tokbokki</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Mì - Gia vị - Nước sốt</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Combo ăn nhanh</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Thực phẩm khô</li>
//           </ul>
//         </div>

//         {/* Info */}
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Thông tin cửa hàng</h4>
//           <ul className="space-y-2 text-sm opacity-95">
//             <li>Mã số thuế: 023122004</li>
//             <li>Thành lập: 10/10/2025</li>
//             <li>Đ/c: CVPM Quang Trung - TP.HCM</li>
//             <li>Hotline: 0789214856</li>
//           </ul>
//         </div>

//         {/* Subscribe */}
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Nhận ưu đãi</h4>

//           <div className="flex bg-white rounded-lg overflow-hidden">
//             <input
//               type="email"
//               className="flex-1 px-3 py-2 outline-none text-black"
//               placeholder="Nhập email của bạn..."
//             />
//             <button className="bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-500">
//               <i className="fa-solid fa-arrow-right"></i>
//             </button>
//           </div>

//           <p className="mt-3 text-sm opacity-90">
//             Đăng ký để nhận thông tin khuyến mãi và món mới mỗi tuần.
//           </p>
//         </div>

//       </div>

//       <div className="mt-10 border-t border-white/20 pt-5 text-center text-sm opacity-80">
//         © 2025 HanFoodie – Korean Food Store. All rights reserved.
//       </div>
//     </footer>
//   );
// }
// "use client";

// import Image from "next/image";
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="mt-0 bg-[#640000] text-white py-14">
//       <div className="mx-auto max-w-[80%] grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
//         <div>
//           <div className="flex items-center gap-3 mb-4">
//             <Image
//               src="/logo.png"
//               alt="HanFoodie"
//               width={140}
//               height={80}
//               className="object-contain"
//             />
//           </div>

//           <p className="opacity-90 leading-relaxed text-sm">
//             HanFoodie - Mang hương vị chuẩn Hàn đến bữa ăn Việt.
//             Chúng tôi cung cấp các món ăn, nguyên liệu và thực phẩm Hàn Quốc chất lượng cao.
//           </p>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Sản phẩm</h4>
//           <ul className="space-y-2 text-sm opacity-95">
//             <li className="hover:text-yellow-300 cursor-pointer">Món ăn Hàn Quốc</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Kim chi & đồ muối</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Tokbokki & Topokki</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Mì - Gia vị - Nước sốt</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Combo ăn nhanh</li>
//             <li className="hover:text-yellow-300 cursor-pointer">Thực phẩm khô</li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Thông tin cửa hàng</h4>
//           <ul className="space-y-2 text-sm opacity-95">
//             <li>Mã số thuế: 023122004</li>
//             <li>Thành lập: 10/10/2025</li>
//             <li>Đ/c: CVPM Quang Trung - TP.HCM</li>
//             <li>Hotline: 0789 214 856</li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-4 text-lg text-yellow-300">Nhận ưu đãi</h4>

//           <div className="flex bg-white rounded-lg overflow-hidden">
//             <input
//               type="email"
//               className="flex-1 px-3 py-2 outline-none text-black"
//               placeholder="Nhập email của bạn..."
//             />
//             <button className="bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-500">
//               <i className="fa-solid fa-arrow-right"></i>
//             </button>
//           </div>

//           <p className="mt-3 text-sm opacity-90">
//             Đăng ký để nhận thông tin khuyến mãi và món mới mỗi tuần.
//           </p>
//         </div>

//       </div>

//       <div className="mt-10 border-t border-white/20 pt-5 text-center text-sm opacity-80">
//         © 2025 HanFoodie - Korean Food Store. All rights reserved.
//       </div>
//     </footer>
//   );
// }
"use client";

import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-0 bg-[#640000] text-white py-3">
      <div className="mx-auto max-w-[80%] grid grid-cols-1 md:grid-cols-4 gap-10 px-3">
        
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
