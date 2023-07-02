const express = require("express");
const router = express.Router();
const {getcontact,
    postcontact,
    getcontactby,
    putcontact,
    deletecontact
} = require("./controllers/mycontactcontroller");
const validateToken = require("./controllers/middleware/validatetoken");


router.use(validateToken)
router.route("/").get(getcontact).post(postcontact); 

router.route("/:id").get(getcontactby).put(putcontact).delete(deletecontact);

module.exports = router; 
