import Certificate from "../models/Certificates.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }
    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const { title, issuedBy } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImage(req.file.buffer);

    const certificate = new Certificate({
      image: imageUrl,
      title,
      issuedBy,
    });

    await certificate.save();

    res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, issuedBy } = req.body;

    let certificate = await Certificate.findById(id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    let imageUrl = certificate.image;
    if (req.file) {
      await deleteImage(certificate.image);
      imageUrl = await uploadImage(req.file.buffer);
    }

    certificate = await Certificate.findByIdAndUpdate(
      id,
      { image: imageUrl, title, issuedBy },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Certificate updated successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    await deleteImage(certificate.image);
    await Certificate.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
