import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllMovies from './components/AllMovies';
import SubmitMovie from './components/SubmitMovie';
import MovieDetails from './components/MovieDetails';

function App() {

  return (
    <div className='App'>
      <Navbar />
      <Route exact path='/'>
        <div>
          <img src='./images/futuristic.png' alt='futuristic sci-fi' />
        </div>
      </Route>
      <Route exact path='/movies'>
        <AllMovies />
      </Route>
      <Route path='/movies/:id'>
        <MovieDetails />
      </Route>
      <Route path ='/new'>
        <SubmitMovie />
      </Route>
    </div>
  );
}

export default App;
