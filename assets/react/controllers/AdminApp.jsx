import React from 'react';
import {Routes, Route, HashRouter} from "react-router-dom";
import AdminProductPage from "../layout/AdminProductPage";
import Sidebar from "../components/Nav/Sidebar";

function AdminApp(props) {
    return (
        <>
            <HashRouter>
                <Sidebar/>

                <Routes>
                    <Route path='/produits/consulter' element={<AdminProductPage/>}/>
                </Routes>
            </HashRouter>
        </>

    );
}

export default AdminApp;