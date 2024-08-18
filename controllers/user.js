const User=require("../models/user");

module.exports.postSignUp=async (req,res,next)=>{
    try{
        let {username, email,password}=req.body;
        const newUser= new User({
          email,username
        });
      
         let result=await User.register(newUser,password);
        //  console.log(result);
        req.login(result,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to wanderlust");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }

}

module.exports.postLogin=async (req,res,next)=>{
    req.flash("success","you have been logged in successfully");
    let redirectUrl1=res.locals.redirectUrl || "/listing"
    res.redirect(redirectUrl1);
}

module.exports.loguot=async (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logOut!");
        res.redirect("/listing");
    })
}

module.exports.Signup=async (req,res,next)=>{
    res.render("users/signup.ejs")};

module.exports.login=async (req,res,next)=>{
    res.render("users/login.ejs")
};