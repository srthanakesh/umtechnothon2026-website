/**
 * Bulk Magic Link Email Sender
 * 
 * Usage: cd server && node scripts/sendMagicLinks.js
 * 
 * This script:
 * 1. Fetches all unverified participants from Supabase
 * 2. Sends each one an email with a magic link to set their password
 * 3. Logs success/failure for each email
 * 
 * Required .env variables (in project root or server/.env):
 *   SUPABASE_URL, SUPABASE_ANON_KEY
 *   EMAIL_USER     - Gmail address (e.g. srthanakesh4@gmail.com)
 *   EMAIL_PASS     - Gmail App Password (16-char from Google Account settings)
 *   FRONTEND_URL   - e.g. http://localhost:3000
 */

require("dotenv").config({ path: "../.env" });
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

// ─── Config ──────────────────────────────────────────────
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// ─── Email Transporter (Gmail) ───────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// ─── Email Template ──────────────────────────────────────
function buildEmailHTML(participantName, magicLink) {
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #4c5ab6, #2dcefb); padding: 30px; text-align: center;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">UM Technothon 2026</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Welcome to the competition!</p>
      </div>
      <div style="padding: 30px; color: #e2e8f0;">
        <p style="font-size: 16px; margin-top: 0;">Hi <strong>${participantName}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6;">
          You have been registered for <strong>UM Technothon 2026</strong>! 🎉
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          To access the competition platform, please set your password by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLink}" 
             style="background: linear-gradient(135deg, #4c5ab6, #2dcefb); color: #fff; text-decoration: none; 
                    padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;
                    display: inline-block;">
            Set Your Password
          </a>
        </div>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${magicLink}" style="color: #2dcefb; word-break: break-all;">${magicLink}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #1e293b; margin: 25px 0;" />
        <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">
          © 2026 UM Technothon. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

// ─── Main: Fetch & Send ──────────────────────────────────
async function main() {
    console.log("🚀 Magic Link Email Sender\n");

    // Validate env variables
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
        console.error("   Set these in your .env file:");
        console.error("   EMAIL_USER=srthanakesh4@gmail.com");
        console.error("   EMAIL_PASS=<your-gmail-app-password>");
        process.exit(1);
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
        console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env");
        process.exit(1);
    }

    // 1. Fetch all unverified participants
    console.log("📋 Fetching unverified participants from Supabase...");
    const { data: participants, error } = await supabase
        .from("participants")
        .select("participant_id, full_name, email")
        .eq("is_verified", false);

    if (error) {
        console.error("❌ Supabase error:", error.message);
        process.exit(1);
    }

    if (!participants || participants.length === 0) {
        console.log("✅ No unverified participants found. Nothing to send.");
        process.exit(0);
    }

    console.log(`📧 Found ${participants.length} unverified participant(s)\n`);

    // 2. Verify email transporter
    try {
        await transporter.verify();
        console.log("✅ Gmail connection verified\n");
    } catch (err) {
        console.error("❌ Gmail auth failed:", err.message);
        console.error("   Make sure EMAIL_USER and EMAIL_PASS (App Password) are correct.");
        console.error("   Generate an App Password at: https://myaccount.google.com/apppasswords");
        process.exit(1);
    }

    // 3. Send emails
    let successCount = 0;
    let failCount = 0;

    for (const participant of participants) {
        const magicLink = `${FRONTEND_URL}/set-password?email=${encodeURIComponent(participant.email)}`;

        const mailOptions = {
            from: `"UM Technothon 2026" <${EMAIL_USER}>`,
            to: participant.email,
            subject: "🚀 UM Technothon 2026 — Set Your Password",
            html: buildEmailHTML(participant.full_name || "Participant", magicLink),
        };

        try {
            await transporter.sendMail(mailOptions);
            successCount++;
            console.log(`  ✅ [${successCount}] Sent to ${participant.email}`);
        } catch (err) {
            failCount++;
            console.error(`  ❌ [FAIL] ${participant.email} — ${err.message}`);
        }

        // Small delay to avoid Gmail rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    // 4. Summary
    console.log("\n────────────────────────────────────");
    console.log(`📊 Results: ${successCount} sent, ${failCount} failed, ${participants.length} total`);
    console.log("────────────────────────────────────");
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
