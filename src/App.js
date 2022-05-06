import Home from './pages/Home';
import React, {  useReducer, createContext } from 'react';
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


  return (
    <div className="App">
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  path="/profile" element={<Profile/>}/>
          <Route  path="/sign-in" element={<SignIn/>}/>
          <Route  path="/sign-up" element={<SignUp/>}/>
          <Route  path="/dashboard" element={<Dashboard/>}/>
          <Route  path="/dashboard/all-posted" element={<DashboardPosted/>}/>
          <Route  path="/dashboard/job-detail/:id" element={<JobDetails authenticated/>}/>
          <Route  path="/job-list" element={<SearchJob/>}/>
          <Route  path="/job-list/:id" element={<ListPosts/>}/>
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
