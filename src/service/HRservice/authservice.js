import axios from "axios";

const API_URL = "http://localhost:8082/hr/";
const API_URL_UPLOAD = "http://localhost:8082/uploadfile";

const register = (
  fullName,
  profilePhoto,
  birthday,
  phoneNumber,
  location,
  company,
  companyLogo,
  companyPhotos,
  user
) => {
  console.log("object ", {
    fullName: fullName,
    profilePhoto: profilePhoto,
    birthday: birthday,
    phoneNumber: phoneNumber,
    location: location,
    company: company,
    companyLogo: companyLogo,
    companyPhotos: companyPhotos,
    user: user,
  });
  return axios
    .post(API_URL + "addHR", {
      fullName: fullName,
      profilePhoto: profilePhoto,
      birthday: birthday,
      phoneNumber: phoneNumber,
      location: location,
      company: company,
      companyLogo: companyLogo,
      companyPhotos: companyPhotos,
      user: user,
    })
    .then(
      (response) => {
        console.log(" profilePhoto", response.data.data.profilePhoto);
        if (response.data) {
          localStorage.setItem("hr", JSON.stringify(response.data.data));
        }
      },
      (err) => {
        console.log("okkkkk ", err);
      }
    );
};

const update = (
  id,
  fullName,
  profilePhoto,
  birthday,
  phoneNumber,
  location,
  company,
  companyLogo,
  companyPhotos
) => {
  return axios
    .put(API_URL + "updateHR", {
      _id: id,
      fullName: fullName,
      profilePhoto: profilePhoto,
      birthday: birthday,
      phoneNumber: phoneNumber,
      location: location,
      company: company,
      companyLogo: companyLogo,
      companyPhotos: companyPhotos,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("hr", JSON.stringify(response.data.data));
      }
    });
};

const deleteHr = (id) => {
  return axios.delete(API_URL + id).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  });
};

const findallHr = () => {
  return axios.get(API_URL).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  });
};

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(API_URL_UPLOAD, formData).then((response) => {
    if (response.data) {
      ///   localStorage.setItem("user", JSON.stringify(response.data));
    }
  });
};
export default {
  register,
  update,
  deleteHr,
  findallHr,
  uploadFile,
};
