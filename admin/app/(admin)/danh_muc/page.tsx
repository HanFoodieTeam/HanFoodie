// app/danh_muc/page.tsx
"use client"; // hoặc giữ page server + import ClientComponent

import DanhMucList from "./DanhMucList";  
import { Suspense } from "react";
export default function Page() {
  return 
   <Suspense fallback={<div className="p-4 text-lg">Đang tải danh mục...</div>}>
      <DanhMucList />
    </Suspense>

}
