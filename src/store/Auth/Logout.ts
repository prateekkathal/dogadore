const Logout = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return Promise.reject("User Not Logged In!");
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  return Promise.resolve("User logged out");
};

export default Logout;
