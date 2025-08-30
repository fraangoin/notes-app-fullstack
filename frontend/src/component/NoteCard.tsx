import type { Note } from '../types/Note';
import { PencilIcon, TrashIcon, ArchiveBoxIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
}) => {

  return (
    <div className={`border p-4 rounded ${note.isArchived ? 'bg-gray-50 border-gray-300' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            <PencilIcon className="w-5 h-5"/>
          </button>
          
          {note.isArchived ? (
            <button
              onClick={() => onUnarchive(note.id)}
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            >
              <ArchiveBoxArrowDownIcon className="w-5 h-5"/>
            </button>
          ) : (
            <button
              onClick={() => onArchive(note.id)}
              className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
            >
              <ArchiveBoxIcon className="w-5 h-5"/>
            </button>
          )}
          
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <TrashIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>
      <div className="text-gray-700 mb-4 text-justify">
          {note.content}
      </div>      
      <div className="pt-3 border-t border-gray-200">
        {note.isArchived && (
            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                Archived
            </span>
            )}
      </div>
    </div>
  );
};
