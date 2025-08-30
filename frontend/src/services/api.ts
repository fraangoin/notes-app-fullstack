import axios from 'axios';
import type { Note, CreateNoteDto, UpdateNoteDto } from '../types/Note';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const notesApi = {
    // Create a new note
    createNote: (data: CreateNoteDto) => api.post<Note>('/notes', data),

    // Get all notes
    getNotes: () => api.get<Note[]>('/notes'),

    // Get a single note by ID
    getNoteById: (id: number) => api.get<Note>(`/notes/${id}`),

    // Update a note by ID
    updateNote: (id: number, data: UpdateNoteDto) => api.patch<Note>(`/notes/${id}`, data),

    // Delete a note by ID
    deleteNote: (id: number) => api.delete<void>(`/notes/${id}`),

    // Archive a note by ID
    archiveNote: (id: number) => api.patch<Note>(`/notes/${id}/archive`),

    // Unarchive a note by ID
    unarchiveNote: (id: number) => api.patch<Note>(`/notes/${id}/unarchive`),

    // Get all archived notes
    getArchivedNotes: () => api.get<Note[]>('/notes/archived'),

    // Get all unarchived notes
    getUnarchivedNotes: () => api.get<Note[]>('/notes/active'),

};

export default api;