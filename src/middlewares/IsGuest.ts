const isGuest = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const accessToken = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  return accessToken && accessToken.length && user && user.length
    ? false
    : true;
};

export default isGuest;
