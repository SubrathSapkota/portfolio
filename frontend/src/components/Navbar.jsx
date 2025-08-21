import React from 'react'

const Navbar = () => {
    return (
        <div className='px-20 py-4 flex justify-between items-center bg-teal-700 text-white'>
            <div className='text-2xl font-bold'>
                <h1>Subrat Sapkota</h1>
            </div>
            <div className=''>
                <ul className='flex gap-8 font-semibold cursor-pointer'>
                    <li className='hover:text-orange-500'>Home</li>
                    <li className='hover:text-orange-500'>Portfolio</li>
                    <li className='hover:text-orange-500'>Blog</li>
                    <li className='hover:text-orange-500'>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar