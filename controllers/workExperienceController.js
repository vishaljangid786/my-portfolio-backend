import WorkExperience from "../models/WorkExperience.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllWorkExperience = async (req, res) => {
  try {
    const experiences = await WorkExperience.find();
    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkExperienceById = async (req, res) => {
  try {
    const experience = await WorkExperience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createWorkExperience = async (req, res) => {
  try {
    const { title, descriptions, startDate, endDate } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    if (descriptions && descriptions.length > 4) {
      return res.status(400).json({
        success: false,
        message: "Maximum 4 descriptions allowed",
      });
    }

    const logoUrl = await uploadImage(req.file.buffer);

    const experience = new WorkExperience({
      logo: logoUrl,
      title,
      descriptions: descriptions || [],
      startDate,
      endDate,
    });

    await experience.save();

    res.status(201).json({
      success: true,
      message: "Work Experience created successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateWorkExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descriptions, startDate, endDate } = req.body;

    let experience = await WorkExperience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }

    if (descriptions && descriptions.length > 4) {
      return res.status(400).json({
        success: false,
        message: "Maximum 4 descriptions allowed",
      });
    }

    let logoUrl = experience.logo;
    if (req.file) {
      await deleteImage(experience.logo);
      logoUrl = await uploadImage(req.file.buffer);
    }

    experience = await WorkExperience.findByIdAndUpdate(
      id,
      {
        logo: logoUrl,
        title,
        descriptions: descriptions || experience.descriptions,
        startDate,
        endDate,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Work Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWorkExperience = async (req, res) => {
  try {
    const experience = await WorkExperience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }

    await deleteImage(experience.logo);
    await WorkExperience.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Work Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
