import chalk from 'chalk';
import { truncate } from 'fs';
import yargs  from 'yargs';
import { hideBin } from "yargs/helpers"
import { getNotes, addNote, removeNote, listNotes, readNote } from "./notes.js"

const yarg =yargs(hideBin(process.argv))
  .command({
    command: 'add',
    desc: 'Add a new note',
    builder: yargs => (
      yargs.options({
        'title': {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
        },
        'body': {
          describe: 'Note body',
          demandOption: true,
          type: 'string'
        }
      })
    ),
    handler: (argv) => {
      addNote(argv.title, argv.body);
    },
  })
  .command({
    command: 'remove',
    desc: 'Remove a note',
    builder: yargs => (
      yargs.options({
        'title': {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
        }
      })
    ),
    handler: (argv) => {
      removeNote(argv.title);
    }
  })
  .command({
    command: 'list',
    desc: 'List your notes',
    handler: (argv) => {
      listNotes();
    }
  })
  .command({
    command: 'read',
    desc: 'Read a note',
    builder: yargs => (
      yargs.options({
        'title': {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
        }
      })
    ),
    handler: (argv) => {
      readNote(argv.title);
    }
  })
  .strict()
  .help('h')
  .argv