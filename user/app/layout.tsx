import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/giohangcontext";

export const metadata: Metadata = {
  title: "HanFoodie",
  description: "Ẩm thực giao tận tay bạn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="bg-gray-500 text-gray-900">
        <CartProvider>
          <Header />
          {/* ✅ Container toàn trang - 80% width */}
          <main className="pt-[72px]">
            <div className="max-w-[80%] mx-auto px-4">{children}</div>
          </main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
