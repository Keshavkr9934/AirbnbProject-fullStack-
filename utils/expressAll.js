class expressall extends Error{
    constructor(sourceCode,message){
        super();
        this.sourceCode=sourceCode;
        this.message=message;
    }
}
module.exports=expressall;