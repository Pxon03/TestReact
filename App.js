// src/App.js : React component used for development
// This file is kept for reference; the running demo uses public/app.js
// Use global React when loaded via UMD in the browser (public/app.js uses that).

// ...existing code...

// (No runtime code here; see public/app.js which is the browser entry)
const { useState } = React;

function App() {
  const [number, setNumber] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 1;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    setNumber(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderTree = (n, bushIndex) => {
    const rows = [];
    for (let i = 1; i <= n; i++) {
      rows.push(
        <div key={i} style={{ fontFamily: "monospace" }}>
          พุ่มที่ {bushIndex + 1} แถวที่ {i}: {" ".repeat(n - i)}
          {"*".repeat(i)}
        </div>
      );
    }
    return rows;
  };

  const renderTrunk = (n, bushIndex) => {
    const trunk = [];
    for (let i = 1; i <= n; i++) {
      trunk.push(
        <div key={i} style={{ fontFamily: "monospace" }}>
          พุ่มที่ {bushIndex + 1} ลำต้นแถวที่ {i}: {" ".repeat(n - 1)}**
        </div>
      );
    }
    return trunk;
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>EX 5: พุ่มต้นคริสต์มาส</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ป้อนตัวเลข 1-10: &nbsp;
          <input
            type="number"
            min="1"
            max="10"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div style={{ marginTop: 32 }}>
          {[...Array(number)].map((_, bushIdx) => (
            <div key={bushIdx} style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: "bold" }}>พุ่มที่ {bushIdx + 1}</div>
              {renderTree(number, bushIdx)}
              {renderTrunk(number, bushIdx)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Placeholder() {
  return null;
}
