import { Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // bg-[#464c92] bg-[#1e2a4a]
    <div className="bg-[#464c92] text-white px-6 py-12 md:px-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Logos and Info */}
          <div className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-36 h-20 flex items-center justify-center">
                <img
                  src="/logos/um-logo-white.png"
                  alt="University of Malaya Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src="/logos/technothon-logo-transparent.png"
                  alt="Technothon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <p>Faculty of Computer Science & Information Technology</p>
              <p>University of Malaya, 50603 Kuala Lumpur</p>
            </div>

            <div className="text-sm">
              <p>umtechnothon@gmail.com</p>
            </div>
          </div>

          {/* Right Column - Contact Persons */}
          <div className="text-right space-y-8">
            <div className="space-y-1">
              <p className="font-semibold">TEO JING YING</p>
              <p className="text-xs text-gray-300">
                HEAD OF FINANCE & SPONSORSHIP
              </p>
              <p className="text-sm">010-2109332</p>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">OOI CHIN MING</p>
              <p className="text-xs text-gray-300">DIRECTOR</p>
              <p className="text-sm">010-4507617</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-300">
          <div className="flex flex-col">
            <Link
              to="/credits"
              className="text-sm text-gray-300 hover:text-white mb-2 transition-colors"
            >
              Meet our event website's awesome devs here!
            </Link>
            <p className="text-sm text-gray-300">
              © UMTECHNOTHON 2026. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="https://www.linkedin.com/company/gdg-university-of-malaya/posts/?feedView=all"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              to="https://www.instagram.com/um.technothon/"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
