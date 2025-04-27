import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/utils/protectedRoute";
import AddCourseForm from "@/components/AddCourseForm";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null); // ✅ For Editing

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

  const deleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "courses", courseId));
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    if (!editCourse.title.trim()) return;

    try {
      await updateDoc(doc(db, "users", user.uid, "courses", editCourse.id), {
        title: editCourse.title.trim(),
        description: editCourse.description.trim(),
      });
      setEditCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
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
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AddCourseForm onClose={() => setShowForm(false)} refreshCourses={fetchCourses} />
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {editCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
              <form onSubmit={handleEditCourse} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={editCourse.title}
                  onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                  className="border p-2 rounded-md"
                  placeholder="Course Title"
                  required
                />
                <textarea
                  value={editCourse.description}
                  onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                  className="border p-2 rounded-md"
                  placeholder="Course Description"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditCourse(null)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative"
            >
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
                >
                  View
                </button>
                <button
                  onClick={() => setEditCourse(course)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default ProtectedRoute(Dashboard);
