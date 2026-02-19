import Projects from "../models/Projects.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, githublink, livelink, skills } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (skills && skills.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum 3 skills allowed",
      });
    }

    const imageUrl = await uploadImage(req.file.buffer);

    const project = new Projects({
      image: imageUrl,
      title,
      description,
      githublink,
      livelink,
      skills: skills || [],
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, githublink, livelink, skills } = req.body;

    let project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (skills && skills.length > 3) {
      return res.status(400).json({
        success: false,
        message: "Maximum 3 skills allowed",
      });
    }

    let imageUrl = project.image;
    if (req.file) {
      await deleteImage(project.image);
      imageUrl = await uploadImage(req.file.buffer);
    }

    project = await Projects.findByIdAndUpdate(
      id,
      {
        image: imageUrl,
        title,
        description,
        githublink,
        livelink,
        skills: skills || project.skills,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await deleteImage(project.image);
    await Projects.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
