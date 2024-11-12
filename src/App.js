
import './App.css';
import Admin from './components/Admin.js';
import Login from './components/Login.js';
import Navbar from './components/Navbar.js';
import OTP from './components/OTP.js';
import Home from './components/Home.js';
import Vote from './components/Vote.js';
import Result from './components/Results.js';
import Account from './components/Account.js';
import Elections from './components/Elections.js';

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import VoteCount from './components/VoteCount.js';


function App() {
  return (
   <div>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/verify/:voterID' element={<OTP/>}></Route>
        <Route path='/elections' element={<Elections/>}></Route>
        <Route path='/elections/:electionID' element={<Vote/>}></Route>
        <Route path='/results' element={<Result/>}></Route>
        <Route path='/results/:electionID' element={<VoteCount/>}></Route>
        <Route path='/account/:voterID' element={<Account/>}></Route>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
