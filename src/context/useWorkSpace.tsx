import { IWorkspaceStore } from '@/types/workspaces'
import { create } from 'zustand'

const initialState: IWorkspaceStore = {
	workspaces: [],
	setWorkSpaces: () => {},
}

export const useWorkSpaceStore = create<IWorkspaceStore>((set) => ({
	...initialState,
	setWorkSpaces: (value) => set((state) => ({ ...state, workspaces: value })),
}))
