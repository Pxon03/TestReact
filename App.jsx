import { useState } from 'react'
import './App.css'
import NumberInput from './components/NumberInput'

function App() {
  const [numbers, setNumbers] = useState([]) // main array of numbers (0-9)
  const [single, setSingle] = useState('') // single number input
  const [randCount, setRandCount] = useState('') // how many to randomize
  const [filterText, setFilterText] = useState('') // filter input (comma/space separated)
  const [inFilter, setInFilter] = useState([])
  const [notInFilter, setNotInFilter] = useState([])
  const [error, setError] = useState('')

  const submitNumber = () => {
    setError('')
    if (single === '') {
      setError('Require number')
      return
    }
    const n = Number(single)
    if (Number.isNaN(n) || n < 0 || n > 9) {
      setError('Number must be 0-9')
      return
    }
    setNumbers((prev) => [...prev, n])
    setSingle('')
  }

  const randomNumbers = () => {
    setError('')
    const cnt = Number(randCount)
    if (Number.isNaN(cnt) || cnt <= 0) {
      setError('Enter a positive count')
      return
    }
    const generated = Array.from({ length: cnt }, () => Math.floor(Math.random() * 10))
    setNumbers((prev) => [...prev, ...generated])
    setRandCount('')
  }

  const clearNumbers = () => {
    setNumbers([])
    setInFilter([])
    setNotInFilter([])
    setError('')
  }

  const doFilter = () => {
    setError('')
    if (filterText.trim() === '') {
      setError('Enter numbers to filter (comma or space separated)')
      return
    }
    // parse filterText into set of digits
    const tokens = filterText.split(/[,\s]+/).filter(Boolean)
    const filterSet = new Set()
    for (const t of tokens) {
      const v = Number(t)
      if (!Number.isNaN(v)) filterSet.add(v)
    }
    const inF = numbers.filter((n) => filterSet.has(n))
    const notInF = numbers.filter((n) => !filterSet.has(n))
    setInFilter(inF)
    setNotInFilter(notInF)
  }

  return (
    <div className="container">
      <h1>EX 4 — Number Filter</h1>

      <div className="form-row">
        <div className="col">
          <label>* Require number:</label>
          <NumberInput value={single} onChange={setSingle} placeholder="ใส่เลข 0-9" />
        </div>
        <div className="col buttons">
          <button onClick={submitNumber}>Submit</button>
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <label>จำนวนตัวเลขที่ต้องการสุ่ม</label>
          <input
            type="number"
            value={randCount}
            onChange={(e) => setRandCount(e.target.value)}
            placeholder="จะสุ่มเลข 0 - 9"
          />
        </div>
        <div className="col buttons">
          <button onClick={randomNumbers}>Random number</button>
          <button className="muted" onClick={clearNumbers}>clear number</button>
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <label>เลขที่ต้องการ filter</label>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="เช่น 1,2,3 หรือ 1 2 3"
          />
        </div>
        <div className="col buttons">
          <button onClick={doFilter}>Filter</button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <hr />

      <div className="results">
        <div className="result-col">
          <h3>จำนวนเลขทั้งหมด: {numbers.length}</h3>
          <div className="list">{numbers.length ? numbers.join(', ') : 0}</div>
        </div>

        <div className="result-col">
          <h3>เลขที่มีในการ filter: {inFilter.length}</h3>
          <div className="list">{inFilter.length ? inFilter.join(', ') : 0}</div>
        </div>

        <div className="result-col">
          <h3>เลขที่ไม่มีในการ filter: {notInFilter.length}</h3>
          <div className="list">{notInFilter.length ? notInFilter.join(', ') : 0}</div>
        </div>
      </div>
    </div>
  )
}

export default App
