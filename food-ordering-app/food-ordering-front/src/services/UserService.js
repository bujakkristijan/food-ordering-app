import axios from "axios";


class UserService{
    // sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms / 1000));
    //   }

    //async
    getAllEmployees () {
        // kada se osvezi stranica, da stopira jednu mikrosekundu, kako bi interceptor uspeo da stavi token u header=u
        // mada je ovo los nacin da se to radi, pa zato ne stavljam
        // treba prilikom svakog zahteva gde je potreban token, setovati token u header-u manuelno u kodu
        // await this.sleep(1);
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

    preflightMask(){
        return axios.get("http://localhost:8080/api/user/preflightMask");
    }
}

export default new UserService();