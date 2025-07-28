import React from 'react';
import { Phone, Mail, Clock, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Sri Venkateshwara Homeopathy
            </h3>
            <p className="text-gray-300 mb-4">
              Your trusted homeopathy clinic providing natural healing solutions with 20 years of experience.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span>8309853792</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span>163deepthi@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span>Behind the Bus Stand, U.B Road, Bhadrachalam</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Clinic Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-green-400" />
                <span>Morning: 10:00 AM - 3:00 PM</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-3 text-green-400" />
                <span>Evening: 6:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Sri Venkateshwara Homeopathy Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;