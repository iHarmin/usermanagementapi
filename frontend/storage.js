const storage = {
    setToken: (token) => localStorage.setItem("token", token),
    getToken: () => localStorage.getItem("token"),
    clearToken: () => localStorage.removeItem("token"),
  };
  