import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Context";
import "./Profile.scss";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(DataContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: null,
    address: "",
    phone: null,
    birthDate: "",
  });

  useEffect(() => {
    setData({ ...data, ...userData });
    setFileUrl(userData.image);
  }, []);

  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);

  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };

  const handleSave = async () => {
    console.log("data is ", data);

    const formdata = new FormData();

    formdata.set("_id", userData._id);

    Object.entries(data).forEach((item) => formdata.set(item[0], item[1]));

    if (blobFile) formdata.set("image", blobFile, "profile_image");

    const config = {
      headers: { "content-type": "mulitpart/form-data" },
    };

    console.log("Handlesave: formdata is", formdata.keys());

    const response = await axios.patch("/users/profile", formdata, config);

    console.log("response from profile is", response);

    if (response.data.success) setUserData({ ...response.data.user });

    navigate("/home");
  };


  return (
    <div className="profileDiv">
      <div className="profile container shadow-lg ">
        <h2>Profile</h2>
        <Row className="">
          <Col className="">
            {" "}
            <div className="main-div">
              <div className="form">
                <input
                  id="username"
                  className="form__input"
                  readOnly
                  value={data.username}
                />
                <label htmlFor="username" className="form__label">
                  Username{" "}
                </label>
              </div>

              <div className="form">
                <input
                  id="email"
                  className="form__input"
                  readOnly
                  value={data.email}
                />
                <label className="form__label" htmlFor="email">
                  Email{" "}
                </label>
              </div>

              <div className="form">
                <input
                  id="firstname"
                  className="form__input"
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  value={data?.firstName}
                />
                <label className="form__label" htmlFor="firstname">
                  First Name
                </label>
              </div>

              <div className="form">
                <input
                  id="lastname"
                  className="form__input"
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  value={data?.lastName}
                />
                <label className="form__label" htmlFor="lastname">
                  Last Name
                </label>
              </div>
              <div className="form">
                {" "}
                <input
                  id="age"
                  className="form__input"
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  value={data?.age}
                />
                <label className="form__label" htmlFor="age">
                  Age
                </label>
              </div>

              <div className="form">
                <input
                  id="address"
                  className=" form__input"
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  value={data?.address}
                />
                <label className="form__label" htmlFor="address">
                  Address
                </label>
              </div>

              <div className="form">
                <input
                  id="phone"
                  className=" form__input"
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  value={data?.phone}
                />
                <label htmlFor="phone" className="form__label">
                  Phone
                </label>
              </div>

              <div className="form">
                <input
                  type="date"
                  id="birthDate"
                  className=" form__input"
                  onChange={(e) =>
                    setData({ ...data, birthDate: e.target.value })
                  }
                  value={data?.birthDate}
                />
                <label htmlFor="birthDate" className="form__label">
                  Birthdate
                </label>
              </div>
            </div>
          </Col>
          {
            <Col className="text-center ">
              {" "}
              <div>
                <img
                  className="rounded"
                  src={fileUrl}
                  alt=""
                  style={{
                    height: "400px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
                <label
                  className="btn btn-info mt-1 w-50"
                  htmlFor="file"
                  style={{ cursor: "pointer" }}
                >
                  Upload your profile image
                </label>
                <input
                  accept="image/*"
                  onChange={handleImageChange}
                  id="file"
                  type="file"
                  style={{ visibility: "hidden" }}
                />
              </div>
            </Col>
          }
        </Row>

        <div>
          <button className="btn btn-danger w-100" onClick={handleSave}>
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
