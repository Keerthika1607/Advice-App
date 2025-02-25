import React, { useEffect, useState } from "react";
import "./Advice.css";

const AdviceApp = () => {
  const [advice, setAdvice] = useState("Click the button to get advice!");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      setAdvice("Failed to fetch advice. Try again!");
    }
    setLoading(false);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h3>{advice}</h3>
        <button onClick={getAdvice} disabled={loading}>
          {loading ? "Fetching..." : "Get Advice"}
        </button>
        <p>
          You have read <b>{count}</b> pieces of advice.
        </p>
      </div>
    </div>
  );
};

export default AdviceApp;
