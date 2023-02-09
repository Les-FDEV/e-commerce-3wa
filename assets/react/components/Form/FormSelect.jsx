import React from 'react';
import {MultiSelect} from "react-multi-select-component";

function FormSelect({multiple, options, selected, setSelected}) {
    return (
        multiple ?
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
            />
            :
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
                hasSelectAll={false}
            />
    );
}

export default FormSelect;