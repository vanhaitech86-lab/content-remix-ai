import { create } from 'zustand';
import { Project } from '@/types';

interface AppState {
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  isLoading: boolean;
  activeProjectId: string | null;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setActiveProject: (projectId: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // default dark theme
  sidebarOpen: true,
  isLoading: false,
  activeProjectId: null,
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setLoading: (isLoading) => set({ isLoading }),
  setActiveProject: (projectId) => set({ activeProjectId: projectId }),
}));
