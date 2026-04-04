import React from "react";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-12">
          <h1 className="text-5xl font-serif italic text-[#2D2D2D] mb-4">
            The Life Project
          </h1>
          <p className="text-[#2D2D2D] opacity-60 text-lg">
            Find your direction, one step at a time.
          </p>
        </div>

        <div className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-6 text-lg"
          >
            <LogIn className="h-5 w-5 text-[#2D2D2D]" />
            Continue with Google
          </Button>

          <p className="text-xs text-[#2D2D2D] opacity-40 max-w-[280px] mx-auto leading-relaxed">
            By continuing, you agree to our journey of growth and intentional living.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
