import React from 'react'
import bgImg from '../../../assets/home/DALL·E-2024-02-03-16.22.29-A-mod.png'

const Hero2 = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start items-center pl-11 text-white bg-black bg-opacity-60'>
          <div className='space-y-4'>
            <p className='md:text-4xl text-2xl'>Best Online </p>
            <h1 className='md:text-7xl text-4xl font-bold'>Courses From Home</h1>
            <div className='md:w-1/2'>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus officia facilis laboriosam, voluptate asperiores iste? Voluptatum iste tempora cumque quas neque veritatis eaque dicta accusamus vel illo? Numquam, at rem.</p>
            </div>
            <div className='flex flex-wrap items-center gap-5'>
              <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button>
              <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Course</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero2