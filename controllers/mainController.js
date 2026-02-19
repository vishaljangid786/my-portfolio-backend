import Main from "../models/Main.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllMain = async (req, res) => {
  try {
    const mainData = await Main.find();
    res.status(200).json({
      success: true,
      data: mainData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMainById = async (req, res) => {
  try {
    const mainData = await Main.findById(req.params.id);
    if (!mainData) {
      return res.status(404).json({
        success: false,
        message: "Main data not found",
      });
    }
    res.status(200).json({
      success: true,
      data: mainData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createMain = async (req, res) => {
  try {
    const {
      certificateDesc,
      feedbackDesc,
      projectDesc,
      skillsDesc,
      experienceDesc,
      overviewDesc,
      subtitle,
      title,
      highlightedWords,
      threeLines,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Logo image is required",
      });
    }

    const logoUrl = await uploadImage(req.file.buffer);

    // Parse JSON strings if they come as strings
    let highlightedWordsArray = highlightedWords;
    let threeLinesArray = threeLines;
    
    if (typeof highlightedWords === 'string') {
      highlightedWordsArray = JSON.parse(highlightedWords);
    }
    
    if (typeof threeLines === 'string') {
      threeLinesArray = JSON.parse(threeLines);
    }

    // Validate threeLines has exactly 3 items
    if (!Array.isArray(threeLinesArray) || threeLinesArray.length !== 3) {
      return res.status(400).json({
        success: false,
        message: "threeLines must contain exactly 3 strings",
      });
    }

    const mainData = new Main({
      certificateDesc,
      feedbackDesc,
      projectDesc,
      skillsDesc,
      experienceDesc,
      overviewDesc,
      homeDesc: {
        subtitle,
        title,
        highlightedWords: highlightedWordsArray,
        logo: logoUrl,
        threeLines: threeLinesArray,
      },
    });

    await mainData.save();

    res.status(201).json({
      success: true,
      message: "Main data created successfully",
      data: mainData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMain = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      certificateDesc,
      feedbackDesc,
      projectDesc,
      skillsDesc,
      experienceDesc,
      overviewDesc,
      subtitle,
      title,
      highlightedWords,
      threeLines,
    } = req.body;

    let mainData = await Main.findById(id);
    if (!mainData) {
      return res.status(404).json({
        success: false,
        message: "Main data not found",
      });
    }

    let logoUrl = mainData.homeDesc.logo;
    if (req.file) {
      await deleteImage(mainData.homeDesc.logo);
      logoUrl = await uploadImage(req.file.buffer);
    }

    // Parse JSON strings if they come as strings
    let highlightedWordsArray = highlightedWords;
    let threeLinesArray = threeLines;
    
    if (highlightedWords !== undefined) {
      if (typeof highlightedWords === 'string') {
        highlightedWordsArray = JSON.parse(highlightedWords);
      }
    } else {
      highlightedWordsArray = mainData.homeDesc.highlightedWords;
    }
    
    if (threeLines !== undefined) {
      if (typeof threeLines === 'string') {
        threeLinesArray = JSON.parse(threeLines);
      }
      // Validate threeLines has exactly 3 items
      if (!Array.isArray(threeLinesArray) || threeLinesArray.length !== 3) {
        return res.status(400).json({
          success: false,
          message: "threeLines must contain exactly 3 strings",
        });
      }
    } else {
      threeLinesArray = mainData.homeDesc.threeLines;
    }

    const updateData = {
      certificateDesc: certificateDesc !== undefined ? certificateDesc : mainData.certificateDesc,
      feedbackDesc: feedbackDesc !== undefined ? feedbackDesc : mainData.feedbackDesc,
      projectDesc: projectDesc !== undefined ? projectDesc : mainData.projectDesc,
      skillsDesc: skillsDesc !== undefined ? skillsDesc : mainData.skillsDesc,
      experienceDesc: experienceDesc !== undefined ? experienceDesc : mainData.experienceDesc,
      overviewDesc: overviewDesc !== undefined ? overviewDesc : mainData.overviewDesc,
      homeDesc: {
        subtitle: subtitle !== undefined ? subtitle : mainData.homeDesc.subtitle,
        title: title !== undefined ? title : mainData.homeDesc.title,
        highlightedWords: highlightedWordsArray,
        logo: logoUrl,
        threeLines: threeLinesArray,
      },
    };

    mainData = await Main.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Main data updated successfully",
      data: mainData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMain = async (req, res) => {
  try {
    const mainData = await Main.findById(req.params.id);
    if (!mainData) {
      return res.status(404).json({
        success: false,
        message: "Main data not found",
      });
    }

    await deleteImage(mainData.homeDesc.logo);
    await Main.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Main data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
