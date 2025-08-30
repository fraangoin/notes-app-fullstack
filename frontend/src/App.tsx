import { useEffect, useState } from 'react'
import api from './services/api'
import type { Note } from './types/Note';
import './App.css'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
      <div>
        <h1>Notes</h1>
        {notes.length === 0 ? (
          <p>No notes</p>
        ) : (
          <ul>
            {notes.map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>: {n.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
