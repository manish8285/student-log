import { privateAxios } from "./helper"

export const getAllStudents=()=>{
    return privateAxios.get("student/").then(response=>response.data)
}

export const getCourseStudents=(id)=>{
    return privateAxios.get(`student/course/${id}`).then(response=>response.data)
}

export const updateStudent=(student)=>{
    return privateAxios.put("student/",student).then(response=>response.data)
}
export const addStudent=(student)=>{
    return privateAxios.post("student/",student).then(response=>response.data)
}

export const deleteStudent=(id)=>{
    return privateAxios.delete(`student/${id}`).then(response=>response.data)
}