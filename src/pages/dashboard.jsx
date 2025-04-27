import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/utils/protectedRoute";
import AddCourseForm from "@/components/AddCourseForm";
import { useRouter } from "next/router"; // ✅ ADD THIS

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const user = auth.currentUser;
  const router = useRouter(); // ✅ ADD THIS

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard!</h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add New Course
          </button>

          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <AddCourseForm onClose={() => setShowForm(false)} refreshCourses={fetchCourses} />
              </div>
            </div>
          )}
        </div>

        {courses.length === 0 ? (
          <p>No courses yet. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => router.push(`/courses/${course.id}`)} // ✅ MAKE CARD CLICKABLE
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
              >
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
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
