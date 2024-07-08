import axios from "axios";

async function VerifyClient() {
  let error = false;
  let userData;
  const token = localStorage.getItem("token");
// "https://zummit-chandan.onrender.com/api/users/verifyClient"
await axios
.get("http://localhost:4000/api/users/verifyClient", {
  headers: {
    authorization: token,
  },
  withCredentials: true,
})
.then((res) => {
  if (res.data.client._id) {
    userData = res.data.client;
  }
})
.catch((err) => {
  if (err.response && (err.response.status === 401 || err.response.status)) {
    error = true;
  }
});


  return { error, userData };
}

export default VerifyClient;
