export default function Form(props) {
    return (
        <form onSubmit={props.handleSearch}>
            <label>Movie Title:</label>
            <input 
                className='search-input'
                type='text' 
                value={props.title} 
                onChange={(e)=>props.setTitle(e.target.value)} 
            />
            <button>Search!</button>
        </form>
    )
}