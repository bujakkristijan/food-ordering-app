import axios from "axios";

class TokenService{
    setTokenInHeader(){
        if (localStorage.token !== undefined && localStorage.token !== null) {
            let tokenBearer = `Bearer ${localStorage.token}`;
            axios.defaults.headers.common['Authorization'] = tokenBearer; 
        }
        else{
            axios.defaults.headers.common['Authorization'] = null;
        }
    }
}

export default new TokenService();