import './App.css';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import Test from "./pages/FaveRows";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact={true} component={HomePage}/>
              <Route path="/movie/:movieId" component={MovieDetails}/>
              <Route path="/favorites" component={FavoritesPage}/>
              {<Route path="/Test" component={Test}/>}
          </Switch>

      </BrowserRouter>

  );
}

export default App;
