import { useRouter } from "next/router";
import { auth } from "../lib/firebase"; // ✅ RELATIVE import
import { signOut } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Knowledge Navigator
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
