import axios from "axios";

class MealTypeService{

    getAllMealTypes(){
        return axios.get("http://localhost:8080/api/mealType/getAllMealTypes");
    }
    createMealType(fd){
        return axios.post("http://localhost:8080/api/mealType/createMealType", fd);
    }

    deleteMealType(mealTypeId){
        return axios.delete("http://localhost:8080/api/mealType/deleteMealType/" + mealTypeId);
    }
    updateMealType(mealType){
        return axios.put("http://localhost:8080/api/mealType/updateMealType", mealType);
    }

}

export default new MealTypeService();