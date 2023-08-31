import { BASE_URL, privateAxios } from "./helper";

export const addCourse=(course)=>{
    return privateAxios.post("course/",course).then(response=>response.data)
}

export const getCourses=()=>{
    return privateAxios.get("course/").then(response=>response.data)
}

export const deleteCourse=(id)=>{
    return privateAxios.delete(`course/${id}`).then(response=>response.data)
}

export const updateCourse=(course)=>{
    return privateAxios.put(`course/`,course).then(response=>response.data)
}