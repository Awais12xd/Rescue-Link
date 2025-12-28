import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = ({ text, size = 'medium' , link }) => {
  const navigate = useNavigate();
  const smallStyle = 'h-10 px-4 text-[13px]'
  const mediumStyle = 'h-10 px-4 md:text-sm text-[13px] font-light'

  return (
    <button onClick={() => navigate(link)} className={`bg-[#ffffff00] text-primary border border-primary btn-hover-effect font-medium transition-all duration-150 ease-in rounded cursor-pointer whitespace-nowrap ${size === 'small' ? smallStyle : mediumStyle }`}>{text}</button>
  )
}

export default Button
