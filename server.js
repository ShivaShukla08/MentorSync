// Importing libraries
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./ApiGateway/app");
const DB = process.env.DATABASE_URL;

const StudentDetail = require('./models/StudentDetailModel'); 
const TeacherDetail = require('./models/TeacherDetailModel');   
const RequestTable  = require('./models/RequestTableGroupAndStudentModel'); 
const UserDetail = require('./models/UserModel'); 

// .............................Code of connection with Database............................................

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

//.............................Code of starting the server...................................................

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
