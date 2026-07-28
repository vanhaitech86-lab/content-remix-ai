import { create } from 'zustand';
import { Project, Transcript, AnalysisResult, Script, Scene } from '@/types';

interface ProjectState {
  currentProject: Project | null;
  transcript: Transcript | null;
  analysis: AnalysisResult | null;
  script: Script | null;
  selectedSceneIndex: number;
  
  // Undo/Redo for script
  undoStack: Script[];
  redoStack: Script[];

  // Actions
  setProject: (project: Project | null) => void;
  updateTranscript: (transcript: Transcript) => void;
  setAnalysis: (analysis: AnalysisResult) => void;
  setScript: (script: Script) => void;
  setSelectedSceneIndex: (index: number) => void;
  
  updateScene: (index: number, scene: Partial<Scene>) => void;
  addScene: (index: number, scene: Scene) => void;
  removeScene: (index: number) => void;
  reorderScenes: (startIndex: number, endIndex: number) => void;
  
  lockScene: (index: number) => void;
  unlockScene: (index: number) => void;
  
  undo: () => void;
  redo: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  transcript: null,
  analysis: null,
  script: null,
  selectedSceneIndex: 0,
  
  undoStack: [],
  redoStack: [],

  setProject: (project) => set({ currentProject: project }),
  
  updateTranscript: (transcript) => set({ transcript }),
  
  setAnalysis: (analysis) => set({ analysis }),
  
  setScript: (script) => set({ 
    script, 
    undoStack: [], 
    redoStack: [] 
  }),
  
  setSelectedSceneIndex: (index) => set({ selectedSceneIndex: index }),

  updateScene: (index, updatedScene) => set((state) => {
    if (!state.script) return state;
    
    const newScript = {
      ...state.script,
      scenes: state.script.scenes.map((s, i) => i === index ? { ...s, ...updatedScene } : s)
    };
    
    return {
      script: newScript,
      undoStack: [...state.undoStack, state.script],
      redoStack: [],
    };
  }),

  addScene: (index, scene) => set((state) => {
    if (!state.script) return state;
    
    const newScenes = [...state.script.scenes];
    newScenes.splice(index, 0, scene);
    
    // update order numbers
    newScenes.forEach((s, i) => s.order = i);
    
    const newScript = { ...state.script, scenes: newScenes };
    
    return {
      script: newScript,
      undoStack: [...state.undoStack, state.script],
      redoStack: [],
    };
  }),

  removeScene: (index) => set((state) => {
    if (!state.script) return state;
    
    const newScenes = state.script.scenes.filter((_, i) => i !== index);
    newScenes.forEach((s, i) => s.order = i);
    
    const newScript = { ...state.script, scenes: newScenes };
    
    return {
      script: newScript,
      undoStack: [...state.undoStack, state.script],
      redoStack: [],
      selectedSceneIndex: Math.max(0, Math.min(state.selectedSceneIndex, newScenes.length - 1)),
    };
  }),

  reorderScenes: (startIndex, endIndex) => set((state) => {
    if (!state.script) return state;
    
    const newScenes = Array.from(state.script.scenes);
    const [removed] = newScenes.splice(startIndex, 1);
    newScenes.splice(endIndex, 0, removed);
    newScenes.forEach((s, i) => s.order = i);
    
    const newScript = { ...state.script, scenes: newScenes };
    
    return {
      script: newScript,
      undoStack: [...state.undoStack, state.script],
      redoStack: [],
    };
  }),

  lockScene: (index) => set((state) => {
    if (!state.script) return state;
    const newScenes = [...state.script.scenes];
    newScenes[index].isLocked = true;
    return { script: { ...state.script, scenes: newScenes } };
  }),

  unlockScene: (index) => set((state) => {
    if (!state.script) return state;
    const newScenes = [...state.script.scenes];
    newScenes[index].isLocked = false;
    return { script: { ...state.script, scenes: newScenes } };
  }),

  undo: () => set((state) => {
    if (state.undoStack.length === 0 || !state.script) return state;
    
    const previousScript = state.undoStack[state.undoStack.length - 1];
    const newUndoStack = state.undoStack.slice(0, -1);
    
    return {
      script: previousScript,
      undoStack: newUndoStack,
      redoStack: [...state.redoStack, state.script],
    };
  }),

  redo: () => set((state) => {
    if (state.redoStack.length === 0 || !state.script) return state;
    
    const nextScript = state.redoStack[state.redoStack.length - 1];
    const newRedoStack = state.redoStack.slice(0, -1);
    
    return {
      script: nextScript,
      redoStack: newRedoStack,
      undoStack: [...state.undoStack, state.script],
    };
  }),
}));
