import React from "react";

const Input = ({
    name,
    type = "text",
    placeholder = "",
    label,
    value,
    setValue,
}) => {
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}:</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value || ""}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default Input;
