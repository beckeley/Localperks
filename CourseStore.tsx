import { create } from 'zustand'

export interface UserStore{
    username: string;
    email: string;
    setUsername: (username: string) => void
    email: (email: string) => void
    
}
export const useUserStore = create(
    (set) => ({
        username:"",
        email: "",
        setUsername: () => set(() => ({ username })),
        setEmail: () => set(() => ({email})),
    })
)
