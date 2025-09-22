if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}

console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter= require("./routes/user.js");


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    })

    async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("Error in Mongo Session Store", err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


// app.get("/",(req,res)=>{
//     res.send("its working!!")
// });




app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize()); // middleware that initialize password
app.use(passport.session());   // for session that identify if user browse from page to page
passport.use(new LocalStrategy(User.authenticate()));// static authenticate method of model

passport.serializeUser(User.serializeUser()); //tells Passport how to store the user ID in the session.
passport.deserializeUser(User.deserializeUser());// tells Passport how to get the user from the ID when a request comes in.


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async(req,res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "Delta-student"
//     });

//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });


app.use("/listings", listingRouter); // routes-> listing.js
app.use("/listings/:id/reviews", reviewRouter); //routes-> review.js
app.use("/", userRouter)

app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found!!"))
}); // for all unknown routes

app.use((err,req,res,next)=>{
    let {statusCode=500, message="something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
})

app.listen(8080,()=>{
    console.log("listening to port: 8080");
});
