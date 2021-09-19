import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav>
            <Link className='p-5' to='/'>wheretostart</Link>
            <Link className='p-5'to='/movies'>all movies</Link>
            <Link className='p-5'to='/new'>recommend movie</Link>
        </nav>
    )
}
