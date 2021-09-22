import './ReviewForm.css'

export default function ReviewForm(props) {
    // props.setUsername('anonymous')
    return (
        <div className="review-box">
            <h4>Thanks for voting! Would you like to leave a review?</h4>
            <form onSubmit={props.handleSubmit}>
            <div className="user-box">
                <input 
                    type="text" 
                    autoFocus
                    name="" 
                    required=""
                    value={props.username}
                    onChange={(e)=>props.setUsername(e.target.value)}
                />
                <label>Username</label>
                </div>
                <div className="user-box">
                    <input 
                        type="text" 
                        name="" 
                        required="" 
                        value={props.reviews} 
                        onChange={(e)=>props.setReviews(e.target.value)} />
                    <label>Review</label>
                </div>
                <button className='vote-submit font-orb'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
            </form>
        </div>
    )
}


