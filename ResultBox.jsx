
import React from 'react';
import './App.css';

function ResultBox({ numbers, filteredIn, filteredOut, filter }) {
  return (
    <div className="result-box">
      <div>
        <strong>เลขที่สุ่ม/กรอก:</strong> {numbers.length ? numbers.join(', ') : '-'}
      </div>
      <div>
        <strong>จำนวน:</strong> {numbers.length}
      </div>
      <div className="filter-section">
        <div>
          <strong>เลขที่ไม่มีใน array:</strong>
          <div className="result-list">
            {filter && filteredOut.length
              ? filteredOut.join(', ')
              : '-'}
          </div>
        </div>
        <div>
          <strong>เลขที่มีใน array:</strong>
          <div className="result-list">
            {filter && filteredIn.length
              ? filteredIn.join(', ')
              : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultBox;
