import { useState, useEffect } from "react";
import { Mail, Edit2, LogOut } from "lucide-react";
import { FaPaw } from "react-icons/fa";
import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

export default function Profile() {
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState(undefined);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "WarmPaws User",
          email: currentUser.email,
          image: currentUser.photoURL || null,
          joinDate: "January 2024",
          petCount: 3,
        });
        setName(currentUser.displayName || "");
        setImageUrl(currentUser.photoURL || "");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imageUrl || null,
      });
      setUser((prev) => ({
        ...prev,
        name: name || "WarmPaws User",
        image: imageUrl || null,
      }));
      setEditing(false);
      toast.success("Profile updated successfully! 🎉");
    } catch (err) {
      toast.error("Error updating profile: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (user === undefined)
    return <p className="text-center mt-40">Loading profile...</p>;
  if (user === null)
    return (
      <p className="text-center mt-40">
        You are not logged in.{" "}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    );

  return (
    <div className="relative py-12 min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl flex flex-col md:text-5xl md:flex-row font-bold items-center justify-center gap-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-300 dark:to-blue-500">
            Your <FaPaw className="text-red-400 inline-block" size={36} />{" "}
            WarmPaws Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
            Welcome back to WarmPaws !!!
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900 shadow-2xl rounded-xl p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white dark:border-slate-700 shadow-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              )}
              {isHovering && !editing && (
                <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center backdrop-blur-sm">
                  <Edit2 className="text-white" size={32} />
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Pet Care Enthusiast
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
            <Mail className="text-blue-600 dark:text-blue-400" size={20} />
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {user.email}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
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

          <div className="flex flex-col sm:flex-row gap-4">
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-6 rounded-lg shadow-lg flex items-center justify-center"
              >
                <Edit2 className="mr-2" size={20} /> Update Profile
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 border-2 border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold py-6 rounded-lg flex items-center justify-center"
            >
              <LogOut className="mr-2" size={20} /> Logout
            </button>
          </div>

          {editing && (
            <form
              onSubmit={handleUpdateProfile}
              className="mt-6 space-y-4 text-center"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-2xl font-bold text-gray-900 dark:text-white w-full bg-transparent focus:outline-none border-b border-gray-300 dark:border-gray-600 py-1"
                placeholder="Enter your name"
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="text-center text-sm text-gray-600 dark:text-gray-300 w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none py-1"
                placeholder="Enter new profile image URL (optional)"
              />
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center"
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
