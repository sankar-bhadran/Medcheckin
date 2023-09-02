import User from "../model/User.js";
import Category from "../model/categoryModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import centerdetails from "../model/centerdetails.js";

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  let admin;
  console.log(email, password);
  try {
    admin = await User.findOne({ email: email });
    console.log("hai");
    console.log(admin);
    if (!admin.is_admin === 1) {
      return res.status(400).json({ message: "User not found Signup please" });
    }
    const hashedpassword = bcrypt.compareSync(password, admin.password);
    if (!hashedpassword) {
      return res.status(400).json({ message: "Invalid email and password" });
    }
    console.log("bye");

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const expirationTime = new Date(Date.now() + 1000 * 60 * 60);
    res.cookie("AdminToken", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: expirationTime,
    });

    return res
      .status(200)
      .json({ message: "Successfully LoggedIn", token, admin });
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = async (req, res) => {
  const { TestName, subCategory } = req.body;
  console.log(req.body);
  console.log(TestName);
  console.log(subCategory);
  // let categoryData;
  try {
    const categoryData = await Category.findOne({ Testname: TestName });
    // if (categoryData) {
    //   return res.status(400).json({ message: "Category already Exists" });
    // }
    const category = new Category({
      Testname: TestName,
      sub: { name: subCategory },
    });
    await category.save();
    console.log("category", category);
    return res.status(200).json({ message: "Category Added", category });
  } catch (error) {
    console.log(error.message);
  }
};

export const viewCategory = async (req, res) => {
  try {
    const categoryData = await Category.find();
    return res.status(200).json({ message: "Successfull", categoryData });
  } catch (error) {
    console.log(error.message);
  }
};

export const getSub = async (req, res) => {
  const { categoryid } = req.params;
  console.log("categoryId", categoryid);
  try {
    const categoryData = await Category.findById({ _id: categoryid });
    return res.status(200).json({ message: "Successfull", categoryData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const userList = async (req, res) => {
  console.log("sdkfjsdkfnksdflksdf");
  try {
    const userData = await User.find({ userType: "user" });
    return res.status(200).json({ message: "Successful", userData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const userAccess = async (req, res) => {
  const { userData } = req.body;
  console.log("req.body", req.body);
  try {
    const user = await User.findById(userData);
    const access = await User.updateOne(
      { _id: userData },
      { $set: { is_blocked: !user.is_blocked } }
    );
    if (!access) {
      return res
        .status(404)
        .json({ message: "User not found or something went wrong!" });
    }
    return res.status(200).json({ message: " updated successfully." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const ownerList = async (req, res) => {
  console.log("djdfbjsdb");
  try {
    const ownersData = await User.find({ userType: "recruiter" });
    return res.status(200).json({ message: "Successful", ownersData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching data" });
  }
};

export const ownerAccess = async (req, res) => {
  const { ownerData } = req.body;
  console.log("req.body", req.body);
  try {
    const owner = await User.findById(ownerData);
    console.log(owner);
    const access = await User.updateOne(
      { _id: ownerData },
      { $set: { is_blocked: !owner.is_blocked } }
    );
    if (!access) {
      return res
        .status(404)
        .json({ message: "User not found or something went wrong!" });
    }
    return res.status(200).json({ message: " updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getCenterDetails = async (req, res) => {
  const { centerid } = req.params;
  console.log("centerid", centerid);
  try {
    const centerDetails = await centerdetails
      .findById(centerid)
      .populate("owner");
    // console.log("centerDetails", centerDetails);
    if (!centerDetails) {
      return res.status(404).json({ message: "Center not found" });
    }
    return res
      .status(200)
      .json({ centerDetails, message: "Data fetched successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const availableCategory = async (req, res) => {
  const { isAvailable } = req.body;
  console.log(req.body);
  console.log("categoryId", isAvailable);
  let categoryId = isAvailable;
  try {
    const category = await Category.findById(categoryId);
    if (category.is_available) {
      await Category.findByIdAndUpdate(
        { _id: categoryId },
        { $set: { is_available: 0 } }
      );
    } else {
      await Category.findByIdAndUpdate(
        { _id: categoryId },
        { $set: { is_available: 1 } }
      );
    }
    return res
      .status(200)
      .json({ message: "Successfully updated availability" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const approval = async (req, res) => {
  const { data } = req.body;
  console.log("req.body", req.body);
  try {
    const centerdetail = await centerdetails.findById({ _id: data });
    if (!centerdetail) {
      return res.status(404).json({ message: "Center not found" });
    }

    centerdetail.isVerified = true;
    await centerdetail.save();
    return res
      .status(200)
      .json({ message: "Approved successfully", centerdetail });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  console.log("logout");
  res.clearCookie("AdminToken");
  return res.status(200).json({ message: "Succefully Logged out" });
};
