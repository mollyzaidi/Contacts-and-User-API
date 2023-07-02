const asyncHandler = require("express-async-handler"); 
const Contact = require("../../models/contactsmodel");
//@ desc Get all contacts
//@route GET /api/contacts
//@access private

const getcontact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts) 
});

//@ desc create new contacts
//@route POST /api/contacts
//@access private    

const postcontact = asyncHandler(async(req,res)=>{
    console.log("The request body is: ",req.body);
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please fill all the fields.")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id,
    });
    res.status(201).json(contact)
});

//@ desc create new contacts by id
//@route GET /api/contacts/:id
//@access private

const getcontactby = asyncHandler(async(req,res)=>{
    const contact  = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    res.status(200).json(contact)
});

//@ desc Update contacts by id
//@route PUT /api/contacts/:id
//@access private

const putcontact = asyncHandler(async(req,res)=>{
    const contact  = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    };

    if(contact.user_id.toString()!= req.user.id){
        res.status(403)
        throw new Error("User don't have rights")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    );
    res.status(200).json(updatedcontact)
});


//@ desc delete contacts by id
//@route DELETE /api/contacts/:id
//@access private

const deletecontact = asyncHandler(async(req,res)=>{
    const contact  = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    };
    if(contact.user_id.toString()!= req.user.id){
        res.status(403)
        throw new Error("User don't have rights")
    }
    await Contact.deleteOne({_id:req.params.id});  
    res.status(200).json(contact)
});

module.exports = {
    getcontact,
    postcontact,
    getcontactby,
    putcontact,
    deletecontact}