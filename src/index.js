import express from 'express'
import { Server as WebSocketServer } from 'socket.io';
import http from 'http'
import { v4 as uuid } from 'uuid'

let notes = [];

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer)


io.on('connection', (socket) => {
    console.log("new connection:", socket.id);

    io.emit('server:loadNotes', notes);

    socket.on('client:newNote', (data) => {
        const newNote = { id: uuid(), ...data }
        notes.push(newNote);
        io.emit('server:newNote', newNote);
    })

    socket.on('client:deleteNote', (noteId) => {
        notes = notes.filter(note => note.id !== noteId);
        io.emit("server:loadNotes", notes);
    })

    socket.on('client:getNote', (noteId) => {
        let nota = notes.filter(note => note.id === noteId);
        socket.emit("server:getNote", nota[0]);
    })

    socket.on('client:updateNote', (updatedNote) => {
        notes = notes.map((note) => {
            if (note.id === updatedNote.id) {
                note.title = updatedNote.title;
                note.description = updatedNote.description;
            }
            return note;
        });
        io.emit("server:loadNotes", notes);
    })
})

app.use(express.static(__dirname + "/public"))

httpServer.listen(3000);


console.log("on port 3000")