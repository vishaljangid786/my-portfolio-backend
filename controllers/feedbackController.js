import Feedback from "../models/Feedback.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }
    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const { rating, feedback, handle } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const imageUrl = await uploadImage(req.file.buffer);

    const newFeedback = new Feedback({
      rating,
      feedback,
      image: imageUrl,
      handle,
    });

    await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback, handle } = req.body;

    let feedbackData = await Feedback.findById(id);
    if (!feedbackData) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    let imageUrl = feedbackData.image;
    if (req.file) {
      await deleteImage(feedbackData.image);
      imageUrl = await uploadImage(req.file.buffer);
    }

    feedbackData = await Feedback.findByIdAndUpdate(
      id,
      { rating, feedback, image: imageUrl, handle },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully",
      data: feedbackData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    await deleteImage(feedback.image);
    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
