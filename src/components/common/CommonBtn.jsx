import React from 'react'

const CommonBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {
    return (
        <button disabled={disabled} onClick={onclick}
        className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"} cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`} 
        type={type}
        >
            {children ? (
                <div className='flex flex-row justify-center items-center gap-x-4'>
                    <span className={`${outline && "text-yellow-50"}`}>{text}</span>
                    {children}
                </div>
                ) : (
                text
                )}
        </button>
    )
}

export default CommonBtn