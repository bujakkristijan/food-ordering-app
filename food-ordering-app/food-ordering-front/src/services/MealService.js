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

    sendItemsForFinalOrder(itemsFromCartFinalOrder){
        return axios.post("http://localhost:8080/api/finalOrder/createFinalOrder", itemsFromCartFinalOrder);
    }

    welcomeTest(){
        
        return axios.get("http://localhost:8080/api/finalOrder/welcomeTest");
        
    }

    getFinalOrderById(finalOrderId){
        return axios.get("http://localhost:8080/api/finalOrder/getFinalOrderById/" + finalOrderId);
    }

    getOrderItemsByFinalOrderId(finalOrderId){
        return axios.get("http://localhost:8080/api/finalOrder/getOrderItemsByFinalOrderId/" + finalOrderId);
    }

    getAllActiveFinalOrders(){
        return axios.get("http://localhost:8080/api/finalOrder/getAllActiveFinalOrders");
    }

    setFinalOrderToDelivered(finalOrderId){
        return axios.put("http://localhost:8080/api/finalOrder/setFinalOrderToDelivered/" + finalOrderId);
    }
    
    getAllDeliveredFinalOrders(){
        return axios.get("http://localhost:8080/api/finalOrder/getAllDeliveredFinalOrders");
    }

    getMyActiveFinalOrders(){
        return axios.get("http://localhost:8080/api/finalOrder/getAllMyActiveFinalOrders");
    }

    getMyDeliveredFinalOrders(){
        return axios.get("http://localhost:8080/api/finalOrder/getAllMyDeliveredFinalOrders");
    }

   changeFinalOrderStatus(finalOrderWithStatusAndId){
        return axios.put("http://localhost:8080/api/finalOrder/changeStatus", finalOrderWithStatusAndId);
    }

}

export default new MealService();