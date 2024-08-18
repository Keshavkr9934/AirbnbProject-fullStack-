const Listing = require("./models/listing.js");
const review = require("./models/review.js");
module.exports.isvallid=(req,res,next)=>{
    if(!req.isAuthenticated()){
        // console.log(req);
        // console.log(req.path,req.oroginalUrl);
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged In to create listing");
        res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listings= await Listing.findById(id);
    if(! listings.owner.equals(res.locals.currUser._id)){
       req.flash("error","you don't have any permission to changes");
       res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    // console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressall(400, errMsg);
    }else{
        next();
    }
}
module.exports.isReviewAuthor=async (req,res,next)=>{
    let { id,reviewId}=req.params;
    let reviews= await review.findById(reviewId);
    if(! reviews.Author.equals(res.locals.currUser._id)){
       req.flash("error","you are not the permission of delete of this review");
       res.redirect(`/listing/${id}`);
    }
    next();
}