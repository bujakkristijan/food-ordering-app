import axios from "axios";

class UserService{
    getAllEmployees(){
        return axios.get("http://localhost:8080/api/user/getAllEmployees");
    }

    getAllUsers(){
        return axios.get("http://localhost:8080/api/user/getAllUsers");
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
    //logicko brisanje, setuje se isDeleted na true
    deleteEmployee(employeeId){
        return axios.put("http://localhost:8080/api/user/deactivateUser/" + employeeId);
    }


    createUser(user){
        return axios.post("http://localhost:8080/api/user/registration", user);
    }

    getCurrentUser(){
        return axios.get("http://localhost:8080/api/user/getCurrentUser");
    }

    updateUser(user){
        return axios.put("http://localhost:8080/api/user/updateUser", user);
    }
}

export default new UserService();