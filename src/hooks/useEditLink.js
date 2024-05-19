import { create } from "zustand";

const useEditLink = create((set) => ({
  isOpen: false,
  link: {
    id: 0,
    type: "link",
    url: "",
    displayName: ""
  },
  setEditLink: (link) => set({ link: link }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useEditLink;
