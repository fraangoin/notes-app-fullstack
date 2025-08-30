import { useEffect, useState } from 'react'
import api, { notesApi } from './services/api'
import type { CreateNoteDto, Note, UpdateNoteDto } from './types/Note';
import './App.css'
import { CreateNoteForm } from './component/CreateNoteForm';
import { NotesList } from './component/NotesList';

type ViewType = 'active' | 'archived';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('active');

  // Load notes when the component mounts
  useEffect(() => {
    loadNotes();
  }, [currentView]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      let fetchedNotes: Note[];
      
      if (currentView === 'active') {
        const response = await notesApi.getUnarchivedNotes();
        fetchedNotes = response.data;
      } else {
        const response = await notesApi.getArchivedNotes();
        fetchedNotes = response.data;
      }
      
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error loading notes', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData: CreateNoteDto) => {
    try {
      const response = await notesApi.createNote(noteData);
      const newNote = response.data;
      if (currentView === 'active') {
        setNotes(prev => [newNote, ...prev]);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      throw error;
    }
  };

  const handleUpdateNote = async (updateData: UpdateNoteDto) => {
    if (!editingNote) return;
    console.log('DEBUG: Updating note with data:', updateData);    
    try {
      const response = await notesApi.updateNote(editingNote.id, updateData);
      console.log('DEBUG: response:', response);   
      const updatedNote = response.data;
      setNotes(prev => prev.map(note => 
        note.id === editingNote.id ? updatedNote : note
      ));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    try {
      await notesApi.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  };

  const handleArchiveNote = async (id: number) => {
    try {
      await notesApi.archiveNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error archiving note:', error);
      throw error;
    }
  };

  const handleUnarchiveNote = async (id: number) => {
    try {
      await notesApi.unarchiveNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error unarchiving note:', error);
      throw error;
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  const handleSubmitForm = async (noteData: CreateNoteDto | UpdateNoteDto) => {
    if (editingNote) {
      await handleUpdateNote(noteData as UpdateNoteDto);
    } else {
      await handleCreateNote(noteData as CreateNoteDto);
    }
  };

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
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setCurrentView('active')}
              className={`px-2 py-1 rounded ${currentView === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setCurrentView('archived')} 
              className={`px-2 py-1 rounded ${currentView === 'archived' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Archived
            </button>
          </div>
          <NotesList 
            notes={notes} 
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onArchive={handleArchiveNote}
            onUnarchive={handleUnarchiveNote}
          />
          <CreateNoteForm 
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmitForm}
            editingNote={editingNote}
          />
        </div>
      </div>
    </>
  )
}

export default App
