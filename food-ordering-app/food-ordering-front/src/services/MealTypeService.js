import axios from "axios";
import TokenService from "./TokenService";

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
        TokenService.setTokenInHeader();
        return axios.post("http://localhost:8080/api/mealType/createMealType", fd);
    }

    deleteMealType(mealTypeId){
        // this.setTokenInHeader();
        TokenService.setTokenInHeader();
        return axios.delete("http://localhost:8080/api/mealType/deleteMealType/" + mealTypeId);
    }

    updateMealType(mealType){
        // this.setTokenInHeader();
        TokenService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/mealType/updateMealType", mealType);
    }

}

export default new MealTypeService();