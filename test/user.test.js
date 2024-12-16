const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;
chai.use(chaiHttp);

// User Registration
describe("POST /api/users - User Registration", () => {
    it("should create a new user with valid details", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          gender: "Male",
          email: "john.doe@example.com",
          password: "password123",
          number: "9999999999",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 1);
          expect(res.body.data).to.be.an("object");
          done();
        });
    });
  
    it("should return an error if required fields are missing", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          first_name: "John",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Required fields are missing");
          done();
        });
    });
  
    it("should return an error for invalid email format", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          first_name: "John",
          last_name: "Doe",
          gender: "Male",
          email: "invalidemail",
          password: "password123",
          number: "9999999999",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Invalid email format");
          done();
        });
    });
  });

// User Login
describe("POST /api/users/login - User Login", () => {
    it("should log in successfully with valid credentials", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          email: "john.doe@example.com",
          password: "password123",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 1);
          expect(res.body).to.have.property("token");
          done();
        });
    });
  
    it("should return an error for invalid email", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          email: "invalid@example.com",
          password: "password123",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("data", "Invalid email or password!");
          done();
        });
    });
  
    it("should return an error for invalid password", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          email: "john.doe@example.com",
          password: "wrongpassword",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("data", "Invalid email or password!");
          done();
        });
    });
  
    it("should handle login attempts with empty email or password", (done) => {
      chai
        .request(app)
        .post("/api/users/login")
        .send({
          email: "",
          password: "",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Email and password are required");
          done();
        });
    });
  });

// Get User
describe("GET /api/users/:id - Get User by ID", () => {
    it("should retrieve a user by valid ID", (done) => {
      chai
        .request(app)
        .get("/api/users/1")
        .set("Authorization", `Bearer ${token}`) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 1);
          expect(res.body.data).to.have.property("id", 1);
          done();
        });
    });
  
    it("should return 404 for non-existent user ID", (done) => {
      chai
        .request(app)
        .get("/api/users/99999")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Record not Found!");
          done();
        });
    });
  
    it("should return an error for invalid ID format", (done) => {
      chai
        .request(app)
        .get("/api/users/abc")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Invalid user ID");
          done();
        });
    });
  
    it("should return an error for unauthenticated request", (done) => {
      chai
        .request(app)
        .get("/api/users/1")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Access Denied! Unauthorized User!");
          done();
        });
    });
  });

// Update User
describe("PATCH /api/users - Update User", () => {
    it("should successfully update user details", (done) => {
      chai
        .request(app)
        .patch("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: userId,
          first_name: "UpdatedFirstName",
          last_name: "UpdatedLastName",
          gender: "Male",
          email: "updated.email@example.com",
          password: "newpassword123",
          number: "1234567890",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 1);
          expect(res.body.message).to.equal("Updated Successfully!");
          done();
        });
    });
  
    it("should return an error when the user ID is missing", (done) => {
      chai
        .request(app)
        .patch("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "UpdatedFirstName",
          last_name: "UpdatedLastName",
          gender: "Male",
          email: "updated.email@example.com",
          password: "newpassword123",
          number: "1234567890",
        }) 
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "User ID is required");
          done();
        });
    });
  
    it("should return an error for a non-existent user ID", (done) => {
      chai
        .request(app)
        .patch("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 99999,
          first_name: "UpdatedFirstName",
          last_name: "UpdatedLastName",
          gender: "Male",
          email: "updated.email@example.com",
          password: "newpassword123",
          number: "1234567890",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "User not Found!");
          done();
        });
    });
  
    it("should return an error for invalid email format", (done) => {
      chai
        .request(app)
        .patch("/api/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: userId,
          first_name: "UpdatedFirstName",
          last_name: "UpdatedLastName",
          gender: "Male",
          email: "invalidemail",
          password: "newpassword123",
          number: "1234567890",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Invalid email format");
          done();
        });
    });
  });  

// Delete User
describe("DELETE /api/users/:id - Delete User", () => {
    it("should delete a user by valid ID", (done) => {
      chai
        .request(app)
        .delete("/api/users/1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("success", 1);
          expect(res.body.message).to.equal("User Deleted Successfully!");
          done();
        });
    });
  
    it("should return 404 for deleting a non-existent user", (done) => {
      chai
        .request(app)
        .delete("/api/users/99999")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "User not Found!");
          done();
        });
    });
  
    it("should return an error for invalid ID format", (done) => {
      chai
        .request(app)
        .delete("/api/users/abc")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Invalid user ID");
          done();
        });
    });
  
    it("should return an error for unauthenticated delete request", (done) => {
      chai
        .request(app)
        .delete("/api/users/1")
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property("success", 0);
          expect(res.body).to.have.property("message", "Access Denied! Unauthorized User!");
          done();
        });
    });
  });