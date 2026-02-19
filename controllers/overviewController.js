import Overview from "../models/Overview.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllOverviews = async (req, res) => {
  try {
    const overviews = await Overview.find();
    res.status(200).json({
      success: true,
      data: overviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOverviewById = async (req, res) => {
  try {
    const overview = await Overview.findById(req.params.id);
    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Overview not found",
      });
    }
    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createOverview = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    const logoUrl = await uploadImage(req.file.buffer);

    const overview = new Overview({
      logo: logoUrl,
      name,
    });

    await overview.save();

    res.status(201).json({
      success: true,
      message: "Overview created successfully",
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOverview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let overview = await Overview.findById(id);
    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Overview not found",
      });
    }

    let logoUrl = overview.logo;
    if (req.file) {
      await deleteImage(overview.logo);
      logoUrl = await uploadImage(req.file.buffer);
    }

    overview = await Overview.findByIdAndUpdate(
      id,
      { logo: logoUrl, name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Overview updated successfully",
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOverview = async (req, res) => {
  try {
    const overview = await Overview.findById(req.params.id);
    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Overview not found",
      });
    }

    await deleteImage(overview.logo);
    await Overview.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Overview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
