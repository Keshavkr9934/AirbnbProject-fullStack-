const Joi = require('joi');

// Define the listing schema
const listingSchema = Joi.object({
    title: Joi.string().required().max(50),
    description: Joi.string().required().max(230),
        filename: Joi.string().optional(),
        url: Joi.string().allow(" ", null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
});

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});

module.exports = {listingSchema,reviewSchema};
// module.exports={reviewSchema};

// console.log("this is for listing : ",listingSchema);
// console.log("this is for review : ",reviewSchema);







// const joi =require("joi");

// module.exports=joi.object({
//     title: joi.string().required().max(30),
//     description: joi.string().required().max(230),
//     image:{
//         filename: joi.string().allow(" "),
//         url:joi.string().allow(" ",null),
//     },
//     price: joi.number().required().min(0),
//     location: joi.string().required(),
//     country: joi.string().required(),
// });


// module.exports=reviewSchema=joi.object({
//   review: joi.object({
//     rating:joi.number().required(),
//    comment:joi.string().required(),
//   }).required(),
// })