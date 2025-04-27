import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import ProtectedRoute from "@/utils/protectedRoute";
import Navbar from "@/components/Navbar";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to DELETE your account permanently?")) return;

    try {
      const user = auth.currentUser;
      if (user) {
        // Delete user data from Firestore
        await deleteDoc(doc(db, "users", user.uid));
        // Delete auth account
        await user.delete();
        router.push("/signup");
      }
    } catch (error) {
      console.error("Account deletion error:", error);
      alert("You may need to re-login to delete account for security reasons.");
    }
  };

  const handleCreateNewAccount = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">👤 Your Profile</h1>

          {user ? (
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-700">📧 {user.email}</p>
              </div>

              <div className="flex gap-6">
                <div className="bg-blue-100 text-blue-700 rounded-lg p-4 w-40 text-center">
                  <p className="text-2xl font-bold">{userData?.coursesCompleted ?? 0}</p>
                  <p className="text-sm font-medium">Courses</p>
                </div>

                <div className="bg-green-100 text-green-700 rounded-lg p-4 w-40 text-center">
                  <p className="text-2xl font-bold">{userData?.badgesUnlocked ?? 0}</p>
                  <p className="text-sm font-medium">Badges</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  🚪 Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                >
                  🗑️ Delete Account
                </button>
                <button
                  onClick={handleCreateNewAccount}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                >
                  ✨ Create New Account
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProtectedRoute(ProfilePage);
