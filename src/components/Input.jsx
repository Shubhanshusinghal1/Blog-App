import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1 pl-1 text-sm font-medium text-gray-300"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                ref={ref}
                className={`px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 w-full ${className}`}
                {...props}
            />
        </div>
    )
})

export default Input
