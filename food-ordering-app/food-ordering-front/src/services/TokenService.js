import axios from "axios";


class TokenService{

    setTokenInHeader(){
        if (localStorage.token !== undefined && localStorage.token !== null) {
            let tokenBearer = `Bearer ${localStorage.token}`;
            axios.defaults.headers.common['Authorization'] = tokenBearer; 
        }
    }
}

export default new TokenService();