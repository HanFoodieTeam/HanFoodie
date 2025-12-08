"use client";

import { useState } from "react";
import { INguoiDung } from "@/app/lib/cautrucdata";
import LoginForm from "./dangnhap";
import RegisterForm from "./dang_ky";

interface PopupAuthProps {
    onClose: () => void;
}

export default function PopupAuth({ onClose }: PopupAuthProps) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[380px] shadow-lg">

                {isLogin ? (
                    <LoginForm
                        onClose={onClose}
                        onLoginSuccess={(user: INguoiDung) => onClose()}
                        onSwitchToRegister={() => {
                            console.log("Chuyển sang Đăng ký")
                            setIsLogin(false)
                        }}/>
                ) : (
                    <RegisterForm
                        onClose={onClose}
                        onRegisterSuccess={(user: INguoiDung) => setIsLogin(true)}
                        onSwitchToLogin={() => {
                            console.log("Chuyển sang Đăng nhập")
                            setIsLogin(true)
                        }}

                    />
                )}

            </div>
        </div>
    );
}
