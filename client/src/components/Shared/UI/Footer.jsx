import { Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // bg-[#464c92] bg-[#1e2a4a]
    <div className=" bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] 
    border-t border-white/10 
    shadow-inner
    text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/*Top Section*/}
        <div className="grid grid-cols-1 md:grid-cols-2  mb-12">
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
              <p className="font-semibold">CHUA PEI YING</p>
              <p className="text-xs text-gray-300">
                HEAD OF FINANCE
              </p>
              <p className="text-sm">016-4985040</p>
            </div>

            <div className="space-y-1">
              <p className="font-semibold">THEN FUNG MAYE</p>
              <p className="text-xs text-gray-300">DIRECTOR</p>
              <p className="text-sm">011-51731170</p>
            </div>
          </div>
        </div>

        {/* Divider*/}
        <div className="flex flex-col md:flex-row justify-end pt-9 border-t border-white/20">
            {/* Footer */}
            {/* <Link
              to="/credits"
              className="text-sm text-gray-300 hover:text-white mb-2 transition-colors"
            >
              Meet our event website's awesome devs here!
            </Link> */}
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
              to="https://www.instagram.com/umtechnothon/"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>
      </div>
    </div>
  );
}
