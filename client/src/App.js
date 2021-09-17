import './App.css';
import { Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY
const URL = `https://api.airtable.com/v0/${airtableBase}/Movies`

const config = {
  headers: {
    Authorization: `Bearer ${airtableKey}`
  }
}

function App() {
  const [movie, setMovie] = useState()

  useEffect(() => {
    const fetchMovies = async() => {
      const res = await axios.get(URL, config)
      console.log(res.data)
    }
    fetchMovies()
  })
  

  return (
    <div className="App">
      <Route>
        HOME
      </Route>
    </div>
  );
}

export default App;
