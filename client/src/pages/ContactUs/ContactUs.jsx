import React from "react";
import { MessageSquare, Phone } from "lucide-react";
import ContactHeader from "../../components/ContactUs/ContactHeader";
import ContactButton from "../../components/ContactUs/ContactButton";

const ContactUs = () => {
  return (
    // UPDATED: Background to Midnight Dark
    <div className="relative h-[500px] w-full overflow-hidden bg-[#0a0c1b]">
      <div className="flex h-full flex-col items-center justify-center px-4">
        <div
          // UPDATED: Container to Glassmorphism Dark
          className="w-full max-w-lg rounded-2xl bg-[#161b33]/80 p-8 shadow-2xl border border-white/10 backdrop-blur-sm transition-all duration-500 md:p-12"
          style={{
            boxShadow:
              "0 20px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(34, 211, 238, 0.05)",
          }}
        >
          <ContactHeader
            title="Contact Us"
            subtitle="Find us in WhatsApp or Discord for any account support or technical issues."
          />

          <div className="flex flex-col gap-4">
            <ContactButton
              icon={Phone}
              label="WhatsApp"
              href="https://chat.whatsapp.com/IILTwGce3rmIizjJHYltpf"
              // UPDATED: Subtle Glow Colors
              color="bg-green-500"
              hoverColor="hover:bg-green-600"
            />

            <ContactButton
              icon={MessageSquare}
              label="Discord"
              href="https://discord.gg/5PwNWZb7tC"
              // UPDATED: Subtle Glow Colors
              color="bg-indigo-500"
              hoverColor="hover:bg-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
