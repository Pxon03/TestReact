
import React from 'react';
import './App.css';

function NumberInput({ input, onInputChange, onGenerate, filter, onFilterChange, onClear }) {
  return (
    <div className="number-input-container">
      <div>
        <input
          type="text"
          placeholder="กรอกเลข 1 ตัว หรือจำนวนที่ต้องการสุ่ม (1-9)"
          value={input}
          onChange={onInputChange}
          maxLength={1}
        />
        <button onClick={onGenerate}>ตกลง</button>
        <button onClick={onClear}>Clear</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="กรอกเลขที่ต้องการ filter (เช่น 123)"
          value={filter}
          onChange={onFilterChange}
        />
      </div>
    </div>
  );
}

export default NumberInput;
