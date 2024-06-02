
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Login from './Components/Login';
import Nav from './Components/Nav';
import List from './Components/List';
import './index.css';
function App() {
  return (
    <div className="App ">
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/movielist' element={<List/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
