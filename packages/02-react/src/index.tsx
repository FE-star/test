import React, { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-counter">
      <div className="counter-text">count:{count}</div>
      <button
        className="counter-btn"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </div>
  );
}
