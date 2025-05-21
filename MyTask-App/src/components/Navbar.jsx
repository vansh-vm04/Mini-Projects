import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar flex justify-center min-w-fit items-center bg-opacity-80 backdrop-blur-sm w-1/2 mx-auto mt-4 rounded-2xl bg-white px-12 py-3 shadow-xl">
        <div className="logo flex gap-2 items-center">
           <img src="taskicon.png" className='max-w-10' alt="" />
            <span className='font-bold text-blue-600 text-3xl font-sans'>MyTask</span>
        </div>
    </nav>
    
  )
}

export default Navbar