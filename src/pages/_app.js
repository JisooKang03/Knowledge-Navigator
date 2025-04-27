// src/pages/_app.js

import "../styles/globals.css"; // ✅ Import global styles (Tailwind)

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />; // ✅ Render the correct page
}
