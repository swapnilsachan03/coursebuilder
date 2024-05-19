import React, { useState } from "react";
import Modal from "../modal";

import useAddResource from "../../hooks/useAddResource";

const AddResource = ({ resources, setResources }) => {
  const addResourceModal = useAddResource();
  const [file, setFile] = useState(null);

  const onSubmit = () => {
    const newResource = {
      id: resources.length == 0 ? 500 : resources[resources.length - 1].id + 1,
      type: "resource",
      file_type: file.type,
      displayName: file.name,
      url: ""
    }

    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    addResourceModal.onClose();
  }

  const fileInputHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  }

  const bodyContent = (
    <div>
      <input
        id="file-input"
        type="file"
        accept="application/pdf image/jpg image.jpeg image/png"
        className="hidden"
        onChange={fileInputHandler}
      />

      <label htmlFor="file-input" className="cursor-pointer">
        <p className="text-sm text-neutral-600 font-medium hover:underline"> Click here to choose file </p>
      </label>
    </div>
  )

  return (
    <Modal
      isOpen={addResourceModal.isOpen}
      onClose={addResourceModal.onClose}
      title="Add new resource"
      actionLabel="Add"
      secondaryActionLabel="Cancel"
      secondaryAction={addResourceModal.onClose}
      body={bodyContent}
      footer={null}
      onSubmit={onSubmit}
    />
  )
}

export default AddResource
