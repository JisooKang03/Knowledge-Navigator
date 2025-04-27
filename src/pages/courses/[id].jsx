import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../../lib/firebase";
import { doc, getDoc, collection, addDoc, updateDoc, getDocs, writeBatch } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import ProgressChart from "../../components/ProgressChart";
import ProtectedRoute from "../../utils/protectedRoute";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BadgePopup from "../../components/BadgePopup";
import LevelUpPopup from "../../components/LevelUpPopup";

function CoursePage() {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [error, setError] = useState("");

  const [showBadge, setShowBadge] = useState(false);
  const [badgeName, setBadgeName] = useState("");
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [courseCompleted, setCourseCompleted] = useState(false); // ✅ New

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

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedLessons = Array.from(lessons);
    const [removed] = reorderedLessons.splice(result.source.index, 1);
    reorderedLessons.splice(result.destination.index, 0, removed);

    setLessons(reorderedLessons);

    const user = auth.currentUser;
    if (!user) return;

    const batch = writeBatch(db);
    reorderedLessons.forEach((lesson, index) => {
      const lessonRef = doc(db, "users", user.uid, "courses", id, "lessons", lesson.id);
      batch.update(lessonRef, { order: index });
    });

    await batch.commit();
  };

  const handleToggleComplete = async (lessonId, currentStatus) => {
    const user = auth.currentUser;
    if (!user) return;

    const lessonRef = doc(db, "users", user.uid, "courses", id, "lessons", lessonId);
    await updateDoc(lessonRef, { completed: !currentStatus });

    await fetchLessons(); // Refresh after toggle

    const completedCount = lessons.filter((lesson) => lesson.completed).length + (!currentStatus ? 1 : -1);

    if (!currentStatus) { // Only when completing (not undo)
      if (completedCount === 5) unlockBadge(1);
      if (completedCount === 10) { unlockBadge(2); unlockLevel(2); }
      if (completedCount === 15) unlockBadge(3);
      if (completedCount === 20) { unlockBadge(4); unlockLevel(3); }
      if (completedCount === 25) unlockBadge(5);
      if (completedCount === 30) { unlockBadge(6); unlockLevel(4); setCourseCompleted(true); }
    }
  };

  const unlockBadge = (badgeNumber) => {
    const badgeNames = [
      "🥉 Bronze Beginner",
      "🥈 Silver Explorer",
      "🥇 Gold Achiever",
      "🏆 Platinum Master",
      "🏅 Ultimate Hero",
      "🌟 Legend Award",
    ];
    setBadgeName(badgeNames[badgeNumber - 1] || `🏅 Badge #${badgeNumber}`);
    setShowBadge(true);
  };

  const unlockLevel = (levelNumber) => {
    setCurrentLevel(levelNumber);
    setShowLevelUp(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{course?.title || "Loading..."}</h1>

          <ProgressChart completed={lessons.filter((l) => l.completed).length} total={lessons.length} />

          {courseCompleted && (
            <div className="bg-green-500 text-white text-center py-4 font-bold text-lg rounded-lg shadow-md mt-6 animate-bounce">
              🎉 You have completed the entire course! 🎉
            </div>
          )}

          {/* Form to Add Lesson */}
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

          {/* Lessons List */}
          <div className="mt-8">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="lessons">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {lessons.map((lesson, index) => (
                      <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition"
                          >
                            <span className={`text-lg font-medium ${lesson.completed ? "line-through text-green-600" : "text-gray-800"}`}>
                              {lesson.title}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleToggleComplete(lesson.id, lesson.completed)}
                                className={`px-4 py-2 rounded-md transition ${
                                  lesson.completed
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                              >
                                {lesson.completed ? "Undo" : "Complete"}
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </main>

      {/* Popups */}
      {showBadge && <BadgePopup badgeName={badgeName} onClose={() => setShowBadge(false)} />}
      {showLevelUp && <LevelUpPopup level={currentLevel} onClose={() => setShowLevelUp(false)} />}
    </div>
  );
}

export default ProtectedRoute(CoursePage);
