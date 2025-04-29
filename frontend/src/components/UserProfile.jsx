import { useState, useEffect } from "react";

const UserProfile = ({ userData, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSaveClick = () => {
    onSave(formData);
    setEditMode(false);
  };

  if (!userData) return <div className="text-center p-10 text-gray-500 text-xl">No user data found.</div>;

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar: Profile Header */}
      <div className="lg:w-1/3 w-full bg-white shadow-lg p-8 flex flex-col items-center lg:min-h-screen">
        <img
          src={formData.profilePictureUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover border-4 border-gray-100 shadow-md mb-6"
        />
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-gray-300 w-full text-center text-3xl font-bold text-gray-800 focus:outline-none focus:border-indigo-500 py-2"
            placeholder="Full Name"
          />
        ) : (
          <h1 className="text-4xl font-bold text-gray-900">{formData.fullName}</h1>
        )}
        <p className="text-sm text-gray-500 mt-2">{formData.location}</p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {formData.socialLinks &&
            Object.entries(formData.socialLinks).map(([platform, link]) => (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-lg"
              >
                {platform}
              </a>
            ))}
        </div>

        {/* Badges */}
        <div className="mt-10 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Badges</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {formData.badges &&
              formData.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm"
                >
                  {badge}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Main Content: Profile Information */}
      <div className="lg:w-2/3 w-full p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Profile Info and Edit Button */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Profile Information</h2>
            <button
              onClick={() => (editMode ? handleSaveClick() : setEditMode(true))}
              className={`px-8 py-3 rounded-lg text-white font-medium transition-colors text-lg ${
                editMode ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {editMode ? "Save" : "Edit"}
            </button>
          </div>

          {/* Other Fields */}
          <div className="space-y-10">
            {/* Username */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Username</label>
              {editMode ? (
                <input
                  type="text"
                  name="userName"
                  value={formData.userName || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-indigo-500 py-2 text-gray-700 text-lg"
                  placeholder="Username"
                />
              ) : (
                <p className="text-xl text-gray-800">{formData.userName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-indigo-500 py-2 text-gray-700 text-lg"
                  placeholder="Email Address"
                />
              ) : (
                <p className="text-xl text-gray-800">{formData.userEmail}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-indigo-500 py-2 text-gray-700 text-lg resize-none"
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed text-lg">{formData.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Skills</label>
              {editMode ? (
                <input
                  type="text"
                  name="currentSkills"
                  value={formData.currentSkills ? formData.currentSkills.join(", ") : ""}
                  onChange={(e) => handleListChange("currentSkills", e.target.value)}
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-indigo-500 py-2 text-gray-700 text-lg"
                  placeholder="Skill1, Skill2, Skill3"
                />
              ) : (
                <div className="flex flex-wrap gap-4">
                  {formData.currentSkills &&
                    formData.currentSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-sm font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Followers and Following */}
            <div className="flex gap-12">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Followers</label>
                <p className="text-xl text-gray-800">{formData.followers ? formData.followers.length : 0}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Following</label>
                <p className="text-xl text-gray-800">{formData.following ? formData.following.length : 0}</p>
              </div>
            </div>

            {/* Roles */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Roles</label>
              {editMode ? (
                <input
                  type="text"
                  name="roles"
                  value={formData.roles ? formData.roles.join(", ") : ""}
                  onChange={(e) => handleListChange("roles", e.target.value)}
                  className="border-b-2 border-gray-200 w-full focus:outline-none focus:border-indigo-500 py-2 text-gray-700 text-lg"
                  placeholder="user, admin"
                />
              ) : (
                <p className="text-xl text-gray-800">{formData.roles ? formData.roles.join(", ") : ""}</p>
              )}
            </div>

            {/* Account Status */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Account Status</label>
              <p className={formData.enabled ? "text-green-600 font-medium text-lg" : "text-red-600 font-medium text-lg"}>
                {formData.enabled ? "Enabled" : "Disabled"}
              </p>
            </div>

            {/* Created At / Updated At */}
            <div className="flex gap-12">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Created At</label>
                <p className="text-xl text-tdray-800">{formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "-"}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Updated At</label>
                <p className="text-xl text-gray-800">{formData.updatedAt ? new Date(formData.updatedAt).toLocaleDateString() : "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;