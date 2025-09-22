const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({
    ...obj,
    owner: new mongoose.Types.ObjectId("68b986ad2de0d3a30514c14b"),
     // username  👉 "Delta-student"
     // email 👉 "student@gmail.com"
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();