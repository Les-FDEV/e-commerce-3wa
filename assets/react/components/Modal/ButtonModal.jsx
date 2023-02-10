import React from 'react';

function ButtonModal({buttonLabel, setShowModal, setFormType, setProduct}) {
    return (
        <button
            className="btn btn-primary mb-4"
            data-bs-toggle="modal" data-bs-target="#modalAdmin"
            onClick={() => {
                setFormType("add")
                setShowModal(true)
                setProduct({})
            }}
        >
            {buttonLabel}
        </button>
    );
}

export default ButtonModal;