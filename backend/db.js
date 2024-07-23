const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Tushar_12:Tushar1245@cluster0.ubekgnt.mongodb.net/FoodieMern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) {
      console.log("---", err);
    } else {
      console.log("Connected");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(function (err, data) {
        const foodCategory = mongoose.connection.db.collection("food_category");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) {
            console.log(err);
          } else {
            global.food_items = data;
            global.foodCategory = catData;
          }
        });
      });
    }
  });
};
module.exports = mongoDB;
