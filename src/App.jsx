import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoCaretDown } from "react-icons/io5";
import { LiaDatabaseSolid, LiaUploadSolid } from "react-icons/lia";
import { HiOutlineLink } from "react-icons/hi2";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import useCreateModule from "./hooks/useCreateModule";
import useAddLink from "./hooks/useAddLink";
import useEditModule from "./hooks/useEditModule";
import useEditLink from "./hooks/useEditLink";
import useAddResource from "./hooks/useAddResource";

import CreateModule from "./components/modals/create_module";
import EditModule from "./components/modals/edit_module";
import EditLink from "./components/modals/edit_link";
import AddLink from "./components/modals/add_link";
import ModuleCard from "./components/module_card";
import LinkCard from "./components/link_card";
import AddResource from "./components/modals/add_resource";

const MenuItem = ({ text, Icon, onClick }) => {
  return (
    <div
      className="flex flex-row gap-3 items-center py-1.5 px-4 hover:bg-neutral-100 cursor-pointer group"
      onClick={onClick}
    >
      <Icon size={22} color="slategray" />
      <span className="text-[13px] font-medium text-neutral-600 group-hover:text-black"> {text} </span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const createModal = useCreateModule();
  const linkModal = useAddLink();
  const resourceModal = useAddResource();
  const editModule = useEditModule();
  const editLink = useEditLink();

  const [modules, setModules] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const modules = JSON.parse(localStorage.getItem("modules")) || [];
    const resources = JSON.parse(localStorage.getItem("resources")) || [];
    setModules(modules);
    setResources(resources);
  }, []);

  const getItemPosition = (id) => {
    if (id <= 499) return modules.findIndex(module => module.id === id);
    if (id >= 500) return resources.findIndex(link => link.id === id);
    return -1;
  }

  const handleDragEnd = ({ active, over }) => {
    if (active.id === over.id) return;
    if (active.id <= 499 && over.id >= 500) return;

    const originalPos = getItemPosition(active.id, active.type);
    const newPosition = getItemPosition(over.id, active.type);

    if (over.id <= 499 && active.id >= 500) {
      const currLink = resources[originalPos];

      const updatedModules = modules.map(module => {
        if (module.id === over.id) module.resources.push(currLink);
        return module;
      });

      const updatedResources = resources.filter(link => link.id !== active.id);

      localStorage.setItem("modules", JSON.stringify(updatedModules));
      localStorage.setItem("resources", JSON.stringify(updatedResources));

      setModules(updatedModules);
      setResources(updatedResources);

      return;
    }
    
    if (originalPos === -1 || newPosition === -1) return;

    if (active.id <= 499) {
      const updatedModules = arrayMove(modules, originalPos, newPosition);
      localStorage.setItem("modules", JSON.stringify(updatedModules));
      setModules(updatedModules);
    }

    if (active.id >= 500) {
      const updatedResources = arrayMove(resources, originalPos, newPosition);
      localStorage.setItem("resources", JSON.stringify(updatedResources));
      setResources(updatedResources);
    }
  }

  const inputRef = useRef(null);

  const items = modules.concat(resources);

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="my-20 mx-64 flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold"> Course Builder </h1>

          <button
            className={`${menuOpen ? "bg-rose-800" : "bg-rose-600"} text-white px-4 py-0 rounded-md flex flex-row gap-2 items-center transition-all duration-500 relative`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaPlus size={13} />
            <span className="text-sm font-medium"> Add </span>
            <IoCaretDown size={13} className={`${menuOpen ? "transform rotate-180 ease-in-out" : ""}`} />

            { menuOpen && (
              <div className="z-40 flex flex-col py-1.5 w-56 bg-white rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.2)] absolute top-12 right-0">
                <MenuItem Icon={LiaDatabaseSolid} text="Add a module" onClick={createModal.onOpen} />
                <MenuItem Icon={HiOutlineLink} text="Add a link" onClick={linkModal.onOpen} />
                <MenuItem Icon={LiaUploadSolid} text="Upload" onClick={resourceModal.onOpen} />
              </div>
            )}
          </button>
        </div>

        { (modules.length || resources.length) ? (
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-4 mt-10">
                { modules.map((module, index) => (
                  <ModuleCard key={index} module={module} index={index} modules={modules} setModules={setModules} />
                )) }
              </div>
              
              <div className="flex flex-col gap-4">
                { resources.map((link, index) => (
                  <LinkCard key={index} link={link} index={index} resources={resources} setResources={setResources} />
                )) }
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex flex-col h-[70vh] items-center justify-center gap-4">
            <img src="./resources.png" alt="Nothing found." />

            <div className="flex flex-col items-center gap-1">
              <h2 className="text-md font-bold"> Nothing added here yet </h2>
              <p className="text-sm font-medium"> Click on the [+] Add button to add items to this course. </p>
            </div>
          </div>
        ) }
      </div>

      <CreateModule modules={modules} setModules={setModules} />
      <AddLink resources={resources} setResources={setResources} />
      <EditModule module={editModule.module} modules={modules} setModules={setModules} />
      <EditLink module={editLink.link} resources={resources} setResources={setResources} />
      <AddResource resources={resources} setResources={setResources} />
    </div>
  )
}

export default App
