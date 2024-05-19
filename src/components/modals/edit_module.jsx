import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../input';
import Modal from '../modal';

import useEditModule from '../../hooks/useEditModule'

const EditModule = ({ modules, setModules }) => {
  const editModule = useEditModule();

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: "",
      id: 0,
      resources: [],
      items: []
    }
  });
  
  const onSubmit = (data) => {
    const updatedModule = {
      id: editModule.module.id,
      name: data.module_name,
      resources: editModule.module.resources,
      items: editModule.module.items
    }

    const updatedModules = modules.map((mod) => {
      if (mod.id === editModule.module.id) return updatedModule;
      return mod;
    });

    localStorage.setItem("modules", JSON.stringify(updatedModules));
    setModules(updatedModules);
    editModule.onClose();
  }

  const bodyContent = (
    <div>
      <Input
        id="module_name"
        label="Module name"
        placeholder={editModule.module.name || "Enter module name"}
        register={register}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={editModule.isOpen}
      onClose={editModule.onClose}
      title="Edit module"
      actionLabel="Save changes"
      secondaryActionLabel="Cancel"
      secondaryAction={editModule.onClose}
      body={bodyContent}
      footer={null}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default EditModule
