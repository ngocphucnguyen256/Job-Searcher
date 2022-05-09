import Home from './pages/Home';
import React, {  useReducer, createContext, useEffect } from 'react';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import JobDetails from './pages/JobDetail';
import DashboardPost from './components/DashboardPost'
import DashboardPosted from './components/DashboardPosted'
import myReducer from './reducers/UserReducer';
import { BrowserRouter } from 'react-router-dom';
import SearchJob from './pages/SearchJob';
import ListPosts from './pages/ListPosts';

export const UserContext = createContext()

function App() {

  const [user, dispatch] = useReducer(myReducer)

  useEffect(() => {
    
  if(localStorage.getItem('name')){
   

    dispatch({
      "type": "login",
      "payload": {
          "username":  localStorage.getItem('name'),
          "avatar":localStorage.getItem('avatar'),
          "email":localStorage.getItem('email'),
          "id":localStorage.getItem('id'),
          "role": localStorage.getItem('role')
      
      }
  })
  console.log(localStorage.getItem('name') )
  console.log(localStorage.getItem('avatar') )
  console.log(localStorage.getItem('email') )
  console.log(localStorage.getItem('id') )
  console.log(localStorage.getItem('role') )
}

  },[])

  

  return (
    <div className="App">
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Routes>
          <Route exact  path="/" element={<Home/>}/>
          <Route  path="/profile/:id" element={<Profile/>}/>
          <Route  path="/sign-in" element={<SignIn/>}/>
          <Route  path="/sign-up" element={<SignUp/>}/>
          <Route  path="/dashboard" element={<Dashboard/>}/>
          <Route  path="/dashboard/all-posted" element={<DashboardPosted/>}/>
          <Route  path="/dashboard/job-detail/:id" element={<JobDetails authenticated/>}/>
          <Route  path="/job-list" element={<SearchJob/>}/>
          <Route  path="/job-list/:id/posts" element={<ListPosts/>}/>
          <Route  path="/job-list/posts" element={<ListPosts/>}/>
          <Route  path="/dashboard/post" element={<DashboardPost/>}/>
          <Route  path="/job-detail/:id" element={<JobDetails/>}/>
          <Route  path="*" element={<PageNotFound/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
