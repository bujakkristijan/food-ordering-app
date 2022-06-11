import axios from "axios";

class LoginService{
    login(loginParams){
        return axios.post("http://localhost:8080/api/login", loginParams);
    }
}

export default new LoginService();