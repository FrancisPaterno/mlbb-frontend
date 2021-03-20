import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ListHeroes from './components/ListHeroes';
import AddHeroForm from './components/AddHeroForm';
import WatchVideo from './components/WatchVideo';


function App() {
  return (
    <div>
      <Router>
        <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact component = {ListHeroes}></Route>
              <Route path="/add-hero" component = {AddHeroForm}></Route>
              <Route path="/update-hero/:id" component = {AddHeroForm}></Route>
              <Route path="/watch-video/:videoId" component={WatchVideo}></Route>
            </Switch>
          </div>
        <Footer />
      </Router>
    </div>
    
  );
}

export default App;
