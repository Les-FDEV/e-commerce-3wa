import React from 'react';
import {MultiSelect} from "react-multi-select-component";
import Select from 'react-select'

function FormSelect({multiple, options, selected, setSelected}) {
    return (
        multiple ?
            <MultiSelect
                options={options}
                value={selected ? selected : []}
                onChange={setSelected}
                labelledBy="Select"
            />
            :
            <Select
                options={options}
                value={selected ? selected : []}
                onChange={setSelected}
            />
    );
}

export default FormSelect;