import Home from "./pages/Home";
import React, { useReducer, createContext, useEffect, useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetail";
import DashboardPost from "./components/DashboardPost";
import DashboardPosted from "./components/DashboardPosted";
import myReducer from "./reducers/UserReducer";
import { BrowserRouter } from "react-router-dom";
import SearchJob from "./pages/SearchJob";
import ListPosts from "./pages/ListPosts";
import DashboardHome from "./components/DashboardHome";
import DashboardModify from "./components/DashboardModify";
import DashboardPostModify from "./components/DashboardPostModify";
import DashboardApplied from "./components/DashboardApplied";
import DashboardSavedPosts from "./components/DashboardSavedPosts";
import ProfileCompany from "./pages/ProfileCompany";
import Api, { endpoints, client } from "./config/Api";
import DashboardUpgrade from "./components/DashboardUpgrade";
import DashboardModifyCompany from "./components/DashboardModifyCompany";
import * as qs from "qs";

export const UserContext = createContext();

const Loading = () => (
  <div className="loading">
    <div></div>
    <div></div>
  </div>
);

function App() {
  const [user, dispatch] = useReducer(myReducer);
  const [isLoading, setIsLoading] = useState(true);

  const timer = () =>
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);

  const convertUserRole = (numb) => {
    if (numb === 1) {
      return "Admin";
    } else if (numb === 2) {
      return "User";
    } else if (numb === 3) {
      return "Hirer";
    }
  };

  const getUserDetails = async () => {
    const res = await Api.get(endpoints["getUser"], {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch((err) => {
      alert(err);
    });

    let userDetail = res.data;
    console.log(userDetail);
    userDetail["user_role"] = convertUserRole(userDetail.user_role);
    localStorage.setItem("user", JSON.stringify(userDetail));

    dispatch({
      type: "login",
      payload: {
        username: userDetail.username,
        avatar: userDetail.avatar_path,
        email: userDetail.email,
        id: userDetail.id,
        role: userDetail.user_role,
        firstname: userDetail.first_name,
        lastname: userDetail.last_name,
      },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (
        localStorage.getItem("refresh_token") &&
        parseInt(localStorage.getItem("get_time")) +
          parseInt(localStorage.getItem("expires_in")) * 1000 <
          Date.now()
      ) {
        const authUser = async () => {
          const res = await Api.post(
            endpoints["token"],
            qs.stringify({
              grant_type: "refresh_token",
              refresh_token: localStorage.getItem("refresh_token"),
              client_id: client.clientId,
              client_secret: client.clientSecret,
            })
          )
            .then((res) => {
              console.log("token refreshed", res.data);
              localStorage.clear();
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("refresh_token", res.data.refresh_token);
              localStorage.setItem("expires_in", res.data.expires_in);
              localStorage.setItem("get_time", Date.now());
              getUserDetails();
            })
            .catch((err) => {
              if (err.response.status === 400) {
                alert("Invalid username or password");
              }
            });
        };
        authUser();
      }

      let user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      dispatch({
        type: "login",
        payload: {
          username: user.username,
          avatar: user.avatar_path,
          email: user.email,
          id: user.id,
          role: user.user_role,
          firstname: user.first_name,
          lastname: user.last_name,
        },
      });
    }

    timer();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="App content">
      <BrowserRouter>
        <UserContext.Provider value={[user, dispatch]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile-company/:id" element={<ProfileCompany />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="home" element={<DashboardHome />} />
              <Route path="applied" element={<DashboardApplied />} />
              <Route path="all-posted" element={<DashboardPosted />} />
              <Route path="saved-posted" element={<DashboardSavedPosts />} />
              <Route path="post" element={<DashboardPost />} />
              <Route
                path="job-detail/:id"
                element={<JobDetails authenticated removeHeader />}
              />
              <Route
                path="job-detail/:id/modify"
                element={<DashboardPostModify />}
              />
              <Route path="modify/:id" element={<DashboardModify />} />
              <Route path="upgrade" element={<DashboardUpgrade />} />
              <Route
                path="modify-company/:id"
                element={<DashboardModifyCompany />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="job-list" element={<SearchJob />} />
            <Route path="/job-list/:id/posts" element={<ListPosts />} />
            <Route path="/job-list/posts" element={<ListPosts />} />
            <Route path="/job-detail/:id" element={<JobDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
