const airtableBase = process.env.REACT_APP_AIRTABLE_BASE
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY
const URL = `https://api.airtable.com/v0/${airtableBase}/Movies`

const config = {
  headers: {
    Authorization: `Bearer ${airtableKey}`
  }
}

const fetchMovies = async() => {
    const res = await axios.get(URL, config)
    console.log(res.data)
  }