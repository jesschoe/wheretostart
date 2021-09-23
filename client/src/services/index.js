import axios from 'axios'

const airtableBase = process.env.REACT_APP_AIRTABLE_BASE
const airtableKey = process.env.REACT_APP_AIRTABLE_KEY
const omdbKey = process.env.REACT_APP_OMDB_KEY
const airtableURL = `https://api.airtable.com/v0/${airtableBase}/Movies`
const reviewsURL = `https://api.airtable.com/v0/${airtableBase}/Reviews`
const omdbURL = `https://www.omdbapi.com/?apikey=${omdbKey}&t=$`
const omdbSearchURL = `https://www.omdbapi.com/?apikey=${omdbKey}&s=$`
const omdbSearchIdURL = `https://www.omdbapi.com/?apikey=${omdbKey}&i=`

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
    console.log(id)
    const res = await axios.get(`${airtableURL}/${id}`, config)
    return res.data
}

export async function voteMovie(id, fields) {
    const res = await axios.patch(`${airtableURL}/${id}`, {fields}, config)
    return res.data
}

export async function submitMovie(fields) {
    const res = await axios.post(airtableURL, {fields}, config)
    return res.data
}

export async function getReviews(id) {
    const res = await axios.get(`${airtableURL}/${id}`, config)
    return res.data
}

export async function reviewMovie(fields) {
    const res = await axios.post(reviewsURL, {fields}, config)
    return res.data
}

export async function deleteReview(id) {
    const res = await axios.delete(`${airtableURL}/${id}`, config)
    return res.data
}

export async function fetchMovieDetails(movieTitle) {
    const res = await axios.get(`${omdbURL}${movieTitle}`)
    return res.data
}

export async function searchMovies(title) {
    const res = await axios.get(`${omdbSearchURL}${title}`)
    return res.data
}

export async function searchMovieId(movieID) {
    const res = await axios.get(`${omdbSearchIdURL}${movieID}`)
    return res.data
}





