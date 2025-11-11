import Navbar from "./components/Navbar";
import Homepage from './Home-page/Homepage';
import Footer from "./components/Footer";
import NewsTicker from "./components/NewsTicker"; // ⬅️ New import

export default function Home() {
  const newsItems = [
    "Our Bible Study sessions are every Tuesday at 6 PM.",
    "Prayer/Revival Hour holds at 6 PM in our various assemblies.",
    "Join us for Sunday Worship Services at 9 AM.",
  ];

  return (
    <div className="justify-center relative min-h-screen">
      {/* Navbar Component */}
      <Navbar />

      <Homepage />
      <Footer />

      {/* News Ticker (fixed at bottom, always visible) */}
      <NewsTicker items={newsItems} speed={40} />
    </div>
  );
}

