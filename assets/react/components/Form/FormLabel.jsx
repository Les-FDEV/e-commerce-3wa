import React from 'react';

function FormLabel({htmlFor, label}) {
    return (
        <label htmlFor={htmlFor} className="form-label">{label}</label>
    );
}

export default FormLabel;