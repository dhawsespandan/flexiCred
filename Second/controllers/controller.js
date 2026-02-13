const UserModel = require('../model/user');

// CREATE
exports.create = async (req, res) => {
    if(!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone){
        return res.status(400).send(
            { message: "content cannot be empty!"}
        );
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message: "User created successfully!!",
            user: data
        });
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};

// GET ALL
exports.findAll = async (req,res)=>{
    try{
        const user = await UserModel.find();
        res.status(200).json(user);
    }catch (error){
        res.status(404).json({message: error.message});
    }
};

// GET ONE
exports.findOne = async (req,res)=>{
    try{
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};

// UPDATE
exports.update = async (req,res)=>{
    try{
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// DELETE
exports.delete = async (req,res)=>{
    try{
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message:"User deleted successfully" });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};