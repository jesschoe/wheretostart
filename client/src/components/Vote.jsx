import { useState, useEffect } from 'react'
import { fetchMovie, voteMovie } from '../services'
import Modal from './Modals/Modal'

// send patch request to Airtable to update vote count
// display review form modal after vote click
export default function Vote(props) {
    const [numVotes, setNumVotes] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getMovie = async() => {
            const res = await fetchMovie(props.id)
            setNumVotes(res.fields.votes)
        }
        getMovie()
    }, [props.id])

    const upVoteHandler = async() => {
        let votes = numVotes + 1
        const fields = {
            votes,
        }
        
        await voteMovie(props.id, fields)
        setShowModal(prev => !prev)
    }

    const downVoteHandler = async() => {
        let votes = numVotes - 1
        const fields = {
            votes,
        }

        await voteMovie(props.id, fields)
        setShowModal(prev => !prev)
    }

    return (
        <div className='vote-div'>
            <i className="far fa-thumbs-up fa-2x" onClick={upVoteHandler}></i>
            <i className="far fa-thumbs-down fa-2x" onClick={downVoteHandler}></i>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}
