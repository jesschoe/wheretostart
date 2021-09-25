import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <Link className='nav-links' to='/'>
                <div className='site-name'>
                    <h1>wheretostart:sci-fi</h1>
                </div>
            </Link>
            <div>
                <Link className='nav-links p-5'to='/movies'>see all</Link>
                <Link className='nav-links p-5'to='/new'>recommend movie</Link>
            </div>
        </nav>
    )
}
