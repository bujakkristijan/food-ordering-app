import axios from "axios";
export function jwtInterceptor() {
  // Add a request interceptor
axios.interceptors.request.use(function (config) {
  console.log("config: ", config);
    if (localStorage.token != '' && localStorage.token != null ) {
        const token = localStorage.token;
        // console.log("token from interceptor: " + token);
        var tokenBearer = `Bearer ${token}`;
        axios.defaults.headers.common['Authorization'] = tokenBearer; 
        console.log("Token from interceptor" + tokenBearer);
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        // delete axios.defaults.headers.common['Authorization'];
        console.log("NEMA TOKENA!");
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
    }
    

    return config;
});
}