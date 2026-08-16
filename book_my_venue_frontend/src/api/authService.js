 
 
// export default api;
import api from "./api";

export const login = (email, password) => {
  return api.post("/auth/signin", {
    email,
    password,
  });
};

export const signup = (formData) => {
  return api.post("/auth/signup", formData);
};

 