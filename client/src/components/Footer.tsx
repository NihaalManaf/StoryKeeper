import { Link } from "wouter";
import {
  Facebook,
  Instagram,
  Twitter,
  Share2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D3436] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-['Quicksand'] mb-6">
              StoryKeeper
            </h3>
            <p className="text-gray-400 mb-6">
              Transforming your family stories into beautifully illustrated
              children's books that preserve your memories for generations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-['Quicksand'] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Example Stories
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Our Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold font-['Quicksand'] mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy (Coming Soon)
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Terms of Service (Coming Soon)
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Cookie Policy (Coming Soon)
                </a>
              </li>
              <li>
                <a
                  href="#refunds"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Refund Policy (Coming Soon)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold font-['Quicksand'] mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mt-1 mr-3" />
                <span>nihaalmanaf@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mt-1 mr-3" />
                <span>+65 96882607</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3" />
                <span>Singapore, SG</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p className="mb-4">
            © {new Date().getFullYear()} StoryKeeper. All rights reserved.
          </p>
          <p className="mb-4">Made with ❤️ for families everywhere</p>
          <p className="text-xs opacity-30 hover:opacity-70 transition-opacity">
            <Link to="/admin/contact-submissions">Admin Access</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
