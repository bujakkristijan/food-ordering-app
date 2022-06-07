import axios from "axios";

class UserService{
    getAllEmployees(){
        return axios.get("http://localhost:8080/api/user/getAllEmployees");
    }

    createEmployee(user){
        return axios.post("http://localhost:8080/api/user/createEmployee", user);
    }

    getEmployeeById(employeeId){
        return axios.get("http://localhost:8080/api/user/" + employeeId);
    }
    //moze i samo employee da se salje, ne mora i id
    updateEmployee(employeeId, employee){
        return axios.put("http://localhost:8080/api/user/updateUserByIdAndDetails/" + employeeId, employee);
    }
}

export default new UserService();