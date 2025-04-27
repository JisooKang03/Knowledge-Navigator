import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc, collection, addDoc, updateDoc, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import ProgressChart from "../../components/ProgressChart";
import ProtectedRoute from "../../utils/protectedRoute";

function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchCourse();
      fetchLessons();
    }
  }, [id]);

  const fetchCourse = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const courseRef = doc(db, "users", user.uid, "courses", id);
    const courseSnap = await getDoc(courseRef);

    if (courseSnap.exists()) {
      setCourse(courseSnap.data());
    }
  };

  const fetchLessons = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const lessonsRef = collection(db, "users", user.uid, "courses", id, "lessons");
    const snapshot = await getDocs(lessonsRef);

    const lessonsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLessons(lessonsList);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !lessonTitle.trim()) return;

    try {
      await addDoc(collection(db, "users", user.uid, "courses", id, "lessons"), {
        title: lessonTitle.trim(),
        completed: false,
        createdAt: new Date(),
      });
      setLessonTitle("");
      fetchLessons();
    } catch (err) {
      console.error(err);
      setError("Failed to add lesson. Please try again.");
    }
  };

  const toggleLessonCompletion = async (lessonId, currentStatus) => {
    const user = auth.currentUser;
    if (!user) return;

    const lessonRef = doc(db, "users", user.uid, "courses", id, "lessons", lessonId);
    await updateDoc(lessonRef, {
      completed: !currentStatus,
    });

    fetchLessons();
  };

  const completedCount = lessons.filter((lesson) => lesson.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{course?.title || "Loading..."}</h1>
          {course?.description && (
            <p className="text-gray-600 mb-6">{course.description}</p>
          )}

          <ProgressChart completed={completedCount} total={lessons.length} />

          <form onSubmit={handleAddLesson} className="flex flex-col sm:flex-row gap-4 mt-8">
            <input
              type="text"
              placeholder="New Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add Lesson
            </button>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="mt-8 space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition"
              >
                <span
                  className={`text-lg font-medium ${
                    lesson.completed ? "line-through text-green-600" : "text-gray-800"
                  }`}
                >
                  {lesson.title}
                </span>
                <button
                  onClick={() => toggleLessonCompletion(lesson.id, lesson.completed)}
                  className={`px-4 py-2 rounded-md transition ${
                    lesson.completed
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {lesson.completed ? "Undo" : "Complete"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProtectedRoute(CoursePage);
