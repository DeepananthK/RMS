import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import User from './pages/User';
import Search from './pages/Search';
import Book from './pages/Book';
import LockResources from './pages/LockResources';
import './App.css';
import AddResources from './pages/AddResources';
import MyBookings from './pages/UserBookings';
import Requests from './pages/Requests';
import Calendar1 from './pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index exact element={<Welcome />} />
          <Route path='/login'  exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/adminDashboard' exact element={<Admin />} />
          <Route path='/admin/restrictResources' exact element={<LockResources />} />
          <Route path='/admin/addResources' exact element={<AddResources />} />
          <Route path='/admin/requests' exact element={<Requests />} />
          <Route path='/user' exact element={<User />} />
          <Route path='/user/myBookings' exact element={<MyBookings />} />
          <Route path='/user/search' exact element={<Search />} />
          <Route path='/user/search/book' exact element={<Book />} />
        </Route>
        <Route path="/cal" exact element={<Calendar1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
