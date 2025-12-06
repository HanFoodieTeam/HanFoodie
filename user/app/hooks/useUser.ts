// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';

// // // // // interface User {
// // // // //   id: number;
// // // // //   ho_ten: string;
// // // // //   hinh?: string | null;
// // // // //   email?: string;
// // // // // }

// // // // // let cachedUser: User | null = null;

// // // // // export function useUser() {
// // // // //   const [user, setUser] = useState<User | null>(cachedUser);

// // // // //   useEffect(() => {
// // // // //     if (cachedUser) return; // 🔹 Nếu đã có user thì không fetch lại

// // // // //     const token = localStorage.getItem('token');
// // // // //     if (!token) return;

// // // // //     async function fetchUser() {
// // // // //       try {
// // // // //         const res = await fetch('/api/ho_so', {
// // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // //         });
// // // // //         const data = await res.json();
// // // // //         if (res.ok && data.nguoi_dung) {
// // // // //           cachedUser = data.nguoi_dung; // 🔹 Lưu vào cache
// // // // //           setUser(data.nguoi_dung);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error('🔥 Lỗi lấy hồ sơ:', err);
// // // // //       }
// // // // //     }

// // // // //     fetchUser();
// // // // //   }, []);

// // // // //   return user;
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';

// // // // interface IUser {
// // // //   id: number;
// // // //   ho_ten: string;
// // // //   email?: string;
// // // //   sdt?: string;
// // // //   ngay_sinh?: string;
// // // //   hinh?: string | null;
// // // // }

// // // // let cachedUser: IUser | null = null;

// // // // export function useUser() {
// // // //   const [user, setUser] = useState<IUser | null>(cachedUser);

// // // //   useEffect(() => {
// // // //     if (cachedUser) return; // ⚡ Nếu đã có cache thì khỏi fetch lại

// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) return;

// // // //     async function fetchUser() {
// // // //       try {
// // // //         const res = await fetch('/api/ho_so', {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });
// // // //         const data = await res.json();
// // // //         if (res.ok && data.nguoi_dung) {
// // // //           cachedUser = data.nguoi_dung;
// // // //           setUser(data.nguoi_dung);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error('Lỗi khi tải user:', err);
// // // //       }
// // // //     }

// // // //     fetchUser();
// // // //   }, []);

// // // //   return user;
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';

// // // // interface IUser {
// // // //   id: number;
// // // //   ho_ten: string;
// // // //   email?: string;
// // // //   sdt?: string;
// // // //   ngay_sinh?: string;
// // // //   hinh?: string | null;
// // // // }

// // // // let cachedUser: IUser | null = null;
// // // // let listeners: ((u: IUser | null) => void)[] = [];

// // // // export function updateUser(newUser: IUser | null) {
// // // //   cachedUser = newUser;
// // // //   localStorage.setItem('user', JSON.stringify(newUser));
// // // //   listeners.forEach((fn) => fn(newUser));
// // // // }

// // // // export function useUser() {
// // // //   const [user, setUser] = useState<IUser | null>(cachedUser);

// // // //   useEffect(() => {
// // // //     if (cachedUser) {
// // // //       setUser(cachedUser);
// // // //       return;
// // // //     }

// // // //     const stored = localStorage.getItem('user');
// // // //     if (stored) {
// // // //       const parsed = JSON.parse(stored);
// // // //       cachedUser = parsed;
// // // //       setUser(parsed);
// // // //     }

// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) return;

// // // //     (async () => {
// // // //       try {
// // // //         const res = await fetch('/api/ho_so', {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });
// // // //         const data = await res.json();
// // // //         if (res.ok && data.nguoi_dung) {
// // // //           cachedUser = data.nguoi_dung;
// // // //           localStorage.setItem('user', JSON.stringify(data.nguoi_dung));
// // // //           setUser(data.nguoi_dung);
// // // //         }
// // // //       } catch (err) {
// // // //         console.error('Lỗi khi tải user:', err);
// // // //       }
// // // //     })();

// // // //     const listener = (u: IUser | null) => setUser(u);
// // // //     listeners.push(listener);
// // // //     return () => {
// // // //       listeners = listeners.filter((fn) => fn !== listener);
// // // //     };
// // // //   }, []);

// // // //   return user;
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';

// // // interface IUser {
// // //   id: number;
// // //   ho_ten: string;
// // //   email?: string;
// // //   sdt?: string;
// // //   ngay_sinh?: string;
// // //   hinh?: string | null;
// // // }

