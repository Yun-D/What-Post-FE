import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}

export default App;
