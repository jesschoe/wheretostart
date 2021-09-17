import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav>
            <Link to='/'>wheretostart</Link>
            <Link to='/movies'>all movies</Link>
            <Link to='/new'>recommend movie</Link>
        </nav>
    )
}
