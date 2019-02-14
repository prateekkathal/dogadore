const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  return accessToken && accessToken.length && user && user.length;
};

export default isAuthenticated;
