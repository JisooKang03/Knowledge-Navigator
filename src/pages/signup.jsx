import { useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join and start tracking your learning journey 🚀
        </p>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          required
        />

        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 hover:underline font-semibold transition"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
