import React from 'react';
import {Routes, Route, HashRouter} from "react-router-dom";
import Sidebar from "../components/Nav/Sidebar";
import AdminProductsPage from "../layout/AdminProductsPage";
import AdminCategoriesPage from "../layout/AdminCategoriesPage";
import AdminOrdersPage from "../layout/AdminOrdersPage";
import AdminCustomersPage from "../layout/AdminCustomersPage";

function AdminApp() {    return (
        <>
            <HashRouter>
                <Sidebar/>
                <Routes>
                    <Route path='/' element={<AdminProductsPage/>}/>
                    <Route path='/produits' element={<AdminProductsPage/>}/>
                    <Route path='/categories' element={<AdminCategoriesPage/>}/>
                    <Route path='/commandes' element={<AdminOrdersPage/>}/>
                    <Route path='/clients' element={<AdminCustomersPage/>}/>
                </Routes>
            </HashRouter>
        </>

    );
}

export default AdminApp;