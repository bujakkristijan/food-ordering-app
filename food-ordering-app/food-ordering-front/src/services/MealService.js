import axios from "axios";
import AlertService from "./AlertService";

class MealService{

    // mozda bi bilo najbolje u redux-store da stoji funkcija pa da se odatle pristupa u svim servisima
    setTokenInHeader(){
        if (localStorage.token !== undefined && localStorage.token !== null) {
            let tokenBearer = `Bearer ${localStorage.token}`;
            axios.defaults.headers.common['Authorization'] = tokenBearer; 
        }
        else{
            axios.defaults.headers.common['Authorization'] = null;
        }
    }

    getAllMeals(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/meal/getAllMeals");
    }

    createMeal(fd){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.post("http://localhost:8080/api/meal/createMeal", fd);
    }

    deleteMeal(mealId){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.delete("http://localhost:8080/api/meal/deleteMeal/" + mealId);
    }

    getAllMealTypes(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/mealType/getAllMealTypes");
    }

    updateMeal(meal){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/meal/updateMeal", meal);
    }

    getMealsByMealTypeId(mealTypeId){
        return axios.get("http://localhost:8080/api/meal/getMealsByMealTypeId/" + mealTypeId);
    }

    sendItemsForFinalOrder(itemsFromCartFinalOrder){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.post("http://localhost:8080/api/finalOrder/createFinalOrder", itemsFromCartFinalOrder); 
    }

    getFinalOrderById(finalOrderId){
        return axios.get("http://localhost:8080/api/finalOrder/getFinalOrderById/" + finalOrderId);
    }

    getOrderItemsByFinalOrderId(finalOrderId){
        return axios.get("http://localhost:8080/api/finalOrder/getOrderItemsByFinalOrderId/" + finalOrderId);
    }

    getAllActiveFinalOrders(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/finalOrder/getAllActiveFinalOrders");
    }

    // setFinalOrderToDelivered(finalOrderId){
    //     return axios.put("http://localhost:8080/api/finalOrder/setFinalOrderToDelivered/" + finalOrderId);
    // }
    
    getAllDeliveredFinalOrders(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/finalOrder/getAllDeliveredFinalOrders");
    }

    getMyActiveFinalOrders(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/finalOrder/getAllMyActiveFinalOrders");
    }

    getMyDeliveredFinalOrders(){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.get("http://localhost:8080/api/finalOrder/getAllMyDeliveredFinalOrders");
    }

   changeFinalOrderStatus(finalOrderWithStatusAndId){
        // this.setTokenInHeader();
        AlertService.setTokenInHeader();
        return axios.put("http://localhost:8080/api/finalOrder/changeStatus", finalOrderWithStatusAndId);
    }

}

export default new MealService();