import { useForm } from 'react-hook-form';

import Input from '../input';
import Modal from '../modal';

import useCreateModule from '../../hooks/useCreateModule'

const CreateModule = ({ modules, setModules }) => {
  const createModal = useCreateModule();

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      type: "module",
      name: "",
      id: 0,
      resources: [],
      items: []
    }
  });

  const onSubmit = (data) => {
    const newModule = {
      type: data.type,
      id: modules.length == 0 ? 1 : modules[modules.length - 1].id + 1,
      name: data.module_title,
      resources: data.resources,
      items: data.items
    }

    const updatedModules = [...modules, newModule];
    localStorage.setItem("modules", JSON.stringify(updatedModules));
    setModules(updatedModules);
    createModal.onClose();
  }

  const bodyContent = (
    <div>
      <Input
        id="module_title"
        label="Module name"
        placeholder="Enter module name"
        register={register}
        required
      />
    </div>
  )

  return (
    <Modal
      disabled={false}
      isOpen={createModal.isOpen}
      onClose={createModal.onClose}
      title="Create new module"
      actionLabel="Create"
      secondaryActionLabel="Cancel"
      secondaryAction={createModal.onClose}
      body={bodyContent}
      footer={null}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default CreateModule
