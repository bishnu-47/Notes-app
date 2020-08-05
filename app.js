const notes=require('./notes.js');
const yargs = require('yargs');
const chalk = require('chalk');

// const command=process.argv[2];
// console.log(process.argv);

// creating add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder : {
    title :{
        describe : "Note Title",
        demandOption: true,
        type: "string"
    },
    body:{
        describe:"Note Body",
        demandOption: true,
        type:"string"
    }
  },
    handler(argv){
        notes.addNote(argv.title , argv.body);
  }
}).argv;

// creating remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder:{
        title:{
            describe:"Note Title",
            demandOption: true,
            type : "string"
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
  }
}).argv;

// creating list command
yargs.command({
    command: "list",
    describe: "list all notes",
    handler(){
        notes.listNotes();
  }
}).argv;

// creating read command
yargs.command({
  command: "read",
  describe: "Show a note",
  builder:{
    title:{
        describe: "Note Title",
        demandOption: true,
        type: "string"
    }
  },
  handler(argv){
    notes.showNote(argv.title);
  }
}).argv;

yargs.parse();
// console.log(yargs.argv);
