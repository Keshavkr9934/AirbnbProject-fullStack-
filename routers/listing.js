const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressall = require("../utils/expressAll");
const {listingSchema,reviewSchema}=require("../schemaValidator.js");
const Listing = require("../models/listing.js");
const {isvallid,isOwner}=require("../middleware.js");

const ListingController=require("../controllers/listing.js");
const multer  = require('multer');
const {cloudinary ,storage }=require("../cloudinary.js");
const upload = multer({ storage});



const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new expressall(400, errMsg);
    }else{
        next();
    }
}

//index rout
router.
route("/")
.get
(wrapAsync(ListingController.index)
)
.post
(isvallid,upload.single('url'),validateListing ,wrapAsync(ListingController.postNewRout)
);
//Create listings
router.get("/new",isvallid,wrapAsync(ListingController.newRout)
);

router.
route("/:id")
//show rout
.get(wrapAsync(ListingController.showRout))
//update rout
.put(isvallid ,upload.single('url'),validateListing,wrapAsync(ListingController.updateRout))
//delete rout
.delete(wrapAsync(ListingController.deleteRout));


//show rou
//edit rout
router.get("/:id/edit",isvallid,isOwner,wrapAsync(ListingController.editRout)
);

module.exports=router;