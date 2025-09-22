const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing = async(req,res)=>{
    let { id } = req.params;
     const listing = await Listing.findById(id)
     .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
     })
     .populate("owner");

     if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
     }
     console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req,res,next)=>{
     let response = await geocodingClient
     .forwardGeocode({ // take input in form of words n give o/p in form of  latatude n longitude.
        query: req.body.listing.location,
        limit: 1,
    })
  .send();
  
 
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"...",filename);
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!!");
    res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
  const query = req.query.q || "";
  let listings = [];

  if (query) {
    listings = await Listing.find({
      location: { $regex: query, $options: "i" }  // case-insensitive match
    });
  } else {
    listings = await Listing.find({});
  }

  //  If user searched something but no matches
  if (query && listings.length === 0) {
    req.flash("error", `No listings found for "${query}"`);
    return res.redirect("/listings"); 
  }

  res.render("listings/index.ejs", {
    allListings: listings,   //  matches your EJS
    query,   // pass back to EJS so it stays in the box
    page: "listings",
    currUser: req.user
  });
};


module.exports.renderEditForm = async(req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested does not exist!");
        res.redirect("/listings");
     }
    let originalImageUrl = listing.image.url;
    let transformedUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");

    res.render("listings/edit.ejs",{ listing });

};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listingData = req.body.listing;

    // first update normal listing data
    let listing = await Listing.findByIdAndUpdate(id, listingData, { new: true });

    // check if new image is uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async(req,res)=>{
    let{ id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing Deleted!");
    res.redirect("/listings");
};

