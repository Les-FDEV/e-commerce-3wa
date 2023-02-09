import React from 'react';

function FormSelect({name,multiple, options, register, required, value, defaultValue}) {
    return (
        <select
            className="form-select"
            multiple={multiple}
            {...register(
                name,
                {required: required}
            )}
        >
            {!value &&
                <>
                    <option value="">{defaultValue}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>{option.name}</option>
                    ))}
                </>
            }
            {value &&
                options.map((option, index) => (
                    <option
                        key={index}
                        value={option.id}
                        selected={value.some(v => v.id === option.id)}
                    >
                        {option.name}
                    </option>
                ))
            }
        </select>
    );
}

export default FormSelect;