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

export async function fetchMovie(id) {
    const res = await axios.get(`${airtableURL}/${id}`, config)
    return res.data
}

export async function voteMovie(id, fields) {
    const res = await axios.put(`${airtableURL}/${id}`, {fields}, config)
    return res.data
}

export async function submitMovie(fields) {
    const res = await axios.post(airtableURL, {fields}, config)
    return res.data
}

export async function fetchMovieDetails(movieTitle) {
    const res = await axios.get(`${omdbURL}${movieTitle}`)
    return res.data
}


