import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilio from "twilio";
const accountSid = "AC6ffd98d07b09c3795988fca455810836";
const authToken = "0080e3727949bf8433fbfc34bd8322e6";
const servicessid = "VA6a2a14ec6072a70983306c795d3c2737";
const client = twilio(accountSid, authToken);

export const sendotp = async (req, res) => {
  const { phonenumber, email } = req.body;
  let user;
  try {
    user = await User.findOne({
      $or: [{ email: email }, { phonenumber: phonenumber }],
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist!Login instead" });
    } else {
      const otpResponse = "1234";
      // const otpResponse = await client.verify.v2
      //   .services(servicessid)
      //   .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
      res.status(200).send(`OTP successful: ${JSON.stringify(otpResponse)}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password, phonenumber } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      email,
      phonenumber,
      password: hashedpassword,
    });

    await user.save();
    return res.status(200).json({ message: user });
  } catch (error) {
    next(error);
  }
};

export const verifyotp = async (req, res, next) => {
  const { otp, phonenumber } = req.body;

  try {
    const verifiedResponse = {};
    verifiedResponse.status = otp === "1234" ? "approved" : "";

    // const verifiedResponse = await client.verify.v2
    //   .services(servicessid)
    //   .verificationChecks.create({
    //     to: `+91${phonenumber}`,
    //     code: otp,
    //   });
    if (verifiedResponse.status === "approved") {
      next();
    } else {
      res.status(400).json({ message: "OTP verification failed." });
    }
  } catch (error) {
    return res
      .status(error?.status || 400)
      .send(error?.message || "Something went wrong.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email });
    console.log(existinguser);

    if (!existinguser) {
      return res.status(400).json({ message: "User not found Signup please" });
    }
    const haspassword = bcrypt.compareSync(password, existinguser.password);
    if (!haspassword) {
      return res.status(400).json({ message: "Invalid email and password" });
    }

    const token = jwt.sign(
      { _id: existinguser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30s" }
    );
    res.cookie("Token", token, { httpOnly: true, samesite: "lax" });

    return res
      .status(200)
      .json({ message: "Successfully Logged In", token, existinguser });
  } catch (error) {
    next(error);
  }
};
