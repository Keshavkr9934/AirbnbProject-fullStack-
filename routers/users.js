const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const listngs=require("./listing.js")
const {saveRedirectUrl}=require("../middleware.js")
const userControllers=require("../controllers/user.js");

router.route("/signup")
.get(userControllers.Signup )

.post( wrapAsync(userControllers.postSignUp));

router.route("/login")
.get(userControllers.login)
.post(saveRedirectUrl ,passport.authenticate
        
('local', { failureRedirect: '/login',failureFlash:true }), userControllers.postLogin);


    router.get("/logout", userControllers.loguot);


module.exports=router;