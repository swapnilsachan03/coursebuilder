import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import Input from '../input';
import Modal from '../modal';

import useAddLink from '../../hooks/useAddLink'

const AddLink = ({ resources, setResources }) => {
  const linkModal = useAddLink();

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      type: "link",
      url: "",
      displayName: ""
    }
  });

  const onSubmit = (data) => {
    const newLink = {
      type: "link",
      id: resources.length == 0 ? 500 : resources[resources.length - 1].id + 1,
      url: data.url,
      displayName: data.display_name
    }

    const updatedResources = [...resources, newLink];
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    setResources(updatedResources);
    linkModal.onClose();
  }

  const bodyContent = (
    <div className='flex flex-col gap-8'>
      <Input
        id="url"
        label="URL"
        placeholder="Enter link URL"
        register={register}
        required
      />

      <Input
        id="display_name"
        label="Display name"
        placeholder="Enter display name"
        register={register}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={linkModal.isOpen}
      onClose={linkModal.onClose}
      title="Add new link"
      actionLabel="Add"
      secondaryActionLabel="Cancel"
      secondaryAction={linkModal.onClose}
      body={bodyContent}
      footer={null}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default AddLink
