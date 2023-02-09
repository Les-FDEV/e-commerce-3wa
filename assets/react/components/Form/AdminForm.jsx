import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";

function AdminForm({
                       formType,
                       formFields,
                       formSubmit,
                       selectedCategories,
                       setSelectedCategories,
                       selectedWeight,
                       setSelectedWeight,
                       selectedColor,
                       setSelectedColor
                   }) {
    const {register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        // if (formType === "edit") {
        //     formFields.forEach(field => {
        //         if (field.name !== "categories") {
        //             setValue(field.name, field.value);
        //         } else {
        //         }
        //     });
        // } else {
        //     formFields.forEach(field => setValue(field.name, ""));
        // }
    }, [formType, formFields, setValue]);


    const renderFormFields = () => {
        return formFields.map((field, index) => {
            switch (field.type) {
                case 'text':
                    return (
                        <div className="mb-3" key={index}>
                            <FormLabel
                                htmlFor={field.name}
                                label={field.label}
                            />
                            <FormInput
                                type="text"
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                register={register}
                                required={true}
                            />
                        </div>
                    );
                case 'textarea':
                    return (
                        <div className="mb-3" key={index}>
                            <FormLabel
                                htmlFor={field.name}
                                label={field.label}
                            />
                            <FormTextarea
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                register={register}
                                required={true}
                            />
                        </div>
                    );
                case 'number':
                    return (
                        <div className="mb-3" key={index}>
                            <FormLabel htmlFor={field.name} label={field.label}/>
                            <FormInput
                                type="number"
                                step="0.01"
                                name={field.name}
                                id={field.name}
                                register={register}
                                required={true}
                            />
                        </div>
                    );
                case 'select':
                    return (
                        <div className="mb-3" key={index}>
                            <FormLabel htmlFor={field.name} label={field.label}/>
                            <FormSelect
                                options={field.options}
                                selected={
                                    field.name === "categories" ?
                                        selectedCategories : field.name === "weight" ?
                                            selectedWeight : selectedColor
                                }
                                setSelected={
                                    field.name === "categories" ?
                                        setSelectedCategories : field.name === "weight" ?
                                            setSelectedWeight : setSelectedColor

                                }
                                multiple={field.multiple}
                            />
                        </div>
                    );
                default:
                    return null;
            }
        });

    }

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            {renderFormFields()}
            <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
            >
                {formType === "add" ? 'Ajouter' : 'Modifier'}
            </button>
        </form>
    );
}

export default AdminForm;