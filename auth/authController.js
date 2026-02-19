// Simple in-memory auth (for production, use proper authentication)
const adminCredentials = {
  email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

// Simple token store (in production, use session/JWT)
const tokens = new Set();

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      const token = Math.random().toString(36).substring(2, 15);
      tokens.add(token);

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || !tokens.has(token)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      tokens.delete(token);
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
