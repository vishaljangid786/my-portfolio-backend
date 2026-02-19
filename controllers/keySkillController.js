import KeySkill from "../models/KeySkill.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllKeySkills = async (req, res) => {
  try {
    const skills = await KeySkill.find();
    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getKeySkillById = async (req, res) => {
  try {
    const skill = await KeySkill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Key Skill not found",
      });
    }
    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createKeySkill = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    const logoUrl = await uploadImage(req.file.buffer);

    const skill = new KeySkill({
      logo: logoUrl,
      name,
    });

    await skill.save();

    res.status(201).json({
      success: true,
      message: "Key Skill created successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateKeySkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let skill = await KeySkill.findById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Key Skill not found",
      });
    }

    let logoUrl = skill.logo;
    if (req.file) {
      await deleteImage(skill.logo);
      logoUrl = await uploadImage(req.file.buffer);
    }

    skill = await KeySkill.findByIdAndUpdate(
      id,
      { logo: logoUrl, name },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Key Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteKeySkill = async (req, res) => {
  try {
    const skill = await KeySkill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Key Skill not found",
      });
    }

    await deleteImage(skill.logo);
    await KeySkill.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Key Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
