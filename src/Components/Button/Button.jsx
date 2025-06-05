import React from 'react'
import './Button.css'

const Button = ({text, onClick = () => {} , disabled = false , className=''  }) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={className}

        >{text}</button>
    )
}
export default Button
