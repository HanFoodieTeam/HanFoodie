"use client"; 

import DanhMucList from "./DanhMucList";  
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-lg">Đang tải danh mục...</div>}>
      <DanhMucList />
    </Suspense>
  );
}
