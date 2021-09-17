import axios from 'axios'

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY
const omdbKey = process.env.REACT_APP_OMDB_KEY
const airtableURL = `https://api.airtable.com/v0/${airtableBase}/Movies`
const omdbURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=$`

const config = {
    headers: {
        Authorization: `Bearer ${airtableKey}`
    }
}

export async function fetchMovies() {
    const res = await axios.get(airtableURL, config)
    return res.data.records
}

export async function fetchMovieDetails(searchMovie) {
    const res = await axios.get(`${omdbURL}${searchMovie}`)
    return res.data
}


