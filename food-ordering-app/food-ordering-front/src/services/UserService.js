import axios from "axios";

class UserService{
    getAllUsers(){
        return axios.get("http://localhost:8080/api/user/getAllUsers");
    }
}

export default new UserService();