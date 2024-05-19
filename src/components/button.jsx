const Button = ({
  label,
  onClick,
  disabled,
  outline,
  icon: Icon
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition text-sm font-medium py-2.5 px-4 border-[1px]
        ${outline ? `bg-white` : `bg-[#008392]`}
        ${outline ? `border-neutral-400` : `border-[#008392]`}
        ${outline ? `text-neutral-500` : `text-white`}
      `}
    >
      { Icon &&
        <Icon
          size={24}
          className='absolute left-4 top-3'
        />
      }
      { label }
    </button>
  )
}

export default Button
