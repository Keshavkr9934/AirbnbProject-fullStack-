const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressall = require("../utils/expressAll");
const {listingSchema,reviewSchema}=require("../schemaValidator.js");
const Listing = require("../models/listing.js");
const Review=require("../models/review");
const {isvallid,isReviewAuthor}=require("../middleware.js");
const createReview=require("../controllers/review.js");



const reviewValidator=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    // console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressall(400, errMsg);
    }else{
        next();
    }
}




//post review
router.post("/:id/review",isvallid,reviewValidator,wrapAsync(createReview.createReview));
  //delete rout
  router.delete("/:id/review/:reviewId",isReviewAuthor,isvallid,wrapAsync(createReview.deleteReview));

  module.exports=router;