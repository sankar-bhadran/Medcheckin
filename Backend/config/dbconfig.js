import mongoose from "mongoose";

const connect = () => {
    mongoose
      .connect(process.env.MONGODB)
      .then(() => {
        console.log("Connected to Database");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
export default connect