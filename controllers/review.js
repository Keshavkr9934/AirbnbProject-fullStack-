const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async (req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
  
    let newreviews=new Review(req.body.review);
    newreviews.Author=req.user._id;
    listing.review.push(newreviews);
     await newreviews.save();
     await listing.save();
  
    //  console.log("new review save");
     req.flash("success","New Review Created");
     res.redirect(`/listing/${listing._id}`);
  }

  module.exports.deleteReview=async (req,res,next)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {review : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listing/${id}`);
};