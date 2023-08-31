
import Base from '../components/Base'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Fade, Modal, TextField } from '@mui/material';
import AddCourse from '../components/AddCourse';
import { addCourse, deleteCourse, getCourses, updateCourse } from '../services/course-service';
import { getToken } from '../services/helper';
import { modalStyle } from '../assets/constant';

const Courses = () => {
  const [course,setCourse] = useState({
    name:"",
    time:""
  })
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
      field: 'name',
      headerName: 'Course',
      width: 150,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 150,
      editable: true,
    }

  ];
  

  const getAllCourses=()=>{
    getCourses().then(data=>{
      
      let c=[]
      c =data.map((course,index)=>{return {...course,id:index}})
      setCourses(c)
      //console.log(data)
      
    }).catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getAllCourses()
  },[])

  // useEffect(()=>{
  //   console.log(courses)
  // },[courses])
  

  const createCourse=()=>{

    //console.log(getToken())
    setMessage(undefined)

    addCourse(course).then(data=>{
      getAllCourses()
      console.log("added successfully")
      setMessage({
        type:"success",
        message:"Course added successfully"
      })
    }).catch(err=>{
      console.log(err)
      setMessage({
        type:"error",
        message:"Something went wrong"
      })
    })
  }

  const editCourse=()=>{
    setEditMessage(undefined)
      let c = selectedRow
      delete c.id
      updateCourse(c).then(data=>{
        console.log(data)
          setEditMessage({
            type:"success",
            message:"Updated Successfully"
          })
          getAllCourses()
      }).catch(error=>{
        console.log(error)
        setEditMessage({
          type:"error",
          message:"Something went wrong"
        }) 
      })
  }

  const removeCourse=()=>{
    deleteCourse(selectedRow._id).then(data=>{
        setEditMessage({
          type:"success",
          message:"Course Deleted Successfully"
        })
        getAllCourses()
        
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

    <div className='w-full p-3'><h1 className='text-primary text-xl'>Course</h1>
          <p className='text-l'><span className='text-gray-400'>Manage / </span>  Course</p>
    </div>

    <div className='bg-white p-5 rounded'>
     <form className='space-y-3'>
    <TextField onChange={(event)=>setCourse({...course,"name":event.target.value})} value={course?.name} className='w-full' id="standard-basic" label="Course Name" variant="standard" />
    <TextField onChange={(event)=>setCourse({...course,"time":event.target.value})} value={course?.time} className='w-full' id="standard-basic" label="Course Time" variant="standard" />


    <Button id="btnAdd" onClick={()=>createCourse()} variant="outlined">Add Course</Button>

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
            <TextField onChange={(event)=>setSelectedRow({...selectedRow,"name":event.target.value})} value={selectedRow?.name} className='w-full'  label="Course Name" variant="standard" />
            <TextField onChange={(event)=>setSelectedRow({...selectedRow,"time":event.target.value})} value={selectedRow?.time} className='w-full'  label="Course Time" variant="standard" />
            <div className='space-x-2'>
            <Button id="btnEdit" onClick={()=>editCourse()} variant="outlined">Update Curse</Button>
            <Button id="btnEdit" onClick={()=>removeCourse(selectedRow.id)} variant="outlined">Delete Curse</Button>
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
        rows={courses}
        columns={columns}
        onRowSelectionModelChange={(id) => {
          
            setSelectedRow(courses[id]);
          
        }}
        checkboxSelection={false}
        disableColumnSelector={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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

export default Courses