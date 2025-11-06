// 'use client';

// import { ReactNode } from 'react';
// import UserSidebar from './UserSidebar';
// import { Toaster } from 'react-hot-toast';

// interface Props {
//   user: {
//     id: number;
//     ho_ten: string;
//     hinh?: string | null;
//   };
//   children: ReactNode;
// }

// export default function UserLayout({ user, children }: Props) {
//   return (
//     <div className="flex w-full min-h-screen bg-[#FFF5F5]">
//       <UserSidebar user={user} />
//       <main className="flex-1 bg-white shadow-lg m-6 p-8 rounded-2xl border border-gray-100">
//         {children}
//       </main>
//       {/* ✅ Toast toàn cục */}
//       <Toaster position="top-center" />
//     </div>
//   );
// }
'use client';

import { ReactNode } from 'react';
import UserSidebar from './UserSidebar';
import { Toaster } from 'react-hot-toast';

interface UserLayoutProps {
  user: {
    id: number;
    ho_ten: string;
    hinh?: string | null;
  };
  children: ReactNode;
}

export default function UserLayout({ user, children }: UserLayoutProps) {
  return (
    <div className="flex w-full min-h-screen bg-[#FFF5F5]">
      {/* Sidebar */}
      <UserSidebar user={user} />

      {/* Main nội dung */}
      <main className="flex-1 bg-white shadow-lg m-6 p-8 rounded-2xl border border-gray-100">
        {children}
      </main>

      {/* Toast thông báo toàn cục */}
      <Toaster position="top-center" />
    </div>
  );
}
