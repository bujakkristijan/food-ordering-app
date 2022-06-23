import axios from "axios";

class MealService{

    getAllMeals(){
        return axios.get("http://localhost:8080/api/meal/getAllMeals");
    }

    createMeal(meal){
        return axios.post("http://localhost:8080/api/meal/createMeal", meal);
    }

    deleteMeal(mealId){
        return axios.put("http://localhost:8080/api/meal/deleteMeal/" + mealId);
    }

    getAllMealTypes(){
        return axios.get("http://localhost:8080/api/mealType/getAllMealTypes");
    }

}

export default new MealService();