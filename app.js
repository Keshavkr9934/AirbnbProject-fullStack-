if(process.env.NODE_ENV !="production"){

    require('dotenv').config();
// console.log(process.env.CLOUD_NAME);
}

const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
// const listing=require("./models/listing.js");
const Listing = require("./models/listing.js");
const methodOverride=require("method-override");
ejsmate = require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync.js");
const expressall = require("./utils/expressAll");
const {listingSchema,reviewSchema}=require("./schemaValidator.js");
// const {reviewSchema}=require("./schemaValidator.js");
const Review=require("./models/review");
// const listing=require("./routers/listing.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const localpasswrd=require("passport-local");
const User=require("./models/user.js");
const reviewRouter=require("./routers/review.js");
const UserRouter=require("./routers/users.js");
const listingRouter=require("./routers/listing.js");


const dbUrl=process.env.ATLASDB_URL;

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));



main().then((res)=>{
    console.log("mongoose are connect")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl);
}
app.listen(8080,()=>{
    console.log("i am port");
});

const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter : 24*3600,
});

store.on("error",()=>{
    console.log("Error in mongo session store",err);
});
let expresssession={
    store,
    secret:process.env.SECRET
    , resave:false,
     saveUninitialized:true,
     cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7*24*60*60*1000,
        httpOnly : true,
     },
    };
app.use(session(expresssession));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localpasswrd(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
 

app.use("/listing" ,listingRouter );
app.use("/listings" ,reviewRouter );
app.use("/",UserRouter);

app.all("*",(req,res,next)=>{
    next(new expressall(404,"page not found"));
});
app.use((err,req,res,next)=>{
    let {sourceCode=500, message="somthing went wrong"}=err;
    res.status(sourceCode).render("error.ejs",{err});
})

