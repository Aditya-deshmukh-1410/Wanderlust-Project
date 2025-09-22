const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename:String,
    url:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
   { 
    type: Schema.Types.ObjectId,
    ref: "Review",
   }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
 }
});


// this runs when the main post(listing) is deleted n all realated data  to that listing i.e reviews is also deleted hence it shows the relationship behaviour!!
listingSchema.post("findOneAndDelete" , async (listing)=>{
  if(listing) {
    await Review.deleteMany( { _id: {$in: listing.reviews} });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;