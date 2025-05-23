import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,

    login: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token); 
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    restore: () => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token'); // ❗ no parse

        if (storedUser && storedUser !== "undefined" && storedToken && storedToken !== "undefined") {
            set({ user: JSON.parse(storedUser), token: storedToken });
        }
    },
}));
