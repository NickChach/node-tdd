const express = require("express");
const router = express.Router();
const UserServive = require("./userservice");

router.post("/api/1.0/users", async (request, response) => {
    await UserServive.save(request.body);
    return response.send({message: "User created."});
});

module.exports = router;