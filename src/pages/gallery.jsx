import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore"; // ✅ Change here
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/utils/protectedRoute";

function GalleryPage() {
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  useEffect(() => {
    const fetchCompletedLessons = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const coursesRef = collection(db, "users", user.uid, "courses");
      const coursesSnapshot = await getDocs(coursesRef);

      let totalCompleted = 0;

      const promises = coursesSnapshot.docs.map(async (courseDoc) => {
        const lessonsRef = collection(db, "users", user.uid, "courses", courseDoc.id, "lessons");
        const completedLessonsQuery = query(lessonsRef, where("completed", "==", true));
        const completedSnapshot = await getDocs(completedLessonsQuery);

        totalCompleted += completedSnapshot.size;
      });

      await Promise.all(promises);
      setLessonsCompleted(totalCompleted);
      setLoading(false);
    };

    fetchCompletedLessons();
  }, []);

  const BADGES = [
    { number: 1, title: "🥉 Bronze Beginner", unlockAt: 5 },
    { number: 2, title: "🥈 Silver Explorer", unlockAt: 10 },
    { number: 3, title: "🥇 Gold Achiever", unlockAt: 15 },
    { number: 4, title: "🏆 Platinum Master", unlockAt: 20 },
    { number: 5, title: "🏅 Ultimate Hero", unlockAt: 25 },
    { number: 6, title: "🌟 Legend Award", unlockAt: 30 },
  ];

  const LEVELS = [
    { number: 2, title: "🚀 Level 2", unlockAt: 10 },
    { number: 3, title: "🚀 Level 3", unlockAt: 20 },
    { number: 4, title: "🚀 Level 4", unlockAt: 30 },
  ];

  const calculateBadgeProgress = () => {
    const goals = [5, 10, 15, 20, 25, 30];
    const nextGoal = goals.find((g) => g > lessonsCompleted) || 30;
    return Math.min(Math.round((lessonsCompleted / nextGoal) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">🏅 Your Achievements</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Progress Bar */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Progress Towards Next Badge</h2>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="bg-green-500 h-full text-xs flex items-center justify-center text-white font-semibold transition-all"
                  style={{ width: `${calculateBadgeProgress()}%` }}
                >
                  {calculateBadgeProgress()}%
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                {lessonsCompleted} lessons completed
              </p>
            </section>

            {/* Toggle Unlocked/All */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowOnlyUnlocked(!showOnlyUnlocked)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {showOnlyUnlocked ? "Show All" : "Show Only Unlocked"}
              </button>
            </div>

            {/* Badges */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">🎖️ Badges</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {BADGES.filter((badge) => !showOnlyUnlocked || lessonsCompleted >= badge.unlockAt).map((badge) => (
                  <div
                    key={badge.number}
                    className={`p-6 rounded-lg text-center shadow transition ${
                      lessonsCompleted >= badge.unlockAt
                        ? "bg-green-100 text-green-700 font-bold"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {badge.title}
                    <br />
                    <small>Unlock at {badge.unlockAt} lessons</small>
                  </div>
                ))}
              </div>
            </section>

            {/* Levels */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">🚀 Levels</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {LEVELS.filter((level) => !showOnlyUnlocked || lessonsCompleted >= level.unlockAt).map((level) => (
                  <div
                    key={level.number}
                    className={`p-6 rounded-lg text-center shadow transition ${
                      lessonsCompleted >= level.unlockAt
                        ? "bg-purple-100 text-purple-700 font-bold"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {level.title}
                    <br />
                    <small>Unlock at {level.unlockAt} lessons</small>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default ProtectedRoute(GalleryPage);
