import ExperienceOverview from "../models/ExperienceOverview.js";

export const getAllExperienceOverview = async (req, res) => {
  try {
    const overview = await ExperienceOverview.find();
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

export const getExperienceOverviewById = async (req, res) => {
  try {
    const overview = await ExperienceOverview.findById(req.params.id);
    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Experience Overview not found",
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

export const createExperienceOverview = async (req, res) => {
  try {
    const { yearOfExperience, SatisfiedClient, completedProjects, ClientRetentionRate } = req.body;

    const overview = new ExperienceOverview({
      yearOfExperience,
      SatisfiedClient,
      completedProjects,
      ClientRetentionRate,
    });

    await overview.save();

    res.status(201).json({
      success: true,
      message: "Experience Overview created successfully",
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateExperienceOverview = async (req, res) => {
  try {
    const { id } = req.params;
    const { yearOfExperience, SatisfiedClient, completedProjects, ClientRetentionRate } = req.body;

    const overview = await ExperienceOverview.findByIdAndUpdate(
      id,
      { yearOfExperience, SatisfiedClient, completedProjects, ClientRetentionRate },
      { new: true, runValidators: true }
    );

    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Experience Overview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience Overview updated successfully",
      data: overview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteExperienceOverview = async (req, res) => {
  try {
    const overview = await ExperienceOverview.findByIdAndDelete(req.params.id);
    if (!overview) {
      return res.status(404).json({
        success: false,
        message: "Experience Overview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience Overview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
