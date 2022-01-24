import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './Components/navigation/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      {/* <Switch>
        <Route path="/" exact component = {Home} />
        <Route path="/my_post" component = {MyPost} />
      </Switch> */}
    </Router>
  );
}

export default App;
