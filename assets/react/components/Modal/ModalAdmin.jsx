import React from 'react';

function ModalAdmin({children, formType, setShowModal, setFormType}) {
    return (
        <div className="modal fade" id="modalAdmin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {formType &&
                            <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                {formType !== "add" ? "Edition" : "Ajout"}
                            </h1>
                        }

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={() => setFormType('add')}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                setShowModal(false)
                                setFormType('add')
                            }}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAdmin;