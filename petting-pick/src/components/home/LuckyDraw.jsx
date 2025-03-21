import { useState } from "react";
import "@/assets/LuckyDraw.css";

const prizes = [
  {
    emoji: "🐕",
    label: "Woof Woof",
    title: "Woof Woof Won",
    probability: 0.25,
    percent: 5,
    code: "WWW333",
  },
  {
    emoji: "🐟",
    label: "Hook On",
    title: "Hooked On Winner",
    probability: 0.2,
    percent: 15,
    code: "HOOK101",
  },
  {
    emoji: "🧡",
    label: "Best Friend",
    title: "Best Friend Forever",
    probability: 0.05,
    percent: 50,
    code: "BFF777",
  },
  {
    emoji: "🐘",
    label: "Big Win",
    title: "Big Animal Win",
    probability: 0.15,
    percent: 30,
    code: "BW70E",
  },
  {
    emoji: "🎯",
    label: "Start",
    title: "No Prize",
    probability: 0,
    percent: 0,
    code: "",
  },
  {
    emoji: "🐈",
    label: "Maneki Neko",
    title: "Maneki Neko LuckyCat",
    probability: 0.2,
    percent: 20,
    code: "VIP888",
  },
  {
    emoji: "🐓",
    label: "Winner Winner",
    title: "Winner Winner Chicken Dinner",
    probability: 0.1,
    percent: 35,
    code: "VIP666",
  },
  {
    emoji: "🚧",
    label: "Next Time",
    title: "Maybe Next Time?",
    probability: 0.05,
    percent: 0,
    code: "",
  },
  {
    emoji: "🏠",
    label: "?? ? ??",
    title: "On The Hose",
    probability: 0.001,
    percent: 100,
    code: "DFG#4T$71",
  },
];

export default function LuckyDraw() {
  const [winningIndex, setWinningIndex] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const getRandomPrizeIndex = () => {
    let randomNum =
      Math.random() *
      prizes.reduce((sum, { probability }) => sum + probability, 0);
    return prizes.findIndex(
      ({ probability }) => (randomNum -= probability) < 0
    );
  };

  const spinWheel = () => {
    setSpinning(true);
    setTimeout(() => {
      setWinningIndex(getRandomPrizeIndex());
      setSpinning(false);
    }, 3000);
  };

  return (
    <section>
      <h2 className="text-center mb-5">Coupon Lucky Draw</h2>
      <div className={`lottery-wheel ${spinning ? "spinning" : ""}`}>
        {prizes.map((prize, index) => (
          <div
            key={index}
            className={`lottery-cell ${
              index === winningIndex ? `winner win-item-${index}` : ""
            } ${
              index === 4 ? "center bg-primary" : `lottery-item-${index % 2}`
            }`}
          >
            {index === 4 ? (
              <button
                onClick={spinWheel}
                disabled={spinning}
                className={`spin-button ${spinning ? "loading-text" : ""}`}
              >
                {spinning ? "Drawing" : "Draw"}
              </button>
            ) : index === winningIndex ? (
              <>
                <h4 className="text-center">{prize.title}</h4>
                <p>
                  {prize.emoji} {prize.percent}% OFF
                </p>
                {prize.code && (
                  <p>
                    code: <span>{prize.code}</span>
                  </p>
                )}
              </>
            ) : (
              <>
                <span className="text-center">{prize.label}</span>
                <span className="prize-emoji">{prize.emoji}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
