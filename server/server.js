import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 9999;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/server/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("dist"));

app.listen(
    PORT,
    console.log(
        `\n\n\n===============================\nServer Listening on: http://localhost:${PORT}`
    )
);
