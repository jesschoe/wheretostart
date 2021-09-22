import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllMovies from './components/AllMovies';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import Future from './images/future.png'
import SubmitReview from './components/SubmitReview'

function App() {

  return (
    <div className='App'>
      <Navbar />
      <div className='app-body'>
      <Route exact path='/'>
        <div className='main-img-container'>
          <img src={Future} alt='futuristic sci-fi' className='main-img' />
        </div>
      </Route>
      <Route exact path='/movies'>
        <AllMovies />
      </Route>
      <Route exact path='/movies/:id'>
        <MovieDetails />
      </Route>
      <Route path ='/new'>
        <MovieSearch />
      </Route>
      <Route path ='/movies/:id/review'>
        <SubmitReview />
      </Route>
      </div>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
