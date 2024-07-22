import React, { useState } from 'react'
import useAuth from '../Hooks/useAuth'
import useUser from '../Hooks/useUser'
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi'
import { FaHome,FaUsers } from 'react-icons/fa'
import { IoSchoolSharp } from 'react-icons/io5'
import { IoMdDoneAll } from 'react-icons/io'
import { BsFillPostcardFill } from 'react-icons/bs'
import { SiGoogleclassroom, SiInstructure  } from 'react-icons/si'
import { TbBrandAppleArcade } from 'react-icons/tb'
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom'
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from 'react-icons/md'
import { GiFigurehead } from 'react-icons/gi'
import Swal from 'sweetalert2'
import Scroll from '../Hooks/useScroll'
import { HashLoader } from 'react-spinners'


const adminNavItems = [
    {to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard Home"},
    {to: "/dashboard/manage-users", icon: <FaUsers className='text-2xl' />, label: "Manage Users"},
    {to: "/dashboard/manage-classes", icon: <BsFillPostcardFill className='text-2xl' />, label: "Manage Classes"},
    {to: "/dashboard/manage-applications", icon: <TbBrandAppleArcade className='text-2xl' />, label: "Manage Applications"}
]

const instructorNavItems = [
    {to: "/dashboard/instructor-cp", icon: <FaHome className='text-2xl'/>, label: "Home" },
    {to: "/dashboard/add-class", icon: <MdExplore className='text-2xl'/>, label: "Add a class" },
    {to: "/dashboard/my-classes", icon: <IoSchoolSharp className='text-2xl'/>, label: "My Classes" },
    {to: "/dashboard/my-pending", icon: <MdPendingActions className='text-2xl'/>, label: "Pending Course" },
    {to: "/dashboard/my-approved", icon: <IoMdDoneAll className='text-2xl'/>, label: "Approved Classes" }
]

const student = [
    {to: "/dashboard/student-cp", icon: <BiHomeAlt className='text-2xl'/>, label: "Dashboard" },
    {to: "/dashboard/enrolled-classes", icon: <SiGoogleclassroom className='text-2xl'/>, label: "My Enroll" },
    {to: "/dashboard/my-selected", icon: <BiSelectMultiple className='text-2xl'/>, label: "My Selected" },
    {to: "/dashboard/my-payments", icon: <MdPayments className='text-2xl'/>, label: "Payment History" },
    {to: "/dashboard/apply-instructor", icon: <SiInstructure className='text-2xl'/>, label: "Apply For Teacher" }
]

const lastMenuItem = [
    {to: "/" , icon: <BiHomeAlt className='text-2xl' />, label: "Main Home"},
    {to: "/trending" , icon: <MdOfflineBolt className='text-2xl' />, label: "Trending"},
    {to: "/browse" , icon: <GiFigurehead className='text-2xl' />, label: "Following"},
]

const DashboardLayout = () => {
    const [open, setOpen] = useState(true)
    const {loader, logout} = useAuth()
    const {currentUser} = useUser()
    const navigate = useNavigate()
    const role = currentUser?.role

    const handlelogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can login when you want !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout me!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(Swal.fire({
                    title: "Logged out!",
                    text: "Your are logout.",
                    icon: "success"
                })).catch((error) => console.log(error))
            }
            navigate("/")
        });
    }


    if(loader){
        return <div className='flex justify-center items-center h-screen'>
            <HashLoader size={50} color="#df3b1f" />
        </div>
    }


  return (
    <div className='flex'>
        <div className={`${open? "w-72 overflow-hidden" : "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}>
            <div className='flex gap-x-4 items-center'>
                <img 
                    onClick={() => setOpen(!open)} 
                    src="/logo.png" 
                    alt="" 
                    className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} 
                />
                <Link to="/">
                    <h1 
                        onClick={() => setOpen(!open)} 
                        className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        Course Management System
                    </h1>
                </Link>
            </div>

            {/* navlinks */}
            {/* Admin role */}
            { role === "admin" && (
                <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    { role === "admin" && adminNavItems.map((menuItem, index) => (
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to} className={({isActive})=>`flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            {/* Instructor role */}
            { role === "instructor" && (
                <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    { role === "instructor" && instructorNavItems.map((menuItem, index) => (
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to} className={({isActive})=>`flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            {/* Student role */}
            { role === "user" && (
                <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                    { role === "user" && student.map((menuItem, index) => (
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to} className={({isActive})=>`flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}

            <ul className='pt-6'>
                <p className={`ml-3 text-gray-500 uppercase mb-3 ${!open && "hidden"}`}>
                    <small>
                        Useful Links
                    </small>
                </p>
                { lastMenuItem.map((menuItem, index) => (
                    <li key={index} className='mb-2'>
                        <NavLink to={menuItem.to} className={({isActive})=>`flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                        </NavLink>
                    </li>
                ))}

                <li>
                    <button  onClick={() => handlelogOut()} className=" flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 w-full"> <BiLogInCircle className='text-2xl' />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
                    </button>
                </li>
            </ul>
        </div>

        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll />
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout