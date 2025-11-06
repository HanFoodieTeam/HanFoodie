// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// interface Props {
//   ho_ten: string;
//   avatar?: string | null;
// }

// export default function UserSidebar({ ho_ten, avatar }: Props) {
//   const path = usePathname();

//   const menu = [
//     { href: '/ho_so', label: 'Hồ Sơ' },
//     { href: '/dia_chi/tat_ca', label: 'Địa Chỉ' },
//     { href: '/doi_mat_khau', label: 'Đổi Mật Khẩu' },
//     { href: '/don_hang', label: 'Đơn Hàng' },
//   ];

//   return (
//     <aside className="w-[22%] md:w-[18%] bg-white border-r shadow-sm p-5 flex flex-col items-center">
//       {/* Avatar */}
//       <div className="flex flex-col items-center">
//         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D33C3C] shadow">
//           {avatar ? (
//             <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-[#D33C3C] text-white text-3xl font-bold">
//               {ho_ten.charAt(0).toUpperCase()}
//             </div>
//           )}
//         </div>
//         <p className="mt-3 font-semibold text-[#6A0A0A]">{ho_ten}</p>
//       </div>

//       {/* Menu */}
//       <div className="mt-8 px-4 w-full">
//         <ul className="space-y-3 text-gray-700">
//           <li className="font-semibold text-[#6A0A0A] border-b pb-2">Tài Khoản Của Tôi</li>
//           {menu.map((m) => (
//             <li key={m.href}>
//               <Link
//                 href={m.href}
//                 className={`block font-medium transition ${
//                   path.startsWith(m.href)
//                     ? 'text-[#D33C3C]'
//                     : 'hover:text-[#D33C3C] text-[#6A0A0A]'
//                 }`}
//               >
//                 {m.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// // }
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// interface SidebarProps {
//   user: {
//     id: number;
//     ho_ten: string;
//     hinh?: string | null;
//   };
// }

// export default function UserSidebar({ user }: SidebarProps) {
//   const path = usePathname();

//   const menus = [
//     { href: '/ho_so', label: 'Hồ Sơ' },
//     { href: `/dia_chi/tat_ca/${user.id}`, label: 'Địa Chỉ' },
//     { href: '/doi_mat_khau', label: 'Đổi Mật Khẩu' },
//     { href: '/don_hang', label: 'Đơn Hàng' },
//   ];

//   return (
//     <aside className="w-[22%] md:w-[18%] bg-white border-r shadow-sm p-5 flex flex-col items-center">
//       {/* Avatar */}
//       <div className="flex flex-col items-center">
//         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D33C3C] flex items-center justify-center bg-gray-100 shadow-md">
//           {user.hinh ? (
//             <img src={user.hinh} alt="Avatar" className="w-full h-full object-cover" />
//           ) : (
//             <span className="text-3xl font-bold text-[#D33C3C]">
//               {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
//             </span>
//           )}
//         </div>
//         <p className="mt-3 font-semibold text-[#6A0A0A]">{user.ho_ten}</p>
//       </div>

//       {/* Menu */}
//       <div className="mt-8 px-4 w-full">
//         <ul className="space-y-3 text-gray-700">
//           <li className="font-semibold text-[#6A0A0A] border-b pb-2">Tài Khoản Của Tôi</li>
//           {menus.map((m) => (
//             <li key={m.href}>
//               <Link
//                 href={m.href}
//                 className={`block font-medium transition ${
//                   path.startsWith(m.href)
//                     ? 'text-[#D33C3C]'
//                     : 'hover:text-[#D33C3C] text-[#6A0A0A]'
//                 }`}
//               >
//                 {m.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserSidebarProps {
  user: {
    id: number;
    ho_ten: string;
    hinh?: string | null;
  };
}

export default function UserSidebar({ user }: UserSidebarProps) {
  const path = usePathname();

  const menus = [
    { href: '/ho_so', label: 'Hồ Sơ' },
    { href: `/dia_chi/tat_ca/${user.id}`, label: 'Địa Chỉ' },
    { href: '/doi_mat_khau', label: 'Đổi Mật Khẩu' },
    { href: '/don_hang', label: 'Đơn Hàng' },
  ];

  return (
    <aside className="w-[22%] md:w-[18%] bg-white border-r shadow-sm p-5 flex flex-col items-center">
      {/* Ảnh đại diện */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D33C3C] flex items-center justify-center bg-gray-100 shadow-md">
          {user.hinh ? (
            <img
              src={user.hinh}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-[#D33C3C]">
              {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
            </span>
          )}
        </div>
        <p className="mt-3 font-semibold text-[#6A0A0A]">{user.ho_ten}</p>
      </div>

      {/* Menu bên trái */}
      <div className="mt-8 px-4 w-full">
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-[#6A0A0A] border-b pb-2">
            Tài Khoản Của Tôi
          </li>
          {menus.map((menu) => (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className={`block font-medium transition ${
                  path.startsWith(menu.href)
                    ? 'text-[#D33C3C]'
                    : 'text-[#6A0A0A] hover:text-[#D33C3C]'
                }`}
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
