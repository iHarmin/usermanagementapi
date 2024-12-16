const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
  } = require("./user.service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database Connection Errror!"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },

    login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password!"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "Login Successfully!",
            token: jsontoken,
            user: {
                id: results.id,
                firstName: results.firstName,
                lastName: results.lastName,
            },
          });
        } else {
          return res.json({
            success: 0,
            data: "Invalid email or password!"
          });
        }
      });
    },

    getUserByUserId: (req, res) => {
      const id = req.params.id;
      getUserByUserId(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found!"
          });
        }
        results.password = undefined;
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
    },

    updateUsers: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          message: "Updated Successfully!"
        });
      });
    },
    deleteUser: (req, res) => {
        const userId = req.params.id;
      
        deleteUser({ id: userId }, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              message: "An error occurred while deleting the user!",
            });
          }
      
          if (!results || results.affectedRows === 0) {
            return res.status(404).json({
              success: 0,
              message: "User not Found!",
            });
          }
      
          return res.json({
            success: 1,
            message: "User Deleted Successfully!",
          });
        });
      }      
  };
  