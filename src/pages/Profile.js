import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Typography from "@mui/material/Typography";
import CenterDiv from "../components/CenterDiv";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import img from "../images/404.jpg";
import Api, { endpoints } from "../config/Api";
import ProfileItemExperience from "../components/ProfileItemExperience";
import ProfileItem from "../components/ProfileItem";

function Profile() {
  const [user, dispatch] = useContext(UserContext);
  const { id } = useParams();
  const [profileDetailId, setProfileDetailId] = useState("");
  const [profile, setProfile] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);

  let authenticated;

  if (user && user.id == id) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  const handleDelete = () => {
    getProfileDetail(profileDetailId);
  };

  const handleGetProfile = async () => {
    const res = await Api.get(endpoints["user-detail"](id));
    console.log(res.data);
    if (!res.data.profile) {
      const createProfileDetail = async () => {
        let resC = await Api.post(
          endpoints["profile"],
          {
            description: "",
            nick_name: "",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
          .then(function (resC) {
            return resC.data.id;
          })
          .catch((err) => alert(err));
      };
      createProfileDetail();
    } else {
      setProfile(res.data);
      return res.data.profile.id;
    }
  };

  const getProfileDetail = async (profileid) => {
    const res = await Api.get(endpoints["profile-detail"](profileid))
      .then((res) => {
        console.log(res.data);
        setProfileDetail(res.data);
        setProfileDetailId(profileid);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  };

  useEffect(() => {
    handleGetProfile()
      .then((profileid) => {
        getProfileDetail(profileid);
      })
      .catch((err) => {
        window.location.reload();
      });
  }, []);

  if (!profile) {
    return (
      <div>
        <Header />
        <div>loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile">
      <Header />
      <Box m={4}>
        <CenterDiv>
          {profile.avatar_path ? (
            <Avatar
              alt="Remy Sharp"
              src={profile.avatar_path}
              style={{ height: "270px", width: "270px" }}
            />
          ) : (
            <Avatar
              alt="alt"
              src={img}
              style={{ height: "270px", width: "270px" }}
            />
          )}
        </CenterDiv>

        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          component="div"
          className="name"
        >
          Tên đăng nhập: {profile.username}
        </Typography>
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          component="div"
          className="name"
        >
          Tên: {profile.first_name} {profile.last_name}
        </Typography>
        {profile?.email ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Email: <a href={`mailto:${profile?.email}`}>{profile?.email}</a>
          </Typography>
        ) : (
          <></>
        )}
        {profile?.profile?.nick_name ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Biệt danh: {profile?.profile?.nick_name}
          </Typography>
        ) : (
          <></>
        )}
        {profile?.profile?.description ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Mô tả: {profile?.profile?.description}
          </Typography>
        ) : (
          <></>
        )}
        {profileDetail && profileDetail.educations ? (
          <div>
            <ProfileItem
              data={profileDetail?.educations}
              handleDelete={handleDelete}
              authenticated={authenticated}
            />
          </div>
        ) : (
          <></>
        )}
        {profileDetail && profileDetail.experiences ? (
          <div>
            <ProfileItemExperience
              data={profileDetail?.experiences}
              handleDelete={handleDelete}
              authenticated={authenticated}
            />
          </div>
        ) : (
          <></>
        )}
      </Box>

      <Footer />
    </div>
  );
}

export default Profile;
