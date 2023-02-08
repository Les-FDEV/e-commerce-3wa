import React from 'react';
import {useForm} from "react-hook-form";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";

function AdminForm({formType, formFields, formSubmit}) {
    const {register, handleSubmit} = useForm();

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
                                value={field.value}
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
                                value={field.value}
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
                                value={field.value}
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
                                name={field.name}
                                options={field.options}
                                register={register}
                                required={true}
                                value={field.value}
                                defaultValue={field.defaultValue}
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
            <button type="submit" className="btn btn-primary">{formType === "add" ? 'Ajouter' : 'Modifier'}</button>
        </form>
    );
}

export default AdminForm;