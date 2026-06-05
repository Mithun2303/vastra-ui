import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { useState } from "react";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      )}
    </AuthLayout>
  );
}