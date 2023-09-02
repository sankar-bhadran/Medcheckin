import centerdetails from "../model/centerdetails.js";
import Category from "../model/categoryModel.js";

export const registerScan = async (req, res) => {
  try {
    const { image1, image2, image3, NABH, NABL, ISO } = req.files;
    const { ...data } = req.body;
    const register = new centerdetails({
      ...data,
      owner: req.user,
      isSubmitted: "true",
      CenterImages: [
        image1[0].filename,
        image2[0].filename,
        image3[0].filename,
      ],
      CertificateImages: [
        { NABH: NABH[0].filename },
        { NABL: NABL[0].filename },
        { ISO: ISO[0].filename },
      ],
    });
    await register.save();
    return res
      .status(200)
      .json({ register, message: "Registeration successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getIsSubmitte = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const center = await centerdetails.findOne({ owner: id }).populate("owner");
    console.log("sis", center);
    const dataToSend = {
      isSubmitted: center.isSubmitted,
      isVerified: center.isVerified,
    };
    return res.status(200).json({
      dataToSend,
      message: "data fetched successfull..!",
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getCenters = async (req, res) => {
  try {
    const centers = await centerdetails.find().populate("owner");
    return res
      .status(200)
      .json({ centers, message: "data fetched successfull..!" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

export const getScanCategories = async (req, res) => {
  try {
    const scanCategories = await Category.find();
    return res
      .status(200)
      .json({ scanCategories, message: "data fetched successfull..!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
