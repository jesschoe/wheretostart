import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <nav>
            <Link className='nav-links site-name' to='/'><h1>wheretostart:sci-fi</h1></Link>
            <div>
                <Link className='nav-links p-5'to='/movies'>all movies</Link>
                <Link className='nav-links p-5'to='/new'>recommend movie</Link>
            </div>
        </nav>
    )
}
