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
                       isSubmit,
                       currentId
                   }) {
    const {register, handleSubmit, setValue} = useForm(),
        [change, setChange] = useState(false)
    let fin = false

    useEffect(() => {
        if (formType === "") {
            formFields.forEach(field => {
                if (field.value && field.value !== "" && !fin) {
                    if (field.name !== "categories" && field.name !== "weight" && field.name !== "color") {
                        setValue(field.name,"")
                    }
                    if (field.name === "categories") setSelectedCategories([])
                    if (field.name === "weight") setSelectedWeight("")
                    if (field.name === "color") setSelectedColor("")
                }
            })
        }
        if (formType === "edit") {
            setTimeout(() => {
                console.log('fin1', fin)
                formFields.forEach(field => {
                    if (field.value && field.value !== "" && !fin) {
                        if (field.name !== "categories" && field.name !== "weight" && field.name !== "color") {
                            setValue(field.name, field.value);
                        } else {
                            if (field.name === "categories") {
                                setSelectedCategories(field.value)
                                fin = true
                            }
                            if (field.name === "weight") {
                                setSelectedWeight(field.value)
                            }
                            if (field.name === "color") {
                                setSelectedColor(field.value)
                            }
                        }
                    }
                })
                if (!fin) setChange(!change)
                console.log('fin2', fin)
            }, 2000)
        }
    }, [formType, change, currentId]);

    useEffect(() => {
        if (isSubmit) {
            formFields.forEach(field => {
                setValue(field.name, "");
                setSelectedColor([])
                setSelectedWeight([])
                setSelectedCategories([])
            })
        }
    }, [isSubmit])

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
                case 'file':
                    return (
                        <div className="mb-3" key={index}>
                            <FormLabel htmlFor={field.name} label={field.label}/>
                            <FormInput
                                type="file"
                                name={field.name}
                                id={field.name}
                                register={register}
                                required={true}
                            />
                        </div>
                    );
                default:
                    return null;
            }
        });

    }

    return (
        <form onSubmit={handleSubmit(formSubmit)} encType="multipart/form-data">
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