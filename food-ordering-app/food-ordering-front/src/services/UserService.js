import axios from "axios";
import AlertService from "./AlertService";


class UserService{

    setTokenInHeader(){
        if (localStorage.token !== undefined && localStorage.token !== null) {
            let tokenBearer = `Bearer ${localStorage.token}`;
            axios.defaults.headers.common['Authorization'] = tokenBearer; 
        }
        else{
            axios.defaults.headers.common['Authorization'] = null;
        }
    }

    getAllEmployees () {
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/user/getAllEmployees");
    }

    getAllUsers(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/user/getAllUsers");
    }

    createEmployee(user){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.post("http://localhost:8080/api/user/createEmployee", user);
    }

    getEmployeeById(employeeId){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/user/" + employeeId);
    }
    //moze i samo employee da se salje, ne mora i id
    updateEmployee(employeeId, employee){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/user/updateUserByIdAndDetails/" + employeeId, employee);
    }
    //logicko brisanje, setuje se isDeleted na true
    deleteEmployee(employeeId){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/user/deactivateUser/" + employeeId);
    }

    registration(user){
        return axios.post("http://localhost:8080/api/user/registration", user);
    }

    getCurrentUser(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/user/getCurrentUser");
    }

    updateUser(user){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/user/updateUser", user);
    }

    changePassword(passwordObj){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/user/changePassword", passwordObj);
    }

}

export default new UserService();