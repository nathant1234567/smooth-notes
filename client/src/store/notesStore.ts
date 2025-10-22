import { create } from "zustand";
import axios from "axios";

// define a note
export interface Note {
    id: number
    title: string;
    content: string;
    created_at: string;
}

// define store state and actions
interface NotesState {
    notes: Note[];
    fetchNotes: () => Promise<void>;
    addNote: () => Promise<void>;
    updateNote: (id: number, content: string) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
}

// base url for backend api
const API_URL = "http://localhost:4000/api/notes";

// zustand store
export const useNotesStore = create<NotesState>((set) => ({
    notes: [],

    // load all notes from backend
    fetchNotes: async () => {
        const res = await axios.get(API_URL);
        set({ notes: res.data });
    },

    addNote: async () => {
        const res = await axios.post(API_URL, { title: "Untitled"});
        set((state) => ({ notes: [res.data, ...state.notes] }));
    },

    updateNote: async (id, content) => {
        const res = await axios.put(`${API_URL}/${id}`, { content });
        set((state ) => ({
            notes: state.notes.map((n) => (n.id === id ? res.data : n)),
        }));
    },

    deleteNote: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
    },
}));