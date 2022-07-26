import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import User from "./components/User/User";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:userId" component={User} />
          <Route exact path="/auth">
            {localStorage.getItem("currentUser") != null ? (
              <Redirect to="/" />
            ) : (
              <Auth />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
