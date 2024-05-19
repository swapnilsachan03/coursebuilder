import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { HiOutlineLink } from "react-icons/hi2";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdDragIndicator } from 'react-icons/md';

import useEditLink from '../hooks/useEditLink';
import { SiAdobeacrobatreader } from 'react-icons/si';
import { IoImageOutline } from 'react-icons/io5';

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

const NestedLinkCard = ({ index, link }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const editModal = useEditLink();

  const deleteLink = () => {
    const resources = JSON.parse(localStorage.getItem("resources")) || [];
    const updatedResources = resources.filter((_, i) => i !== index);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    window.location.reload();
  }

  return (
    <div
      key={index}
      ref={setNodeRef}
      style={style}
      className="flex flex-row w-full justify-between items-center border-t-[1px] border-gray-200 rounded-b-lg bg-white pl-[60px] p-3 group relative"
    >
      <div className="flex flex-row items-center gap-4 px-1">
      { link.type == "link" ? (
          <div className="rounded-md p-2 border-[1px] text-cyan-600 border-cyan-100 bg-cyan-100 transform">
            <HiOutlineLink size={18} />
          </div>
        ) : link.file_type == "application/pdf" ? (
          <div className="rounded-md p-2 border-[1px] text-rose-500 border-rose-100 bg-rose-100 transform">
            <SiAdobeacrobatreader size={18} />
          </div>
        ) : (
          <div className="rounded-md p-2 border-[1px] text-green-500 border-green-100 bg-green-100 transform">
            <IoImageOutline size={18} />
          </div>
        )}

        <div className="flex flex-col items-start">
          <h2 className="font-semibold"> {link.displayName} </h2>

          <p className="text-xs text-neutral-600">
            { link.type == "link" ? "Link" : link.file_type == "application/pdf" ? "PDF" : "Image"}
          </p>
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
          <div className="z-40 flex flex-col py-1.5 w-32 bg-white rounded-lg shadow-[0px_5px_10px_rgba(0,0,0,0.2)] absolute top-10 right-0">
            <MenuItem Icon={LuPencilLine} text="Edit" onClick={() => {
              editModal.onOpen()
              editModal.setEditLink(link)
            }} />
            <MenuItem Icon={RiDeleteBinLine} text="Delete" red onClick={deleteLink} />
          </div>
        )}
      </div>

      <div
        className="absolute -left-1.5 hidden group-hover:flex w-20 h-full flex-col items-center justify-center"
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
  )
}

export default NestedLinkCard
