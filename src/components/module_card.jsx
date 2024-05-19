import { useState } from 'react'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DndContext, closestCorners } from '@dnd-kit/core'

import { IoCaretDown } from 'react-icons/io5'
import { BsChatDots, BsThreeDotsVertical } from 'react-icons/bs'
import { LuPencilLine } from 'react-icons/lu'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdDragIndicator } from 'react-icons/md'

import NestedLinkCard from './nested_link_card'

import useEditModule from '../hooks/useEditModule'

const MenuItem = ({ text, Icon, onClick, red }) => {
  if (red) {
    return (
      <div
        className="flex flex-row gap-3 items-center py-1.5 px-4 text-rose-500 hover:bg-neutral-100 cursor-pointer group"
        onClick={onClick}
      >
        <Icon size={18} />
        <span className="text-[13px] font-medium"> {text} </span>
      </div>
    )
  }

  return (
    <div
      className="flex flex-row gap-3 items-center py-1.5 px-4 hover:bg-neutral-100 cursor-pointer group"
      onClick={onClick}
    >
      <Icon size={18} color="slategray" />
      <span className="text-[13px] font-medium text-neutral-600 group-hover:text-black"> {text} </span>
    </div>
  )
}

const ModuleCard = ({ module, index, modules, setModules }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const editModule = useEditModule();

  const deleteModule = () => {
    const updatedModules = modules.filter((_, i) => i !== index);
    localStorage.setItem("modules", JSON.stringify(updatedModules));
    setModules(updatedModules);
  }

  const [expanded, setExpanded] = useState(false);

  const handleDragEnd = ({ active, over }) => {
    if (active.id === over.id) return;
    if (active.id < 500 || over.id < 500) return;

    const resources = module.resources;

    const oldIndex = resources.findIndex(item => item.id === active.id);
    const newIndex = resources.findIndex(item => item.id === over.id);

    const updatedResources = arrayMove(resources, oldIndex, newIndex);
    module.resources = updatedResources;
    
    const updatedModules = modules.map(m => {
      if (m.id === module.id) return module;
      return m;
    });

    setModules(updatedModules);
  }

  return (
    <div
      key={index}
      ref={setNodeRef}
      style={style}
      className="border-[1px] border-gray-200 bg-white rounded-lg relative"
    >
      <div className='flex flex-row justify-between items-center p-3 group'>
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-4 px-2.5'>
            <div
              className={`rounded-full p-1 border-[1px] text-neutral-500 border-neutral-200 cursor-pointer transition-all duration-300 ${expanded ? "" : "-rotate-90"}`}
              onClick={() => setExpanded(!expanded)}
            >
              <IoCaretDown size={18} />
            </div>

            <div className="flex flex-col items-start">
              <h2 className="font-semibold"> {module.name} </h2>
              <p className="text-xs text-neutral-600">
                { module.resources.length == 0 ? (
                  "Add items to this module"
                ) : (
                  `${module.resources.length} items`
                ) }
              </p>
            </div>
          </div>
        </div>

        <div
          className="text-neutral-600 transition-all duration-200 relative self-start h-[40px] flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <button className={`${menuOpen ? "bg-neutral-200" : ""} rounded-md p-1.5 max-h-8 relative`}>
            <BsThreeDotsVertical size={18} />
          </button>

          { menuOpen && (
            <div className="z-40 flex flex-col py-1.5 w-52 bg-white rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.2)] absolute top-10 right-0">
              <MenuItem Icon={LuPencilLine} text="Edit module name" onClick={() => {
                editModule.onOpen()
                editModule.setEditModule(module)
              }} />
              <MenuItem Icon={RiDeleteBinLine} text="Delete" red onClick={deleteModule} />
            </div>
          )}
        </div>

        <div
          className="absolute -left-[70px] top-0 hidden group-hover:flex w-20 h-[66px] flex-col items-center justify-center"
          {...attributes}
          {...listeners}
        >
          <button
            className='items-center justify-center p-1.5 rounded-md text-neutral-600 transition-all duration-500'
          >
            <MdDragIndicator size={22} />
          </button>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={module.resources}
          strategy={verticalListSortingStrategy}
        >
          { expanded && (module.resources.length > 0) && (
            <div className="flex flex-col duration-300">
              { module.items.map((item, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <BsChatDots size={18} />
                  <span className="text-xs text-neutral-600"> {item} </span>
                </div>
              )) }

              { module.resources.map((link, i) => (
                <NestedLinkCard key={i} index={i} link={link} />
              )) }
            </div>
          ) }
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default ModuleCard
