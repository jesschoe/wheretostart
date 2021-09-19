export default function Form(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>Movie Title
                <input 
                    type='text' 
                    value={props.title} 
                    onChange={(e)=>props.setTitle(e.target.value)} 
                />
            </label>
            <label>Year
                <input 
                    type='text' 
                    value={props.year} 
                    onChange={(e)=>props.setYear(e.target.value)} 
                />
            </label>
            <button>Recommend!</button>
        </form>
    )
}