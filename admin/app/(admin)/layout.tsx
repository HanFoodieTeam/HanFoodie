


// // app/layout.tsx
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import "../globals.css";


// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="vi">
//       <body className="flex h-screen bg-gray-50"> 
//         <Sidebar />

//         <div className="flex flex-col flex-1 overflow-hidden">
//           <Topbar />
//           <main className="flex-1 overflow-auto p-3">{children}</main>
//         </div>
//       </body>
//     </html>
//   );
// }


import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
