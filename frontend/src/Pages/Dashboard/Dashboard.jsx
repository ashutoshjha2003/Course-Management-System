import React from 'react'
import useUser from '../../Hooks/useUser'
import { HashLoader } from 'react-spinners'
import DashboardNavigate from '../../routes/DashboardNavigate'

const Dashboard = () => {
    const {currentUser, isLoading} = useUser()
    const role = currentUser?.role

    if(isLoading){
      return <div className='flex justify-center items-center h-screen'>
        <HashLoader size={50} color="#df3b1f" />
      </div>
    }
  return (
    <DashboardNavigate/>
  )
}

export default Dashboard