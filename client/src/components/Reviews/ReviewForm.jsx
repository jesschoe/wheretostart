import './ReviewForm.css'

export default function ReviewForm(props) {
    return (
        <div className="review-box">
            <i 
                className="fas fa-times" 
                onClick={() => props.setShowModal(prev=>!prev)}
            ></i>
            <h4>{props.message}</h4>
            <form onSubmit={props.handleSubmit}>
            <div className="user-box">
                <input 
                    type="text" 
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
                        onChange={(e)=>props.setReviews(e.target.value)} 
                    />
                    <label>Review</label>
                </div>
                <div className='review=buttons'>
                    <button 
                        type='submit' 
                        className='font-orb' 
                        // disabled={props.reviews===''?true:false}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}


