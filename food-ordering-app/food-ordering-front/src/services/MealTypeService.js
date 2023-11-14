import axios from "axios";
import AlertService from "./AlertService";

class MealTypeService{

    setTokenInHeader(){
        if (localStorage.token !== undefined && localStorage.token !== null) {
            let tokenBearer = `Bearer ${localStorage.token}`;
            axios.defaults.headers.common['Authorization'] = tokenBearer; 
        }
        else{
            axios.defaults.headers.common['Authorization'] = null;
        }
    }

    getAllMealTypes(){
        return axios.get("http://localhost:8080/api/mealType/getAllMealTypes");
    }
    createMealType(fd){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.post("http://localhost:8080/api/mealType/createMealType", fd);
    }

    deleteMealType(mealTypeId){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.delete("http://localhost:8080/api/mealType/deleteMealType/" + mealTypeId);
    }

    updateMealType(mealType){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/mealType/updateMealType", mealType);
    }

}

export default new MealTypeService();