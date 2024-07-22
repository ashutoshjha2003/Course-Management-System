import React from 'react'
import useAuth from '../../../Hooks/useAuth'
import { useLoaderData } from 'react-router-dom'
import useAxiosFetch from '../../../Hooks/useAxiosFetch'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const UpdateUser = () => {
    const {user} = useAuth()
    const userCredentials = useLoaderData() 
    // console.log(userCredentials)
    const axiosFetch = useAxiosFetch()
    const axiosSecure = useAxiosSecure()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);
        axiosSecure.put(`/update-user/${userCredentials?._id}`, updatedData).then(res => {
            if(res.data.modifiedCount > 0){
                alert("User updated successfully!");
            }
            console.log(res.data)
        }).catch(err => console.log(err))
    }

  return (
    <div>
        <h1 className='text-center text-4xl font-bold mt-5'>Update : <span className='text-secondary'>{user?.displayName}</span></h1>
        <p className='text-center'>Change details about <span className='text-red-400'>{user?.displayName}</span></p>

        {/* Form */}
        <section>
            <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                    <form className='space-y-4' onSubmit={handleFormSubmit}>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label className='ml-2 pb-4' htmlFor="name">Nmae</label>
                                <input className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' placeholder='Your Name' required defaultValue={userCredentials?.name ? userCredentials?.name : ""} id='name' name='name' type="text" />
                            </div>
                            <div>
                                <label className='ml-2' htmlFor="phone">Phone</label>
                                <input className='w-full mt-3 rounded-lg border outline-none border-secondary p-3 text-sm' placeholder='Phone Number' required type="tel" id='phone' defaultValue={userCredentials?.phone ? userCredentials?.phone : ""} name='phone' />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label className='ml-2' htmlFor="students">Email</label>
                                <p className='text-[12px] ml-2 text-red-400'>Update email is not recommended. Please leave it default</p>
                                <input className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm' placeholder='Email Address' type="email" required defaultValue={userCredentials?.email} name='email' id='email' />
                            </div>
                            <div>
                                <label className='ml-2' htmlFor="skills">Skills</label>
                                <p className='text-[12px] ml-2 text-red-400'>If the user is an teacher, then set skills: otherwise, leave it empty</p>
                                <input className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm'
                                placeholder='Skills' defaultValue={userCredentials?.skills ? userCredentials?.skills : ""} type="text" name='skills' />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <div>
                                <label className='ml-2' htmlFor="address">Address</label>
                                <input className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm' placeholder='Address' required defaultValue={userCredentials?.address} name='address' type="text" />
                            </div>
                            <div>
                                <label className='ml-2' htmlFor="photoUrl">Photo URL</label>
                                <input className='w-full mt-2 rounded-lg border outline-none border-secondary p-3 text-sm' placeholder='Photo URL' name='photoUrl' defaultValue={userCredentials?.photoUrl} type="text" />
                            </div>
                        </div>
                        <h1>Please select a role</h1>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            <div>
                                <input className='peer sr-only' id='option1' type="radio" value='user' defaultChecked={userCredentials?.role === 'user' ? true : false} tabIndex="1" name='option' />
                                <label htmlFor="option1" className='block w-full rounded-lg border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0">
                                    <span className='text-sm font-medium'>User</span>
                                </label>
                            </div>
                            <div>
                                <input className='peer sr-only' id='option2' type="radio" value='admin' defaultChecked = {userCredentials?.role === 'admin' ? true : false} tabIndex="1" name='option' />
                                <label htmlFor="option2" className='block w-full rounded-lg border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex="0" ><span className='text-sm font-medium'>Admin</span></label>
                            </div>
                            <div>
                                <input className='peer sr-only' id='option3' value='instructor' type="radio" defaultChecked={userCredentials?.role === 'instructor' ? true : false} tabIndex='1' name='option' />
                                <label htmlFor="option3" className='block w-full rounded-lg border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white' tabIndex='0' ><span className='text-sm font-medium'>Teacher</span></label>
                            </div>
                        </div>
                        <div>
                            <label className='sr-only' htmlFor="message">About</label>
                            <textarea className='w-full resize-none rounded-lg border-secondary border outline-none p-3 text-sm' placeholder='About user' rows='4' defaultValue={userCredentials?.about ? userCredentials?.about : ""} name="about" id="message"></textarea>
                        </div>
                        <div className='mt-4'>
                            <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Update user</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
  )
}

export default UpdateUser