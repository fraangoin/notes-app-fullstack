export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}