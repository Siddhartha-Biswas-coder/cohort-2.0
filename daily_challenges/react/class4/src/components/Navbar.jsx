import React from 'react'

const Navbar = (props) => {
  return (
    <div style={{backgroundColor:props.color}} className='mb-1 flex items-center justify-between text-white px-8 py-7'>
        <h2>{props.title}</h2>
        <div className='flex gap-10'>
            {props.links.map((link,index) => {
                return <h4 key={index}>{link}</h4>
            })}
        </div>
    </div>
  )
}

export default Navbar