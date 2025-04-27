import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";

export default function AddCourseForm({ onClose, refreshCourses }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, "users", user.uid, "courses"), {
        title,
        description,
        createdAt: new Date(),
      });

      setTitle("");
      setDescription("");
      onClose();           // Close the form
      refreshCourses();    // Refresh the course list
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Course</h2>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        required
      />

      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        required
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </div>
    </form>
  );
}
