// 'use client';

// import { useState, useEffect } from 'react';

// interface User {
//   id: number;
//   ho_ten: string;
//   hinh?: string | null;
//   email?: string;
// }

// let cachedUser: User | null = null;

// export function useUser() {
//   const [user, setUser] = useState<User | null>(cachedUser);

//   useEffect(() => {
//     if (cachedUser) return; // 🔹 Nếu đã có user thì không fetch lại

//     const token = localStorage.getItem('token');
//     if (!token) return;

//     async function fetchUser() {
//       try {
//         const res = await fetch('/api/ho_so', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok && data.nguoi_dung) {
//           cachedUser = data.nguoi_dung; // 🔹 Lưu vào cache
//           setUser(data.nguoi_dung);
//         }
//       } catch (err) {
//         console.error('🔥 Lỗi lấy hồ sơ:', err);
//       }
//     }

//     fetchUser();
//   }, []);

//   return user;
// }
'use client';

import { useState, useEffect } from 'react';

interface IUser {
  id: number;
  ho_ten: string;
  email?: string;
  sdt?: string;
  ngay_sinh?: string;
  hinh?: string | null;
}

let cachedUser: IUser | null = null;

export function useUser() {
  const [user, setUser] = useState<IUser | null>(cachedUser);

  useEffect(() => {
    if (cachedUser) return; // ⚡ Nếu đã có cache thì khỏi fetch lại

    const token = localStorage.getItem('token');
    if (!token) return;

    async function fetchUser() {
      try {
        const res = await fetch('/api/ho_so', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.nguoi_dung) {
          cachedUser = data.nguoi_dung;
          setUser(data.nguoi_dung);
        }
      } catch (err) {
        console.error('Lỗi khi tải user:', err);
      }
    }

    fetchUser();
  }, []);

  return user;
}
