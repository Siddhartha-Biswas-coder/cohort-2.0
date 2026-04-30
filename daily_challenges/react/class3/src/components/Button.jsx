import React from 'react'

const Button = (props) => {
  return (
    <div className='w-fit font-bold bg-emerald-700 px-4 py-2 rounded m-2 text-white cursor-pointer'>
        {props.text}
    </div>
  )
}

export default Button