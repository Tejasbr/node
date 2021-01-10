let express = require("express");
const router = express.Router();

const { register, getreq, getreqById, patchdata, deletedata, login } = require("../controllers/user");

const { verifyToken } = require("../middleware/auth");

const userRoute = (expressApi) => {
    router.post("/", register);
    router.post("/login", login);
    router.get("/", getreq);
    router.get("/:id", getreqById);
    router.patch("/", verifyToken, patchdata);
    router.delete("/", verifyToken, deletedata);
    expressApi.use('/api/user', router);
}

module.exports = userRoute