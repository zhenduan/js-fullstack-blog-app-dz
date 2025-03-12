import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isLoading: false, // Global loading state
  startLoading: () => set({ isLoading: true }), // Start loading
  stopLoading: () => set({ isLoading: false }), // Stop loading
}));

export default useLoadingStore;
