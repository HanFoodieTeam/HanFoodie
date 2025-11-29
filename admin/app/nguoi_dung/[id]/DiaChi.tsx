


"use client";

import { IDiaChi } from "@/app/lib/cautrucdata";

export default function DiaChi({ addresses }: { addresses?: IDiaChi[] }) {

  if (!addresses || addresses.length === 0) {
    return <p className="text-gray-500">Chưa có địa chỉ nào.</p>;
  }

  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.mac_dinh === b.mac_dinh) return 0;
    return a.mac_dinh ? -1 : 1; // true lên đầu
  });

  return (
    <div className="space-y-4">
      {sortedAddresses.map((dc) => (
        <div key={dc.id} className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <p><strong>{dc.ho_ten}</strong> — {dc.sdt}</p>
            <p className="text-gray-600">
              {dc.ten_duong}, {dc.phuong}, {dc.tinh}
            </p>
          </div>

          {dc.mac_dinh && (
            <span className="text-xs px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
              Địa chỉ mặc định
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
