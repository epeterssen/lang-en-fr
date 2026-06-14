import { create } from 'zustand'

interface SettingsState {
  showBackground: boolean
  toggleBackground: () => void
  allowCopyPaste: boolean
  toggleCopyPaste: () => void
  rolodex: boolean
  toggleRolodex: () => void
  currentPageContext: string
  setCurrentPageContext: (ctx: string) => void
  currentPageTitle: string
  setCurrentPageTitle: (title: string) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  showBackground: true,
  toggleBackground: () => set((s) => ({ showBackground: !s.showBackground })),
  allowCopyPaste: false,
  toggleCopyPaste: () => set((s) => ({ allowCopyPaste: !s.allowCopyPaste })),
  rolodex: false,
  toggleRolodex: () => set((s) => ({ rolodex: !s.rolodex })),
  currentPageContext: '',
  setCurrentPageContext: (ctx) => set({ currentPageContext: ctx }),
  currentPageTitle: '',
  setCurrentPageTitle: (title) => set({ currentPageTitle: title }),
}))
