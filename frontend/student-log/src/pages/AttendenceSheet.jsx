import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getCourses } from '../services/course-service'
import { DataGrid } from '@mui/x-data-grid'
import { getCourseStudents } from '../services/student-service'
import { addAttendance } from '../services/attendance-service'

const AttendenceSheet = () => {
  const [students,setStudents] = useState([])
  const [courses,setCourses] = useState([])
  const [course,setCourse] = useState()
  const [attendances, setAttendances] = useState([])
  const [message,setMessage] = useState({
    type:"",
    message:""
  })

  const columns = [
    { field: 'id', headerName: 'S NO.', width: 90 },
    {
      field: 'rollNo',
      headerName: 'Roll No',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Student Name',
      width: 150,
      editable: true,
    },
    {
      field: 'course.name',
      headerName: 'Course',
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.course.name,
    },
    {
      field: 'class',
      headerName: 'class',
      width: 150,
      editable: true,
    },

  ];
  

  const getAllCourses=()=>{
    getCourses().then((data)=>{
      setCourses(data)
    }).catch(error=>{
      console.log(error)
    })
    
  }

  const getStudents=()=>{
    if(course){
    getCourseStudents(course).then(data=>{
      let stds = []
      data.map((st,index)=>{
        stds.push({...st,id:[index]})
      })
      setStudents(stds)
    }).catch(error=>{
      console.log(error)
    })
  }
  }

  useEffect(()=>{
    console.log("course changed")
      getStudents()
  },[course])

  useEffect(()=>{
    
    getAllCourses()
  },[])

  const submitAttendence=()=>{
    console.log(attendances)
    addAttendance(attendances).then(data=>{
      console.log(data)
      setMessage({
        type:"success",
        message:data.message
      })
    }).catch(error=>{
      console.log(error)
      setMessage({
        type:"error",
        message:"Something went wrong"
      })
    
    })
  }


  return (
    <Base>
        <div className='w-full space-y-5'>
          <div className='w-full p-3'><h1 className='text-primary text-xl'>Attendance</h1>
          <p className='text-l'><span className='text-gray-400'>Track / </span> Attendance</p>
          </div>

          
          <div className='bg-white rounded mt-3'>

            <form action="">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Course"
                onChange={(event)=>setCourse(event.target.value)}
              >
                {
                  courses.map((course)=>(
                    <MenuItem value={course._id}>{course.name +" "} {course.time}</MenuItem>
                  ))
                }
                
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} >
            <Button variant="contained">Generate Sheet</Button>
            </FormControl>
            </form>

          </div>

          <h2>Students</h2>
          <div className='bg-white'>
          <DataGrid

            className='bg-white w-full'
              rows={students}
              columns={columns}
              onRowSelectionModelChange={(id) => {
                
                  let st ={course:course,student:students[id]}
                  if(!attendances.includes(st)){
                    setAttendances([...attendances,st])
                  }
                
              }}
              checkboxSelection={true}
              disableColumnSelector={true}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              
              
            />

              
              
          </div>
          <Button onClick={()=>setEditModal(true)} >Update</Button>
          <div>
          <Button variant="contained" onClick={()=>submitAttendence()} >Submit</Button>
          </div>
          {
      (message) &&(<Alert severity={message?.type}>{message?.message}</Alert>)
    }
          
        </div>
    </Base>
    
  )
}

export default AttendenceSheet