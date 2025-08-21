import React from 'react'
import profile from '../assets/homeImg.webp'

const Home = () => {
    return (
        <div className='h-full w-full px-20 py-4 flex justify-between items-center bg-teal-900 text-white'>
            <div className=''>
                <h1 className='text-8xl font-bold'>Subrat Sapkota</h1>
                <p className='text-2xl font-bold'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
            </div>
            <div className=''>
                <img src={profile} alt="profile" className='h-[500px] rounded-full object-cover border-10 border-white' />
            </div>
        </div>

    )
}

export default Home