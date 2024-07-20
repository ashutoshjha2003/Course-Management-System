import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {Link, useNavigate} from 'react-router-dom'
import GoogleLogin from '../../Components/Social/GoogleLogin';
import { AuthContext } from '../../Utilities/Providers/AuthProvider';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate()
  const {signUp, updateUser, setError} = useContext(AuthContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    setError('')
    signUp(data.email, data.password).then((result) =>{
      const user = result.user
      if(user){
        return updateUser(data.name, data.photoUrl).then(()=> {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: 'user',
            gender: data.gender,
            phone: data.phone,
            address: data.address
          }
          if(user.email && user.displayName){
            return axios.post('http://localhost:5000/new-user', userImp).then(()=> {
              setError('')
              navigate('/')
              return "Registration Successful!"
            }).catch((err) => {
              throw new Error(err)
            })
          }
        }).catch((err)=> {
          setError(err.code);
          throw new Error(err)
        })
      }
    })
  }
  const password = watch('password', '')

  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>

        {/* Form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Name
              </label>
              <input type="text" placeholder='Enter your name' {...register("name", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>

            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                Email
              </label>
              <input type="email" placeholder='Enter your email address' {...register("email", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>

          </div>


          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Password
              </label>
              <input type="password" placeholder='Enter password' {...register("password", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>

            <div className='mb-4'>
              <label htmlFor="confirmPassword" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Confirm password
              </label>
              <input type="password" placeholder='Enter your email address' {...register("confirm password", { required: true, validate: (value) => value === password || "Password does not match" })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>
            
          </div>


          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="phoneNumber" className='block text-gray-700 font-bold mb-2'>
                <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg' />
                Phone Number
              </label>
              <input type="number" placeholder='Phone Number' {...register("phone", { required: true })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>

            <div className='mb-4'>
              <label htmlFor="photoUrl" className='block text-gray-700 font-bold mb-2'>
                <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg' />
                Photo URL
              </label>
              <input type="photoUrl" placeholder='Photo URL' {...register("photoUrl")} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' />
            </div>
            
          </div>

          <div>
            <div className='mb-4'>
              <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Gender
              </label>
              <select {...register("gender", {required: true} )} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

            </div>

            <div className='mb-4'>
              <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
                <HiOutlineLocationMarker  className='inline-block mr-2 mb-1 text-lg' />
                Address
              </label>
              <textarea {...register("address", { required: true })} rows="3" placeholder='Enter address' className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' ></textarea>

            </div>

          </div>

          <div className='text-center'>
            <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
            {
              errors.password && (<div className='text-gray-500 text-sm w-full mt-1'>
                <p>Password doesn't match!</p>   
              </div>)
            }
          </div>
        </form>

        <p className='text-center mt-4'>
          Already have an account? <Link to='/login' className='underline text-secondary ml-1'> Login</Link>
        </p>

        <GoogleLogin/>
      </div>
    </div>
  )
}

export default Register