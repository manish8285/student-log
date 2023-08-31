import axios from "axios"

//export const BASE_URL="https://jaali-manish8285.vercel.app/"
export const BASE_URL="http://localhost:8181/api/"


export const privateAxios = axios.create({
    baseURL:BASE_URL
   // withCredentials:false
})

privateAxios.interceptors.request.use(config=>{
    const token = getToken()
    if(token){
        config.headers['Authorization']= `Bearer ${token}`
        return config
    }
    console.log(token)
},error=>Promise.reject(error))
export const isLogedIn=()=>{
    if(localStorage.getItem("user")){
        return true
    }
    return false
}

export const getUserDetails=()=>{
    if(isLogedIn()){
        const user = JSON.parse(localStorage.getItem("user"))
        return user;
    }
    return undefined;
}

export const getToken=()=>{
    const user = getUserDetails()
    if(user){
        return user.token
    }else{
    return undefined
    }
}

export const logOut=()=>{
    if(isLogedIn){
        localStorage.removeItem("user")
        
    }
    return true

}

export const saveUser=(user)=>{
    localStorage.setItem("user",JSON.stringify(user))
}