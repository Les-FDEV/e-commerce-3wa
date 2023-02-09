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
                       selectedWeight,
                       setSelectedWeight,
                       selectedColor,
                       setSelectedColor,
                       selectedCategories,
                       setSelectedCategories,
                       currentID
                   }) {
    const {register, handleSubmit, setValue} = useForm();
    const [shouldFillForm, setShouldFillForm] = useState(false);

    useEffect(() => {
        if (formType === "edit") {
            formFields.forEach(field => setValue(field.name, ""));
            setShouldFillForm(true);
        } else {
            setShouldFillForm(false);
        }
    }, [formType, currentID]);

    useEffect(() => {
        if (shouldFillForm) {
            formFields.forEach(field => {
                if (field.name !== "categories") {
                    console.log("ok")
                    setValue(field.name, field.value);
                }
                if (field.name === "categories") {
                    setSelectedCategories(field.value)
                }
                if (field.name === "weight") {
                    setSelectedWeight(field.value)
                }
                if (field.name === "color") {
                    setSelectedColor(field.value)
                }
            });
        }
    }, [shouldFillForm, formFields, setValue, currentID]);

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
                                selected={selected}
                                setSelected={setSelected}
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