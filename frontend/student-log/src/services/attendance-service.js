import { privateAxios } from "./helper"

export const addAttendance=(attendences)=>{
    return privateAxios.post("attendance",attendences).then(response=>response.data)
}

export const getAttendance=(course_id,date)=>{
    return privateAxios.get(`attendance/?date=${date}&course=${course_id}`).then(response=>response.data)
}
