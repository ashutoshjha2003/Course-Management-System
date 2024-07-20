import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../Hooks/useAxiosFetch'
import img from '../../../assets/home/an-individual-learner-being-pers.png'

const PopularTeacher = () => {
  const [instructors, setInstructors] = useState([]) 
  const axiosFetch = useAxiosFetch()
  useEffect(() => {
    axiosFetch.get('/popular-instructors').then((data) => {
      setInstructors(data.data)
    }).catch((err) => {console.log(err)})
  },[])
  // console.log(instructors)

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center dark:text-white'><span className='text-secondary'>Our</span> Amazing <span className='text-secondary'>Teachers</span></h1>
        <div className='w-[40%] text-center mx-auto my-4'>
          <p className='text-gray-500'>Explore our popular classes. Here is some popular teachers based on students feedback</p>
        </div>
      </div>

      {
        instructors ? <>
          <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mx-auto'>
            {
              instructors?.slice(0,8).map((instructor, i) =>(
                <div key={i} className='flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-8 md:px-8 rounded-md'>
                  <div className='flex-col flex gap-6 md:gap-8'>
                  <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={instructor?.instructor?.photoUrl || `${img}`} alt="" />
                    <div className='flex flex-col text-center'>
                      <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.instructor?.name}</p>
                      <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                      <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students: {instructor?.totalEnrolled}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </> : <><p>No Instructor Available</p></>
      }
    </div>
  )
}

export default PopularTeacher