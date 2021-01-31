//Importing Joi Validator Package
const JoiValidator= require('joi');

//Custom Validator function for Register Route
const ProfileValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            _id:JoiValidator.string().required(),
            name:JoiValidator.string().min(4).max(255).required(),
            dob:JoiValidator.date().required(),
            bio:JoiValidator.string().min(20).max(500).required(),
            gender:JoiValidator.string().required(),
            interestedIn:JoiValidator.string().required(),
            jobTitle:JoiValidator.string(),
            company:JoiValidator.string(),
            school:JoiValidator.string(),
            verified:JoiValidator.boolean(),
            nickName:JoiValidator.string(),
            displayPicture:JoiValidator.string(),
            interests:JoiValidator.array(),
            portfolio:JoiValidator.array(),
            notifToken:JoiValidator.string(),
            deviceId:JoiValidator.string().required(),
            phone:JoiValidator.string(),
            email:JoiValidator.string(),
            district:JoiValidator.string().required(),
            state:JoiValidator.string().required(),
            latitude:JoiValidator.string().required(),
            longitude:JoiValidator.string().required(),
            authMethod:JoiValidator.string().required(),
            country:JoiValidator.string().required()

        }
    )
    return validatorSchema.validate(data)
}

//Exporting Validator Modules for access in other files
module.exports.ProfileValidator=ProfileValidator;
