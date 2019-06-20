const express = require("express"); //why is this red?
const morgan = require("morgan");
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
const userRouter = require("./routes/user");
const wikiRouter = require("./routes/wiki");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public")); //what does static do?

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 1337;

app.get("/", (req, res) => {
  res.redirect("/wiki"); //.com/wiki
  // res.send(layout(""));
});

app.use("/wiki", wikiRouter);

app.use("/user", userRouter);

const init = async () => {
  await db.sync({ force: false });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
