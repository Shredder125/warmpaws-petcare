import { useState } from "react";
import { Mail, Snowflake, Edit2, LogOut } from "lucide-react";
import { FaPaw } from "react-icons/fa";

export default function Profile() {
  const [isHovering, setIsHovering] = useState(false);

  const user = {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@petcare.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    joinDate: "January 2024",
    petCount: 3,
  };

  const handleUpdateProfile = () => alert("Update Profile functionality here!");
  const handleLogout = () => alert("Logout functionality here!");

  return (
    <div className="relative py-12 md:py-20 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Snowflake
          className="absolute top-20 left-10 text-blue-200 dark:text-blue-400 opacity-30 animate-pulse"
          size={40}
        />
        <Snowflake
          className="absolute top-40 right-20 text-blue-200 dark:text-blue-400 opacity-20 animate-pulse delay-1000"
          size={60}
        />
        <Snowflake
          className="absolute bottom-40 left-1/4 text-blue-200 dark:text-blue-400 opacity-25 animate-pulse delay-500"
          size={50}
        />
        <Snowflake
          className="absolute bottom-20 right-1/4 text-blue-200 dark:text-blue-400 opacity-20 animate-pulse delay-700"
          size={45}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Snowflake className="text-blue-500 dark:text-blue-400" size={28} />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-300 dark:to-blue-500 flex items-center justify-center gap-2">
              Your <FaPaw className="text-red-400 inline-block" size={36} /> WarmPaws Profile
            </h1>
            <Snowflake className="text-blue-500 dark:text-blue-400" size={28} />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome back to WarmPaws
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900 shadow-2xl rounded-xl p-8 md:p-12 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-300">
          <div className="flex justify-center mb-8">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>

              <img
                src={user.image}
                alt={user.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />

              {isHovering && (
                <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
                  <Edit2 className="text-white" size={32} />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Pet Care Enthusiast
            </p>

            <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <Mail className="text-blue-600 dark:text-blue-400" size={20} />
              <span className="text-gray-700 dark:text-gray-200 font-medium">
                {user.email}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Member Since
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.joinDate}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Pets
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.petCount} Pets
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleUpdateProfile}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-base flex items-center justify-center"
              >
                <Edit2 className="mr-2" size={20} />
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 border-2 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold py-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <LogOut className="mr-2" size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Keep your profile updated to receive personalized pet care
            recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
