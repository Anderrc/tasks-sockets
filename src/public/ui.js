const notesList = document.querySelector("#notes");

var noteId = '';

const noteUi = (note) => {

    const div = document.createElement('div');

    div.innerHTML = `
        <div class="card card-body rounded-0 mb-2">
            <div class="d-flex justify-content-between">
                <h1 class="h3 card-title">${note.title}</h1>       
                <div class="">
                    <button class="btn btn-danger danger" data-id="${note.id}">Delete</button>
                    <button class="btn btn-primary update" data-id="${note.id}">Update</button>
                </div>
            </div>
            <p>${note.description}</p>
        </div>

    `;
    const btnDelete = div.querySelector(".danger");
    const btnUpdate = div.querySelector(".update");

    btnDelete.addEventListener('click', ()=>{
        console.log(btnDelete.dataset.id);
        deleteNote(btnDelete.dataset.id);
    })

    btnUpdate.addEventListener('click', ()=>{
        getNote(btnUpdate.dataset.id);
    })

    return div;
}

const renderNotes = (notes) => {
    notesList.innerHTML ="";
    notes.forEach(note => {
        notesList.append(noteUi(note));
    });
}

const appendNote = (note) => {
    notesList.append(noteUi(note));
}