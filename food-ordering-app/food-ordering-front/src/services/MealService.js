import axios from "axios";

class MealService{

    getAllMeals(){
        return axios.get("http://localhost:8080/api/meal/getAllMeals");
    }

    createMeal(fd){
        return axios.post("http://localhost:8080/api/meal/createMeal", fd);
    }

    deleteMeal(mealId){
        return axios.delete("http://localhost:8080/api/meal/deleteMeal/" + mealId);
    }

    getAllMealTypes(){
        return axios.get("http://localhost:8080/api/mealType/getAllMealTypes");
    }

    updateMeal(meal){
        return axios.put("http://localhost:8080/api/meal/updateMeal", meal);
    }

    getMealsByMealTypeId(mealTypeId){
        return axios.get("http://localhost:8080/api/meal/getMealsByMealTypeId/" + mealTypeId);
    }

}

export default new MealService();