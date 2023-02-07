import React from 'react';
import Table from "../components/Table/Table";

function AdminTable(props) {
    return (
        <Table case={props.useCase}/>
    );
}

export default AdminTable;