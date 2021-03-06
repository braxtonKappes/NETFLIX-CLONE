const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const profilesRouter = require("./profiles.js")
const channelsRouter = require("./channels.js")

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/profiles", profilesRouter)
router.use("/channels", channelsRouter)

module.exports = router;
