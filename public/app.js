document.addEventListener("click", (event) => {
    const id = event.target.dataset.id;

    if (event.target.dataset.type === "remove") {
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }

    if (event.target.dataset.type === "edit") {
        let note = event.target.closest("li");
        let noteContent = event.target
            .closest("li")
            .firstChild.textContent.trim();
        console.log(noteContent, noteContent.length);

        note.innerHTML = `<input type="text" name="title">
                       <div class="editing-buttons-box">
                            <button class="btn btn-success" data-type="saveEditNote">Сохранить</button>
                            <button class="btn btn-danger" data-type="cancel">Отменить</button>
                        </div>`;

        let input = note.querySelector("input");
        input.value = noteContent;
        const editingBoxButtons = note.querySelectorAll("button");
        editingBoxButtons.forEach((button) =>
            button.addEventListener("click", (event) => {
                let newNoteContent = note.querySelector("input").value;
                if (
                    event.target.dataset.type === "saveEditNote" ||
                    event.target.dataset.type === "cancel"
                ) {
                    if (event.target.dataset.type === "saveEditNote") {
                        edit(id, { title: newNoteContent });
                    }
                    note.innerHTML = `
                            ${newNoteContent}
                            <div class="item-buttons">
                                <button class="btn btn-primary" data-type="edit" data-id="<%= notes[i].id%>">
                                    Редактировать
                                </button>
                                <button class="btn btn-danger" data-type="remove" data-id="<%= notes[i].id%>">
                                    &times;
                                </button>
                            </div> `;
                }
            })
        );
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}

async function edit(id, body) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
    }).catch((err) => console.error(err));
}
console.log("Hello from app.js");
