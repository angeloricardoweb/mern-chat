import { create } from 'zustand';

type State = {
  username: string | null;
  id: string | null;
  setUsername: (username: string) => void;
  setId: (id: string) => void;
};

const userStore = create<State>((set) => ({
  username: null,
  id: null,
  setUsername: (username: string) => set(() => ({ username })),
  setId: (id: string) => set(() => ({ id })),
}));

export default userStore;
