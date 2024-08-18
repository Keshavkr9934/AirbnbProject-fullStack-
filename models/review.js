const mongoose=require("mongoose");
const schema=mongoose.Schema;


const reviewSchema=new schema({
    comment:String,
    rating:{
        type:Number,
       min:1,
       max:5,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    Author:{
        type:schema.Types.ObjectId,
        ref:"User"
      },
});

module.exports=mongoose.model("Review",reviewSchema);