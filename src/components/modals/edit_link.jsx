import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import Input from '../input';
import Modal from '../modal';

import useEditLink from '../../hooks/useEditLink'

const EditLink = ({ resources, setResources }) => {
  const linkModal = useEditLink();

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: linkModal.link
  });

  const onSubmit = (data) => {
    const updatedLink = {
      ...linkModal.link,
      id: linkModal.link.id,
      url: data.url,
      displayName: data.display_name
    }

    const updatedResources = resources.map((link) => {
      if (link.id === linkModal.link.id) return updatedLink;
      return link;
    });

    localStorage.setItem("resources", JSON.stringify(updatedResources));
    setResources(updatedResources);
    linkModal.onClose();
  }

  const bodyContent = (
    <div>
      <Input
        id="url"
        label="URL"
        placeholder={linkModal.link.url || "Enter link URL"}
        register={register}
        required
      />

      <br/>

      <Input
        id="display_name"
        label="Display name"
        placeholder={linkModal.link.displayName || "Enter display name"}
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
      title="Edit link"
      actionLabel="Save changes"
      secondaryActionLabel="Cancel"
      secondaryAction={linkModal.onClose}
      body={bodyContent}
      footer={null}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default EditLink
