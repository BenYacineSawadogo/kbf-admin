// useSidebarStore.ts
import create from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false, // L'état initial de la sidebar est fermé.
  toggle: () => set((state) => ({ isOpen: !state.isOpen })), // Cette action inverse l'état d'ouverture.
}));
