import React from 'react';

function FormInput({type, step, name, placeholder, register, required}) {
    return (
        <input
            type={type}
            step={step}
            id={name}
            className="form-control"
            {...register(
                name,
                {
                    required: required
                }
            )}
            placeholder={placeholder}
        />
    );
}

export default FormInput;