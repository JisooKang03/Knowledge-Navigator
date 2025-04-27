import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase"; // ✅ RELATIVE import

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold">
      Redirecting to your Dashboard...
    </div>
  );
}
