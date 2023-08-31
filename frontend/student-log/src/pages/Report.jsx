import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getCourses } from '../services/course-service'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAttendance } from '../services/attendance-service';
import { DataGrid } from '@mui/x-data-grid';

const Report = () => {
    const [courses,setCourses] = useState([])
    const [course,setCourse] = useState()
    const [date,setDate] = useState()
    const [attendances, setAttendances] = useState([])
    const [toggle,setToggle] = useState(true)
    

    const columns = [
      { field: 'id', headerName: 'S NO.', width: 90 },
      {
        field: 'student.rollNo',
        headerName: 'Roll No',
        width: 150,
        editable: true,
        valueGetter: (params) => params.row.student.rollNo,
      },
      {
        field: 'student.name',
        headerName: 'Student Name',
        width: 150,
        editable: true,
        valueGetter: (params) => params.row.student.name,
      },
      {
        field: 'course.name',
        headerName: 'Course',
        width: 150,
        editable: true,
        valueGetter: (params) => params.row.course.name,
      },
      {
        field: 'status',
        headerName: 'Status',
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



    const changeDate=(value)=>{
      console.log(value)
      setDate(`${value.$y}-${(value.$M+1)}-${value.$D}`)
    }

    const getAllAttendances=()=>{
      setToggle(false)
      console.log("course = "+course+" date : "+date)
      getAttendance(course,date).then(data=>{
        console.log(data)
        let list =[]
        if(data){
          
        data.forEach((at,index)=>{
          list.push({...at,id:index})
        })

        console.log(list)
        }

        setAttendances(list)
      }).catch(error=>{
        console.log(error)
      })
    }


    useEffect(()=>{
        getAllCourses()
    },[])
  return (
    <Base>
        <div className='w-full space-y-5'>
          <div className='w-full p-3'><h1 className='text-primary text-xl'>Attendance</h1>
          <p className='text-l'><span className='text-gray-400'>Analyze / Attendance / </span>  Report</p>
          </div>

          <div className='bg-white rounded '  >

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

            
            <FormControl sx={{ m: 0, minWidth: 120 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(value)=>changeDate(value)} label="Select Date" />
              </DemoContainer>
            </LocalizationProvider>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Button onClick={()=>getAllAttendances()} variant="contained">Get Report</Button>
            </FormControl>
           
            
            </form>

          </div>

          <div className='bg-white' hidden={toggle} >
          <DataGrid

              className='bg-white w-full'
                rows={attendances}
                columns={columns}
                
                checkboxSelection={false}
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



        </div>
    </Base>
  )
}

export default Report