// // // let cachedUser: IUser | null = null;
// // // let listeners: ((u: IUser | null) => void)[] = [];

// // // export function updateUser(newUser: IUser | null) {
// // //   if (newUser?.hinh) {
// // //     newUser.hinh = `${newUser.hinh}?v=${Date.now()}`; // 🔥 chống cache
// // //   }

// // //   cachedUser = newUser;
// // //   localStorage.setItem('user', JSON.stringify(newUser));

// // //   listeners.forEach((fn) => fn(newUser));
// // // }

// // // export function useUser() {
// // //   const [user, setUser] = useState<IUser | null>(cachedUser);

// // //   useEffect(() => {
// // //     if (cachedUser) {
// // //       setUser(cachedUser);
// // //       return;
// // //     }

// // //     const stored = localStorage.getItem('user');
// // //     if (stored) {
// // //       const parsed = JSON.parse(stored);
// // //       cachedUser = parsed;
// // //       setUser(parsed);
// // //     }

// // //     const token = localStorage.getItem('token');
// // //     if (!token) return;

// // //     (async () => {
// // //       try {
// // //         const res = await fetch('/api/ho_so', {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await res.json();

// // //         if (res.ok && data.nguoi_dung) {
// // //           const fixedUser = {
// // //             ...data.nguoi_dung,
// // //             hinh: data.nguoi_dung.hinh
// // //               ? `${data.nguoi_dung.hinh}?v=${Date.now()}`
// // //               : null,
// // //           };

// // //           cachedUser = fixedUser;
// // //           localStorage.setItem('user', JSON.stringify(fixedUser));

// // //           setUser(fixedUser);
// // //         }
// // //       } catch (err) {
// // //         console.error('Lỗi khi tải user:', err);
// // //       }
// // //     })();

// // //     const listener = (u: IUser | null) => setUser(u);
// // //     listeners.push(listener);

// // //     return () => {
// // //       listeners = listeners.filter((fn) => fn !== listener);
// // //     };
// // //   }, []);

// // //   return user;
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';

// // interface IUser {
// //   id: number;
// //   ho_ten: string;
// //   email?: string;
// //   sdt?: string;
// //   ngay_sinh?: string;
// //   hinh?: string | null;
// // }

// // let cachedUser: IUser | null = null;
// // let listeners: ((u: IUser | null) => void)[] = [];

// // // 🔥 FIXED: đảm bảo lưu đủ dữ liệu
// // export function updateUser(u: IUser | null) {
// //   if (!u) return;

// //   const fullUser: IUser = {
// //     id: u.id,
// //     ho_ten: u.ho_ten,
// //     email: u.email,
// //     sdt: u.sdt,
// //     ngay_sinh: u.ngay_sinh,
// //     hinh: u.hinh ? `${u.hinh}?v=${Date.now()}` : null,
// //   };

// //   cachedUser = fullUser;
// //   localStorage.setItem('user', JSON.stringify(fullUser));

// //   listeners.forEach((fn) => fn(fullUser));
// // }

// // export function useUser() {
// //   const [user, setUser] = useState<IUser | null>(cachedUser);

// //   useEffect(() => {
// //     if (cachedUser) {
// //       setUser(cachedUser);
// //       return;
// //     }

// //     const stored = localStorage.getItem('user');
// //     if (stored) {
// //       const parsed = JSON.parse(stored);
// //       cachedUser = parsed;
// //       setUser(parsed);
// //     }

// //     const token = localStorage.getItem('token');
// //     if (!token) return;

// //     (async () => {
// //       try {
// //         const res = await fetch('/api/ho_so', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await res.json();

// //         if (res.ok && data.nguoi_dung) {
// //           const fullUser: IUser = {
// //             id: data.nguoi_dung.id,
// //             ho_ten: data.nguoi_dung.ho_ten,
// //             email: data.nguoi_dung.email,
// //             sdt: data.nguoi_dung.sdt,
// //             ngay_sinh: data.nguoi_dung.ngay_sinh,
// //             hinh: data.nguoi_dung.hinh
// //               ? `${data.nguoi_dung.hinh}?v=${Date.now()}`
// //               : null,
// //           };

// //           cachedUser = fullUser;
// //           localStorage.setItem('user', JSON.stringify(fullUser));

// //           setUser(fullUser);
// //         }
// //       } catch (err) {
// //         console.error('Lỗi khi tải user:', err);
// //       }
// //     })();

// //     const listener = (u: IUser | null) => setUser(u);
// //     listeners.push(listener);

// //     return () => {
// //       listeners = listeners.filter((fn) => fn !== listener);
// //     };
// //   }, []);

