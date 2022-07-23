const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/user");
const sequelize = require("../src/config/database");

beforeAll(() => {
    return sequelize.sync();
});

beforeEach(() => {
    return User.destroy({truncate: true});
});

describe("User registration", () => {
    const postValidUser = () => {
        return request(app).post("/api/1.0/users").send({
            username: "user1",
            email: "user1@mail.com",
            password: "Passw0rd"
        });
    };

    it("returns 200 OK when sign-up request is valid", async () => {
        const response = await postValidUser();
        expect(response.status).toBe(200);
    });
    
    it("returns success message when sign-up request is valid", async () => {
        const response = await postValidUser();
        expect(response.body.message).toBe("User created.");
        });

    it("saves the user to the database", async () => {
        await postValidUser();
        const userList = await User.findAll();
        expect(userList.length).toBe(1);
    });

    it("saves the user's username and e-mail to the database", async () => {
        await postValidUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.username).toBe("user1");
        expect(savedUser.email).toBe("user1@mail.com");
    });

    it("hashes the user's password in the database", async () => {
        await postValidUser();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.password).not.toBe("Passw0rd");
    });
});