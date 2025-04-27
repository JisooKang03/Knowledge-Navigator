import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
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
      {/* Logo / Brand */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Knowledge Navigator
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/gallery")}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          View Gallery
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
