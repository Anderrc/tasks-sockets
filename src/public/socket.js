const socket = io();
/**
 * save a new note
 * @param {string} title note title
 * @param {string} description  note description
 */
const saveNote = (title, description) => {
    if(noteId === ''){
        socket.emit('client:newNote', {
            title,
            description
        })
    }else{
        socket.emit('client:updateNote', {
            title,
            description,
            id: noteId
        })
        noteId = '';
    }
};

const deleteNote = (id) => {
    socket.emit('client:deleteNote', id);
}

const getNote = (id) => {
    socket.emit('client:getNote', id);
}

socket.on('server:newNote', (data) => {
    appendNote(data);
})

socket.on('server:getNote', (data) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    title.value = data.title;
    description.value = data.description;
    noteId = data.id;
})


socket.on('server:loadNotes', (note) => {
    renderNotes(note);
})