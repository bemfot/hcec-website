import Homepage from './Home-page/Homepage';
import NewsTicker from "./components/NewsTicker"; // ⬅️ New import

export default function Home() {
  const newsItems = [
    "Our Bible Study sessions are every Tuesday at 5 PM",
    "Prayer/Revival Hour holds at 5 PM in our various assemblies",
    "Join us for Sunday Worship Services at 9 AM.",
  ];

  return (
    <div className="justify-center relative min-h-screen">
      <Homepage />

      {/* News Ticker (fixed at bottom, always visible) */}
      <NewsTicker items={newsItems} speed={15} />
    </div>
  );
}


