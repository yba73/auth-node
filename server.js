const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.set("strictQuery", false);

// mongoose.connect("mongodb://localhost:27017/gbs",{useNewUrlParser: true,  useUnifiedTopology: true },function checkDb(error)

// {
//     if(error)
//     {
//         console.log("Error Connecting to DB");
//     }
//     else
//     {
//         console.log("successfully Connected to DB");
//     }
// });

mongoose
  .connect("mongodb://localhost:27017/auth-node")
  .then(() => {
    console.log("database connection established ");
  })
  .catch((error) => {
    console.log("Error Connecting to DB");
    console.log(error);
  });
app.use("", require("./routes/user.routes"));

app.listen(9002, function check(error) {
  if (error) console.log("Error....!!!!");
  else console.log("Started....!!!!");
});
