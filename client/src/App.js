import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AllMovies from './components/AllMovies';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import SubmitReview from './components/Reviews/SubmitReview'
import Slider from './components/Carousel/Slider'
import GitHub from './images/GitHub.png'

function App() {

  return (
    <div className='App'>
      <Navbar />
      <div className='app-body'>
      <Route exact path='/'>
        <div className='welcome'>
          <h4>want to get into sci-fi but don't know where to start?</h4>
          <h4>look no further! here are the top 10 movies every sci-fi noob should check out.</h4>
          <Slider />
          <h4 className='veterans'>sci-fi veterans: keep the rankings honest and leave your reviews!</h4>
        </div>
      </Route>
      <Route exact path='/movies'>
        <AllMovies />
      </Route>
      <Route exact path='/movies/:id/:rank'>
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
        <a href='https://github.com/jesschoe/wheretostart' target='blank'><img src={GitHub} alt='GitHub logo' /></a>
      </footer>
    </div>
  );
}

export default App;
