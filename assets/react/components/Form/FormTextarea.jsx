import React from 'react';

function FormTextarea({name, placeholder, value, register}) {
    return (
        <textarea
            className="form-control"
            id={name}
            rows="3"
            {...register(
                name,
                {required: true}
            )}
            placeholder={placeholder}
        >
        </textarea>
    );
}

export default FormTextarea;