// //   return user;
// // }
// 'use client';

// import { useState, useEffect } from 'react';

// export interface INguoiDung {
//   id: number;
//   ho_ten: string;
//   email?: string;
//   sdt?: string;
//   ngay_sinh?: string;
//   hinh?: string | null;
// }

// let cachedUser: INguoiDung | null = null;
// let listeners: ((u: INguoiDung | null) => void)[] = [];

// export function updateUser(u: INguoiDung | null) {
//   if (!u) return;

//   const fullUser: INguoiDung = {
//     id: u.id,
//     ho_ten: u.ho_ten,
//     email: u.email,
//     sdt: u.sdt,
//     ngay_sinh: u.ngay_sinh,
//     hinh: u.hinh ? `${u.hinh}?v=${Date.now()}` : null,
//   };

//   cachedUser = fullUser;
//   localStorage.setItem('user', JSON.stringify(fullUser));
//   listeners.forEach((fn) => fn(fullUser));
// }

// export function useUser() {
//   const [user, setUser] = useState<INguoiDung | null>(cachedUser);

//   useEffect(() => {
//     if (cachedUser) {
//       setUser(cachedUser);
//       return;
//     }

//     const stored = localStorage.getItem('user');
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       cachedUser = parsed;
//       setUser(parsed);
//     }

//     const token = localStorage.getItem('token');
//     if (!token) return;

//     (async () => {
//       try {
//         const res = await fetch('/api/ho_so', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok && data.nguoi_dung) {
//           const fullUser: INguoiDung = {
//             id: data.nguoi_dung.id,
//             ho_ten: data.nguoi_dung.ho_ten,
//             email: data.nguoi_dung.email,
//             sdt: data.nguoi_dung.sdt || null,
//             ngay_sinh: data.nguoi_dung.ngay_sinh || null,
//             hinh: data.nguoi_dung.hinh
//               ? `${data.nguoi_dung.hinh}?v=${Date.now()}`
//               : null,
//           };
//           cachedUser = fullUser;
//           localStorage.setItem('user', JSON.stringify(fullUser));
//           setUser(fullUser);
//         }
//       } catch (err) {
//         console.error('Lỗi khi tải user:', err);
//       }
//     })();

//     const listener = (u: INguoiDung | null) => setUser(u);
//     listeners.push(listener);

//     return () => {
//       listeners = listeners.filter((fn) => fn !== listener);
//     };
//   }, []);

//   return user;
// }
'use client';

import { useState, useEffect } from 'react';

export interface IUser {
  id: number;
  ho_ten: string;
  email?: string;
  sdt?: string;
  ngay_sinh?: string;
  hinh?: string | null;
}

let cachedUser: IUser | null = null;
let listeners: ((u: IUser | null) => void)[] = [];

// 🔥 Cập nhật cache + localStorage
export function updateUser(u: IUser | null) {
  if (!u) return;

  const fullUser: IUser = {
    id: u.id,
    ho_ten: u.ho_ten,
    email: u.email,
    sdt: u.sdt,
    ngay_sinh: u.ngay_sinh,
    hinh: u.hinh ? `${u.hinh}?v=${Date.now()}` : null,
  };

  cachedUser = fullUser;
  localStorage.setItem('user', JSON.stringify(fullUser));

  listeners.forEach((fn) => fn(fullUser));
}

export function useUser() {
  const [user, setUser] = useState<IUser | null>(cachedUser);

  useEffect(() => {
    if (cachedUser) {
      setUser(cachedUser);
      return;
    }

    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored) as IUser;
      cachedUser = parsed;
      setUser(parsed);
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    (async () => {
      try {
        const res = await fetch('/api/ho_so', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.nguoi_dung) {
          const fullUser: IUser = {
            id: data.nguoi_dung.id,
            ho_ten: data.nguoi_dung.ho_ten,
            email: data.nguoi_dung.email,
            sdt: data.nguoi_dung.sdt,
            ngay_sinh: data.nguoi_dung.ngay_sinh,
            hinh: data.nguoi_dung.hinh
              ? `${data.nguoi_dung.hinh}?v=${Date.now()}`
              : null,
          };

          cachedUser = fullUser;
          localStorage.setItem('user', JSON.stringify(fullUser));
          setUser(fullUser);
        }
      } catch (err) {
        console.error('Lỗi khi tải user:', err);
      }
    })();

    const listener = (u: IUser | null) => setUser(u);
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((fn) => fn !== listener);
    };
  }, []);

  return user;
}
