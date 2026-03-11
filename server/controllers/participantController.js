const participantModel = require("../models/participantModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const getAllParticipants = async (req, res) => {
  try {
    const participants = await participantModel.getAllParticipants();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REGISTER a new participant
/*const registerUser = async (req, res) => {
  const { full_name, university, password, team_id, email,
          ic_number, gender, study_year, study_course, nationality, verification_link, resume_link } = req.body;

  if (!full_name || !university || !password || !email ||
    !ic_number || !gender || !study_year || !study_course || !nationality || !verification_link || !resume_link) {
    return res.status(400).json({
      error: "Full name, university, password, and email are required",
    });
  }

  try {
    const genderBool = gender === "true";

    // Convert study_year to integer
    const studyYearInt = parseInt(study_year, 10);

    // Validate the email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the email already exists in the database
    const { data: existingUser, error: emailCheckError } =
      await participantModel.getParticipantByEmail(email);

    if (emailCheckError) {
      return res.status(500).json({ error: "Error checking email" });
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const participantTeamId = team_id || null;

    // Insert participant into the database with role = 'user'
    const participantData = await participantModel.insertParticipant({
      full_name,
      university,
      email,
      team_id: participantTeamId,
      password_hash: hashedPassword,
      role: "user", // Default role,
      ic_number,
      gender: genderBool,
      study_year: studyYearInt,
      study_course,
      nationality,
      verification_link: verification_link,
      resume_link: resume_link
    });

    // Check if there was an error with the insertion
    if (participantData.error) {
      return res.status(400).json({ error: participantData.error });
    }

    // Generate JWT token
    const payload = {
      participant_id: participantData.participant_id,
      full_name: participantData.full_name,
      email: participantData.email,
      role: participantData.role,
      team_id: participantData.team_id,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    // Send the JWT token as a response
    return res.status(201).json({
      message: "Registration successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};*/

//Set password for the first time (For invited users)
const setPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("1. Request received for email:", email);
  const cleanEmail = email ? email.trim() : null;

  if (!cleanEmail || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required" });
  }

  try {
    // 1. Check if the participant exists and is NOT yet verified
    const result = await participantModel.getParticipantByEmail(cleanEmail, true);

    if (!result.data) {
      return res.status(404).json({ error: "Participant not found or not approved." });
    }

    const user = result.data;

    if (user.is_verified) {
      return res.status(400).json({ error: "Password has already been set for this account." });
    }

    // 2. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 3. Update the participant in the database
    const { data: updatedUser, updateError } = await participantModel.updateParticipant(user.participant_id, {
      password_hash: hashedPassword,
      is_verified: true
    });

    if (updateError) throw updateError;

    return res.status(200).json({ message: "Password set successfully! You can now log in." });
  } catch (err) {
    console.error("Set Password Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN an existing participant
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = email ? email.trim() : null;

  // Check if both email and password are provided
  if (!cleanEmail || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data: participantData, error } =
      await participantModel.getParticipantByEmail(cleanEmail, true);

    if (error || !participantData) {
      return res.status(404).json({ error: "Team not found" });
    }

    // NEW LOGIC: Check if they need to set a password first
    if (!participantData.is_verified) {
        return res.status(403).json({ 
            error: "Account not verified.", 
            mustSetPassword: true,
            message: "Please set your password first." 
        });
    }

    // Check password using password_hash
    const isMatch = await bcrypt.compare(
      password,
      participantData.password_hash
    );

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT tokens after successful login
    const accessToken = jwt.sign(
      {
        participant_id: participantData.participant_id,
        full_name: participantData.full_name,
        email: participantData.email,
        role: participantData.role,
        team_id: participantData.team_id,
        is_leader: participantData.is_leader,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      {
        participant_id: participantData.participant_id,
        full_name: participantData.full_name,
        email: participantData.email,
        role: participantData.role,
        team_id: participantData.team_id,
        is_leader: participantData.is_leader,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Respond with the tokens and a success message
    return res.status(200).json({
      message: "Login successful", // Correct message for login
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login Error:", err); // Log the full error object
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getParticipantById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: participant, error } =
      await participantModel.getParticipantById(id);

    if (error) {
      return res.status(404).json({ error: "Participant not found" });
    }

    return res.status(200).json(participant);
  } catch (err) {
    console.error("Error fetching participant:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// participantController.js

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET_KEY);
    
    // Get latest participant info from database to ensure token has up-to-date data
    const { data: participant, error } = await participantModel.getParticipantById(
      decoded.participant_id
    );
    
    if (error || !participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    
    // Generate a new access token with fresh data from database
    const accessToken = jwt.sign(
      {
        participant_id: participant.participant_id,
        full_name: participant.full_name,
        email: participant.email,
        role: participant.role,
        team_id: participant.team_id,
        is_leader: participant.is_leader
      },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    
    // Return the new access token
    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken
    });
  } catch (err) {
    console.error("Token refresh error:", err);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

module.exports = {
  getAllParticipants,
  loginUser,
  getParticipantById,
  refreshAccessToken,
  setPassword,
};
