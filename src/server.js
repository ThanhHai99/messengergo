import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

//Init app
const app = express();

// //Connect to MongoDB
ConnectDB();

// //Config view Engine
// configViewEngine(app);

app.get("/test", async (req, res) => {
  try {
    let item = {
      userId: "id1",
      contactId: "033771800",
    };
    let contact = await ContactModel.createNew(item);
    res.send(contact);
  } catch (err) {
    console.log(err);
  }
  res.render("main/master");
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>
  console.log(`App running at ${process.env.APP_HOST}:${process.env.APP_PORT}`)
);
