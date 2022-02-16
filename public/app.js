document.addEventListener("click", (event) => {
    const id = event.target.dataset.id;

    if (event.target.dataset.type === "remove") {
        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }
    if (event.target.dataset.type === "edit") {
        const noteTitle = event.target.closest("li").innerText.split("\n");
        const newTitle = prompt(
            "Изменить заголовок заметки?",
            `${noteTitle[0]}`
        );
        if (
            noteTitle !== newTitle &&
            newTitle !== null &&
            newTitle.length !== 0
        ) {
            edit(id, { title: newTitle }).then(() => {
                event.target.closest("li").firstChild.textContent = newTitle;
            });
        } else if (newTitle.length === 0) {
            alert(`Заметка не может быть пустой`);
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}

async function edit(id, body) {
    console.log(id, body);
    await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
    });
}
console.log("Hello from app.js");
