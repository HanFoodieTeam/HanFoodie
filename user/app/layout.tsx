import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/giohangcontext";
import { YeuThichProvider } from "./context/yeuthichcontext";

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
          <YeuThichProvider>
            <Header />
            <main className="pt-[72px]">
              <div className="w-[80%] max-w-[1200px] mx-auto px-4">
                {children}
              </div>
            </main>
          </YeuThichProvider>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
