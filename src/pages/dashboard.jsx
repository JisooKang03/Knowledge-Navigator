import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase"; // ✅ Clean and correct
import { collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/utils/protectedRoute";
import AddCourseForm from "@/components/AddCourseForm";
import { useRouter } from "next/router";


function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const coursesRef = collection(db, "users", user.uid, "courses");
      const snapshot = await getDocs(coursesRef);
      const coursesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600">Manage your learning progress!</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            + Add New Course
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <AddCourseForm onClose={() => setShowForm(false)} refreshCourses={fetchCourses} />
            </div>
          </div>
        )}

        {courses.length === 0 ? (
          <div className="text-center mt-20 text-gray-600 text-lg">
            You have no courses yet. Start by adding one! 🚀
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => router.push(`/courses/${course.id}`)}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProtectedRoute(Dashboard);
