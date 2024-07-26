import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addCourse } from '../services/course-service'

const AddCourse = () => {

  const [course,setCourse] = useState()

  const createCourse=()=>{

    addCourse(course).then(data=>{
      console.log(data);
      
    })
  }


  return (
    <form className='space-y-3'>
    <TextField className='w-full' id="standard-basic" label="Course Name" variant="standard" />
    <TextField className='w-full' id="standard-basic" label="Course Time" variant="standard" />


    <Button variant="outlined">Add Course</Button>
    </form>
  )
}

export default AddCourse