import { create } from 'zustand'

interface SettingsState {
  showBackground: boolean
  toggleBackground: () => void
  allowCopyPaste: boolean
  toggleCopyPaste: () => void
  rolodex: boolean
  toggleRolodex: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  showBackground: true,
  toggleBackground: () => set((s) => ({ showBackground: !s.showBackground })),
  allowCopyPaste: false,
  toggleCopyPaste: () => set((s) => ({ allowCopyPaste: !s.allowCopyPaste })),
  rolodex: true,
  toggleRolodex: () => set((s) => ({ rolodex: !s.rolodex })),
}))
