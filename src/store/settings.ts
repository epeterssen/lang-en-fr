import { create } from 'zustand'

interface SettingsState {
  showBackground: boolean
  toggleBackground: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  showBackground: true,
  toggleBackground: () => set((s) => ({ showBackground: !s.showBackground })),
}))
