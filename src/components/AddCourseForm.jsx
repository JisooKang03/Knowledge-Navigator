import { useState } from "react";
import { db, auth } from "../lib/firebase"; // ✅ correct relative path
import { collection, addDoc } from "firebase/firestore";

export default function AddCourseForm({ onClose, refreshCourses }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "users", user.uid, "courses"), {
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
      refreshCourses();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add course. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Add New Course
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        required
      />

      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black resize-none"
        required
      />

      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="w-1/2 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Add Course
        </button>
      </div>
    </form>
  );
}
