import { create } from "zustand";

const useEditModule = create((set) => ({
  isOpen: false,
  module: {
    id: 0,
    name: "",
    resources: [],
    items: []
  },
  setEditModule: (module) => set({ module: module }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useEditModule;
