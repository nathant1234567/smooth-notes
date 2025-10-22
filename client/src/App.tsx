import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";

function App() {
    const [selectedId, setSelectedId] = useState<number>();

    return (
        <div className="flex h-screen">
            <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
            <NoteEditor noteId={selectedId} />
        </div>
    );
}

export default App;