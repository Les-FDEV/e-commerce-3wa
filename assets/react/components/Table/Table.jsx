import React from 'react';

function Table({tableHeader, tableData}) {
    const rowHeader = tableHeader.map((header, index) =>
        <th key={index} scope="col">{header.name}</th>
    );

    const rowData = tableData.map((data, index) =>
        <tr key={index}>
            {
                data.map((value, index) =>
                    <td key={index}>{value.value}</td>
                )
            }
        </tr>
    );


    return (
        <table className="table">
            <thead>
            <tr>
                {rowHeader}
            </tr>
            </thead>
            <tbody>
            {rowData}
            </tbody>
        </table>
    )
        ;
}

export default Table;