import React from 'react';

function ButtonModal({buttonLabel, setShowModal, setFormType}) {
    return (
        <button
            className="btn btn-primary mb-4"
            data-bs-toggle="modal" data-bs-target="#modalAdmin"
            onClick={() => {
                setFormType("add")
                setShowModal(true)
            }}
        >
            {buttonLabel}
        </button>
    );
}

export default ButtonModal;