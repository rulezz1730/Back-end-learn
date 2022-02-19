const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
    addNote,
    getNotes,
    removeNote,
    editNote,
} = require("./notes.controller");
const yargs = require("yargs");
const pkg = require("./package.json");

const port = 3000;
yargs.version(pkg.version);

//3000 - порт - можно выбрать в принципе любле число
// const basePath = path.join(__dirname, "pages");
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", async (request, response) => {
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        editing: false,
    });
});

app.post("/", async (request, response) => {
    await addNote(request.body.title);
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true,
        editing: false,
    });
});

app.delete("/:id", async (request, response) => {
    await removeNote(request.params.id);
    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        editing: false,
    });
});

app.put("/:id", async (request, response) => {
    console.log(chalk.red(request.body.title));
    await editNote(request.params.id, request.body.title);

    response.render("index", {
        title: "Express App",
        notes: await getNotes(),
        // editing: true,
        created: false,
    });
});

if (process.argv.length === 2) {
    app.listen(port, () => {
        console.log(chalk.green(`Server has been started on port ${port}!`));
    });
}
