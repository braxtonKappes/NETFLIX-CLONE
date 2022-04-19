const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const profilesRouter = require("./profiles.js")

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/profiles", profilesRouter)

module.exports = router;
