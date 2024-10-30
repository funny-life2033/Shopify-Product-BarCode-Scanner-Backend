const User = require("../models/users");
const roles = require("../config/role");
const Product = require("../models/products");

const getUsers = async (_, res) => {
  try {
    let users = await User.find({});
    let products = await Product.find({});

    users = users.map((user) => {
      let productsCount = 0;
      let i = 0;
      while (true) {
        if (i === products.length) break;
        if (products[i].uploadedBy && products[i].uploadedBy.equals(user._id)) {
          productsCount++;
          products.splice(i, 1);
        } else {
          i++;
        }
      }

      return {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        products: productsCount,
      };
    });

    res.json({ message: "Success!", users });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

const changeRoleOfUser = async (req, res) => {
  const newRole = req.body.role;
  console.log("changing request: ", req.body);
  try {
    let user = await User.findById(req.body.id);
    if (user && user.role !== roles.admin) {
      user.set({ role: newRole });
      await user.save();
      res.json({ message: "Successfully changed!" });
    } else {
      if (!user) res.status(404).json({ message: "There is not such a user." });
      else if (user.role === roles.admin)
        res.status(404).json({ message: "You can't change admin's role" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "There is not such a user." });
    }

    if (user.role === roles.admin)
      return res.status(404).json({ message: "You can't remove admin" });

    await user.deleteOne();
    res.json({ message: "Successfully removed!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsers, changeRoleOfUser, removeUser };
