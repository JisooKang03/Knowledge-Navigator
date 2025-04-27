import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import Confetti from "react-confetti";

export default function BadgePopup({ badgeName, onClose }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [play] = useSound("/sounds/celebration.mp3"); 

  useEffect(() => {
    play(); // ✅ Play sound when popup shows

    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3s

    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    return () => clearTimeout(timer);
  }, [onClose, play]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Confetti width={dimensions.width} height={dimensions.height} recycle={false} numberOfPieces={300} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center text-center"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-4">🏆 New Badge Unlocked!</h2>
        <p className="text-gray-700 mb-4">{badgeName}</p>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
        >
          Awesome!
        </button>
      </motion.div>
    </div>
  );
}
