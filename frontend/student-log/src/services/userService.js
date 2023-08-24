import axios from "axios";
import { BASE_URL } from "./helper";

export const signInUser=(data)=>{
    return axios.post(BASE_URL+"user/login",data).then(response=>response.data)
}

