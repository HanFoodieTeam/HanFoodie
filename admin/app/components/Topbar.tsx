import Image from "next/image";

export default function Topbar() {
  return (
    <header className="h-15 bg-white shadow flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold">HanFoodie</h1>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Xin chào, Đức</span>
        {/* <Image
          src="/user-avatar.png" // thay bằng hình thật trong public/
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full border"
        /> */}
      </div>
    </header>
  );
}
