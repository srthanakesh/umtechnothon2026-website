import React from "react";
import { MessageSquare, Phone } from "lucide-react";
import ContactHeader from "../../components/ContactUs/ContactHeader";
import ContactButton from "../../components/ContactUs/ContactButton";

const ContactUs = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-full flex-col items-center justify-center px-4">
        <div
          className="w-full max-w-lg rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 md:p-12"
          style={{
            boxShadow:
              "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -5px rgba(0, 0, 0, 0.04)",
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
              color="bg-green-500"
              hoverColor="hover:bg-green-600"
            />

            <ContactButton
              icon={MessageSquare}
              label="Discord"
              href="https://discord.gg/5PwNWZb7tC"
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
