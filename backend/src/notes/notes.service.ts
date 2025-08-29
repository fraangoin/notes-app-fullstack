import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}
  
  create(createNoteDto: CreateNoteDto) {
    const note = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(note);
  }

  findAll() {
    return this.notesRepository.find();
  }

  findOne(id: number) {
    return this.notesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.notesRepository.update(id, updateNoteDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.notesRepository.delete(id);
  }
}
