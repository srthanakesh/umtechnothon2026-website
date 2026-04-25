/**
 * Bulk Registration Email Sender
 *
 * Usage:
 * cd server && node scripts/sendMagicLinks.js
 *
 * This script:
 * 1. Fetches all unverified participants from Supabase
 * 2. Sends each one a password setup link
 * 3. Logs success/failure for each email
 *
 * Required .env variables:
 * SUPABASE_URL
 * SUPABASE_ANON_KEY
 * EMAIL_USER
 * EMAIL_PASS
 * FRONTEND_URL
 */

require("dotenv").config({ path: "../.env" });
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://www.umtechnothon.com";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// ─────────────────────────────────────────────────────────────
// Email Transporter
// ─────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// ─────────────────────────────────────────────────────────────
// Email Template
// ─────────────────────────────────────────────────────────────
function buildEmailHTML(participantName, passwordSetupLink) {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; overflow: hidden;">
      
      <div style="background: linear-gradient(135deg, #4c5ab6, #2dcefb); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
          UM Technothon 2026
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">
          Welcome to the competition!
        </p>
      </div>

      <div style="padding: 30px; color: #e2e8f0;">
        
        <p style="font-size: 16px; margin-top: 0;">
          Hi <strong>${participantName}</strong>,
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          You have been <strong>successfully registered</strong> for 
          <strong>UM Technothon 2026</strong> 🎉
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          To access the competition platform, please set your password by clicking the button below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${passwordSetupLink}"
             style="
                background: linear-gradient(135deg, #4c5ab6, #2dcefb);
                color: #ffffff;
                text-decoration: none;
                padding: 14px 40px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                display: inline-block;
             ">
            Set Your Password
          </a>
        </div>

        <p style="font-size: 14px; color: #f8fafc; line-height: 1.6;">
          Please remember your password and keep it secure, as you will need it for future logins.
        </p>

        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
          If the button doesn't work, copy and paste this link into your browser:
          <br/>
          <a href="${passwordSetupLink}" style="color: #2dcefb; word-break: break-all;">
            ${passwordSetupLink}
          </a>
        </p>

        <hr style="border: none; border-top: 1px solid #1e293b; margin: 25px 0;" />

        <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">
          © 2026 UM Technothon. All rights reserved.
        </p>
      </div>
    </div>
    `;
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Bulk Registration Email Sender\n");

  // Validate env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
    process.exit(1);
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
    process.exit(1);
  }

  // Show sender email
  console.log(`📨 Sending emails FROM: ${EMAIL_USER}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);

  // Show active filter
  console.log("\n🔎 Active Supabase filter:");
  console.log("   is_verified = false");
  console.log("   email IS NOT NULL");

  // Fetch participants
  console.log("\n📋 Fetching participants...");

  const { data: participants, error } = await supabase
    .from("participants")
    .select("participant_id, full_name, email")
    .eq("is_verified", false)
    .eq("is_leader", true)
    .not("email", "is", null);

  if (error) {
    console.error("❌ Supabase error:", error.message);
    process.exit(1);
  }

  if (!participants || participants.length === 0) {
    console.log("✅ No eligible participants found.");
    process.exit(0);
  }

  // Remove duplicate emails
  const uniqueParticipants = [];
  const seenEmails = new Set();

  for (const participant of participants) {
    if (!seenEmails.has(participant.email)) {
      seenEmails.add(participant.email);
      uniqueParticipants.push(participant);
    }
  }

  console.log(
    `📧 Found ${uniqueParticipants.length} participant(s) to email\n`
  );

  // Verify Gmail connection
  try {
    await transporter.verify();
    console.log("✅ Gmail connection verified\n");
  } catch (err) {
    console.error("❌ Gmail authentication failed:", err.message);
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  // Send emails
  for (const participant of uniqueParticipants) {
    // NOTE:
    // This is only a setup link, not a secure magic link token.
    const passwordSetupLink =
      `${FRONTEND_URL}/set-password?email=` +
      encodeURIComponent(participant.email);

    const mailOptions = {
      from: `"UM Technothon 2026" <${EMAIL_USER}>`,
      to: participant.email,
      subject: "🚀 UM Technothon 2026 — Set Your Password",
      html: buildEmailHTML(
        participant.full_name || "Participant",
        passwordSetupLink
      ),
    };

    try {
      await transporter.sendMail(mailOptions);

      successCount++;
      console.log(
        `✅ [${successCount}] Sent to: ${participant.email}`
      );
    } catch (err) {
      failCount++;
      console.error(
        `❌ Failed: ${participant.email} — ${err.message}`
      );
    }

    // Delay to reduce Gmail rate-limit issues
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // Summary
  console.log("\n────────────────────────────────────");
  console.log(`📊 Total: ${uniqueParticipants.length}`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📨 Sender: ${EMAIL_USER}`);
  console.log("────────────────────────────────────");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
