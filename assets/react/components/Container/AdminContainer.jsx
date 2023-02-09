import React from 'react';

function AdminContainer({title, children}) {
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row w-75 ">
                <div className="col min-vh-100 p-4">
                    <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                            role="button">
                        <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas"
                           data-bs-target="#offcanvas"></i>
                    </button>
                    <h1 className="mb-4">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminContainer;