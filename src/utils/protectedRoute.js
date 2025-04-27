import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login");
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <Component {...props} />;
  };
}
