import React, { forwardRef, useRef } from 'react';

const SelectInput = forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    const inputRef = ref || useRef();

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={inputRef}
        >
            {children}
        </select>
    );
});

export default SelectInput;