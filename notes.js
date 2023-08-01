import fs from 'fs';
import chalk from 'chalk';

export const getNotes = () => {
  return 'Your notes....';
}

export const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title)
  if (!duplicateNote) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken'));
  }
}

export const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);
  if (notesToKeep.length !== notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('No note found!!!'));
  }
}

export const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.yellow.bold.inverse('Your notes'))
  notes.forEach(note => {
    console.log(chalk.blue(note.title));
  });
}

export const readNote = title => {
  const notes = loadNotes();
  const noteFound = notes.find(note => note.title === title);
  if (noteFound) {
    console.log(chalk.yellow.bold(noteFound.title));
    console.log(noteFound.body)
  } else {
    console.log(chalk.red.inverse('No note found!!!'));
  }
}
  

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
  
}