
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchMovie, voteMovie } from '../services'

export default function Vote(props) {
    const history = useHistory()
    const [numVotes, setNumVotes] = useState(0)

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
        history.push(`/movies/${props.id}/review`)
    }

    const downVoteHandler = async() => {
        let votes = numVotes - 1
        const fields = {
            votes,
        }

        await voteMovie(props.id, fields)
        history.push(`/movies/${props.id}/review`)
    }

    return (
        <div>
            <button onClick={upVoteHandler}><i className="far fa-thumbs-up fa-2x m-4"></i></button>
            <button onClick={downVoteHandler}><i className="far fa-thumbs-down fa-2x"></i></button>
        </div>
    )
}
