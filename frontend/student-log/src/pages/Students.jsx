import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { addStudent, deleteStudent, getAllStudents,updateStudent } from '../services/student-service'
import { Alert, Box, Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { modalStyle } from '../assets/constant'
import { getCourses } from '../services/course-service'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const Students = () => {
  const [student,setStudent] = useState({
    name:"",
    rollNo:"",
    class:"",
    course:"",
    fee:"",
    joiningDate:""
  })
  const [students,setStudents] = useState([])
  const [courses,setCourses] = useState([])
  const [selectedRow,setSelectedRow] = useState()
  const [editModal,setEditModal] = useState(false)
  const [editMessage,setEditMessage] = useState(undefined)
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
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Student Name',
      width: 150,
      editable: false,
    },
    {
      field: 'course.name',
      headerName: 'Course',
      width: 250,
      editable: false,
      valueGetter: (params) => params.row?.course?.name,
    },
    {
      field: 'class',
      headerName: 'class',
      width: 150,
      editable: false,
    },
    {
      field:'joiningDate',
      headerName:'Joining Date',
      width:150,
      editable:false,
      valueGetter:(params)=> new Date(params.row.joiningDate).toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric'})
    },
    {
      field :'fee',
      headerName:'fee',
      editable:false,

    }


  ];
  

  const getAllCourses=()=>{
    getCourses().then((data)=>{
      setCourses(data)
    }).catch(error=>{
      console.log(error)
    })
    
  }
  const getAll=()=>{
    getAllStudents().then(data=>{
      console.log(data)
      
      let c=[]
      c =data.map((course,index)=>{return {...course,id:index}})
      setStudents(c)
      //console.log(data)
      
    }).catch(error=>{
      console.log(error)
    })
    
  }

  useEffect(()=>{
    getAll()
    getAllCourses()
  },[])

  // useEffect(()=>{
  //   console.log(courses)
  // },[courses])
  

  const createStudent=()=>{

    console.log(student)
    setMessage(undefined)

    addStudent(student).then(data=>{
      getAll()
      console.log("added successfully")
      setMessage({
        type:"success",
        message:"Student added successfully"
      })
    }).catch(err=>{
      console.log(err)
      setMessage({
        type:"error",
        message:"Something went wrong"
      })
    })
  }

  const editStudent=()=>{
    setEditMessage(undefined)
      let c = selectedRow
      delete c.id
      updateStudent(c).then(data=>{
        console.log(data)
          setEditMessage({
            type:"success",
            message:"Updated Successfully"
          })
          getAll()
      }).catch(error=>{
        console.log(error)
        setEditMessage({
          type:"error",
          message:"Something went wrong"
        }) 
      })
  }

  const removeStudent=()=>{
    deleteStudent(selectedRow._id).then(data=>{
        setEditMessage({
          type:"success",
          message:"Student Deleted Successfully"
        })
        getAll()
        
    }).catch(error=>{
      setEditMessage({
        type:"error",
        message:"Something went wrong"
      }) 
    })
}
  return (
    <Base>
    <div className='flex-row w-full justify-between p-4 space-y-3'>

      <div className='w-full p-3'><h1 className='text-primary text-xl'>Student</h1>
            <p className='text-l'><span className='text-gray-400'>Manage / </span>  Student</p>
      </div>

    <div className='bg-white p-5 rounded'>
     <form className='space-y-3'>
    <TextField onChange={(event)=>setStudent({...student,"name":event.target.value})} value={student?.name} className='w-full' id="standard-basic" label="Student Name" variant="standard" />
    <div style={{marginTop:"40px"}}>
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Course</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={student.course}
    label="Course"
    onChange={(event)=>setStudent({...student,"course":event.target.value})}
  >
    
    {
      courses.map((course)=>(
        <MenuItem value={course?._id}>{course?.name}</MenuItem>
      ))
    }
  </Select>
</FormControl>
    </div>  
    <TextField onChange={(event)=>setStudent({...student,"class":event.target.value})} value={student?.class} className='w-full' id="standard-basic" label="Class" variant="standard" />
    <TextField onChange={(event)=>setStudent({...student,"fee":event.target.value})} value={student?.fee} className='w-full' id="standard-basic" label="Fee" variant="standard" />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker onChange={(date)=>setStudent({...student,'joiningDate':dayjs(date).toISOString()})} label="Joining Date" />
      </DemoContainer>
    </LocalizationProvider>
    
    
    <Button id="btnAdd" onClick={()=>createStudent()} variant="outlined">Add Student</Button>

    {
      (message) &&(<Alert severity={message?.type}>{message?.message}</Alert>)
    }
    </form>  
    </div>

    <Modal
      open={editModal}
      onClose={()=>setEditModal(!editModal)}
      aria-labelledby="Edit Course"
    >
      <Fade in={editModal}>
        <Box sx={modalStyle}>
        <form className='space-y-3'>
            <TextField onChange={(event)=>setSelectedRow({...selectedRow,"name":event.target.value})} value={selectedRow?.name} className='w-full'  label="Student Name" variant="standard" />
            <TextField onChange={(event)=>setSelectedRow({...selectedRow,"class":event.target.value})} value={selectedRow?.class} className='w-full'  label="Class" variant="standard" />
            <TextField onChange={(event)=>setSelectedRow({...selectedRow,"fee":event.target.value})} value={selectedRow?.fee} className='w-full'  label="Fee" variant="standard" />
            {/* <div style={{marginTop:"40px"}}>
              <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRow?.course}
              label="Course"
              onChange={(event)=>setSelectedRow({...selectedRow,"course":event.target.value})}
            >
    
                  {
                    courses.map((course)=>(
                      <MenuItem value={course?._id}>{course?.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              </div>   
            
              <TextField onChange={(event)=>setSelectedRow({...selectedRow,"time":event.target.value})} value={selectedRow?.time} className='w-full'  label="Class" variant="standard" />
            */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker onChange={(date)=>setSelectedRow({...selectedRow,'joiningDate':dayjs(date).toISOString()})} label="Joining Date" />
              </DemoContainer>
            </LocalizationProvider> */}
              <div className='space-x-2'>
            <Button id="btnEdit" onClick={()=>editStudent()} variant="outlined">Update Student</Button>
            <Button id="btnEdit" onClick={()=>removeStudent(selectedRow.id)} variant="outlined">Delete Student</Button>
            </div>
            {
              (editMessage) &&(<Alert  severity={editMessage?.type}>{editMessage?.message}</Alert>)
            }
        </form>

        </Box>

      </Fade>
    </Modal>


      <DataGrid

      className='bg-white w-full'
        rows={students}
        columns={columns}
        onRowSelectionModelChange={(id) => {
          
            setSelectedRow(students[id]);
          
        }}
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

        <Button onClick={()=>setEditModal(true)} >Edit</Button>
    </div>
    </Base>
  )
}

export default Students