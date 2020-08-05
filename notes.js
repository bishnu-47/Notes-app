const fs= require('fs');
const chalk=require('chalk');

// ADD function
const addNote= (title , body) =>{
    const notes=loadNotes();
    const duplicateNote=notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.inverse.green('Note added'));
    }else{
        console.log(chalk.inverse.red('Title already taken'));
    }
}

// REMOVE function
const removeNote = (title) =>{
    const attr="title";
    const notes=loadNotes();
    const notesToKeep=notes.filter((note) => note.title !== title);
    if(notesToKeep.length === notes.length){
        console.log(chalk.inverse.red('Note not found!'));
    }
    else{
        console.log(chalk.inverse.green('Note Removed'));
        saveNotes(notesToKeep);
    }
}

// LIST function
const listNotes= () =>{
  const notes=loadNotes();
  console.log(chalk.inverse.cyan('Your Notes'));
  notes.forEach((note) => {
      console.log(chalk.bold.bgMagenta(note.title));
  });
}

// READ/SHOW function
const showNote= (title) =>{
    const notes=loadNotes();
    const note=notes.find((foundNote)=> foundNote.title === title);
    if(note){
        console.log(chalk.bgBlue.bold(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.inverse.red('Note not found!'));
    }
}

const saveNotes= (notes) =>{
    const dataJson=JSON.stringify(notes);
    fs.writeFileSync('./notes.json', dataJson);
}

const loadNotes = ()=>{
    try{
        const dataBuffer=fs.readFileSync('./notes.json');
        const dataJson=dataBuffer.toString();
        return (JSON.parse(dataJson));
    }catch(e){
        return [];
    }
}

module.exports = {
  listNotes:listNotes,
  addNote:addNote,
  removeNote:removeNote,
  showNote:showNote
}
