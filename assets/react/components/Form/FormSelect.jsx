import React from 'react';
import { MultiSelect } from "react-multi-select-component";

function FormSelect({options, selected, setSelected}) {
    return (
        <MultiSelect
            options={options}
            value={selected ? selected : []}
            onChange={setSelected}
            labelledBy="Select"
        />
    );
}

export default FormSelect;