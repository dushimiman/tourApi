import { check,validationResult } from "express-validator";

class Validator{

static validateInput =(req,res,next)=>{

    const errors =validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage= errors.errors.map((err) => err.msg);
        return res.status(400).json({message: errorMessage})
    }
    return next();
};
static newAccountRules(){
    return[
        check("email","email is invalid").isEmail(),
        check("password","password is not strong").isStrongPassword(),
        check("lastName","LastName should be valid").trim().isAlpha(),
        check("firstName","FirstName should be valid").trim().isAlpha(),
        check("gender","Gender should be valid among male,female,other,not-say")
        .trim().isIn(["male","female","other","not-say"]),

    ];
}

}
export default Validator;