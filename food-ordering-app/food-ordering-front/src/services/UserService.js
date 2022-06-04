import axios from "axios";

class UserService{
    getAllEmployees(){
        return axios.get("http://localhost:8080/api/user/getAllEmployees");
    }

    createEmployee(user){
        return axios.post("http://localhost:8080/api/user/createEmployee", user);
    }
}

export default new UserService();