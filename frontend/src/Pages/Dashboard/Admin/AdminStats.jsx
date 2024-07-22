import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { FcInspection } from "react-icons/fc";

const AdminStats = ({users}) => {
    const [data, setData] = useState()
    const axiosSecure = useAxiosSecure()
    
    useEffect(() => {
        axiosSecure.get('/admin-stats').then(res => setData(res.data)).catch(err => console.log(err))
    },[])

    console.log(data)
  return (
    <div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-4 sm:px-8'>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-green-500'>
                    <HiOutlineUsers className="h-12 w-12 text-white" />
                </div>

                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Total Member</h3>
                    <p className='text-3xl'>{users.length}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-blue-600'>
                    <FcInspection className="h-12 w-12 text-white"  />
                </div>

                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Approved Class</h3>
                    <p className='text-3xl'>{data?.approvedClasses}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-purple-500'>
                <PiChalkboardTeacherDuotone className="h-12 w-12 text-white"  />

                </div>

                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Teacher</h3>
                    <p className='text-3xl'>{data?.instructors}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-red-400'>
                <MdOutlinePendingActions className="h-12 w-12 text-white"  />
                </div>

                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Pending Class</h3>
                    <p className='text-3xl'>{data?.pendingClasses}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminStats