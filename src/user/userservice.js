const User = require("./user");
const bcrypt = require("bcrypt");

const save = async (body) => {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = { ...body, password: hashedPassword };
    await User.create(user);
};

module.exports = { save };