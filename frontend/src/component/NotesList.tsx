import React from 'react';
import type { Note } from '../types/Note';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
}) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No available notes
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      ))}
    </div>
  );
};