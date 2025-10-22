import { useNotesStore } from "../store/notesStore";

export default function NoteEditor({ noteId }: { noteId?: number }) {
    const { notes, updateNote } = useNotesStore();
    const note = notes.find((n) => n.id === noteId);

    if (!note)
        return <div className="flex-1 p-4 text-gray-500">Select or create a note</div>;

    return (
        <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <textarea
                className="w-full h-[80vh] border rounded p-2"
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
            />
        </div>
    );
}