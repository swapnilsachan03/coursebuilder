import React from 'react'

const Input = ({
  id,
  label,
  type,
  placeholder,
  register,
  required,
  disabled
}) => {
  return (
    <div className='w-full relative'>
      <label className='text-sm font-semibold'>
        {label}
      </label>

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className="w-full mt-2 p-3 font-medium bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
      />
    </div>
  )
}

export default Input
