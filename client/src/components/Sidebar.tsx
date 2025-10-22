import { useNotesStore } from "../store/notesStore.ts";
import {useEffect} from "react";

export default function Sidebar({
    selectedId,
    onSelect,
                                }: {
    selectedId?: number;
    onSelect: (id: number) => void;
                                }) {
    const { notes, fetchNotes, addNote, deleteNote } = useNotesStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className="w-64 border-r border-gray-200 p-3 bg-gray-50 flex flex-col">
            <button
                className="mb-3 bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => addNote()}
            >
                + New Note
            </button>

            <ul className="space-y-1 overflow-y-auto flex-1">
                {notes.map((note) => (
                    <li
                        key={note.id}
                        onClick={() => onSelect(note.id)}
                        className={`p-2 rounded cursor-pointer ${
                            selectedId === note.id ? "bg-blue-100" : "hover:bg-gray-100"
                        }`}
                    >
                        <div className="flex justify-between">
                            <span className="truncate">{note.title}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}