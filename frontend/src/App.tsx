import { useEffect, useState } from 'react'
import api from './services/api'
import type { Note } from './types/Note';
import './App.css'
import { NoteCard } from './component/NoteCard';
import { CreateNoteForm } from './component/CreateNoteForm';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
      const fetchNotes = async () => {
        try {
          const res = await api.get<Note[]>("/notes");
          setNotes(res.data);
        } catch (err: any) {
          console.log(err.message);
        }
      };

      fetchNotes();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Notes</h1>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              New Note
            </button>
          </div>
          {notes.length === 0 ? (
            <p>No notes</p>
          ) : (
            <ul>
              {notes.map((n) => (
                <li key={n.id}>
                  <NoteCard note={n} onEdit={() => {}} onDelete={() => {}} onArchive={() => {}} onUnarchive={() => {}} />
                </li>
              ))}
            </ul>
          )}
          <CreateNoteForm
            isOpen={isFormOpen}
            onClose={() => {}}
            onSubmit={async () => {}}
            editingNote={null}
          />
        </div>
      </div>
    </>
  )
}

export default App
