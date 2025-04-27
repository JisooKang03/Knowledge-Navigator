import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function LevelUpPopup({ level, onClose }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={500} />
      <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">🚀 LEVEL UP!</h2>
        <p className="text-gray-700 text-lg">You've reached <span className="font-bold text-purple-700">Level {level}</span>!</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
