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

  const handleMapChange = (name, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [key]: value,
      },
    }));
  };

  const handleSaveClick = () => {
    onSave(formData);
    setEditMode(false);
  };

  if (!userData)
    return (
      <div className="text-center p-10 text-gray-600 text-xl">
        No user data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <img
            src={formData.profilePictureUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="text-center md:text-left">
            {editMode ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-gray-300 w-full text-3xl font-bold text-gray-800 focus:outline-none focus:border-blue-500 py-2 text-center md:text-left"
                placeholder="Full Name"
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-800">
                {formData.fullName}
              </h1>
            )}
            <p className="text-lg text-gray-600 mt-1">@{formData.userName}</p>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Location:</span>{" "}
              {formData.location || "Not specified"}
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Joined:</span>{" "}
              {formData.createdAt
                ? new Date(formData.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => (editMode ? handleSaveClick() : setEditMode(true))}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
              editMode
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Bio */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Bio</h2>
            {editMode ? (
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
                rows="4"
              />
            ) : (
              <p className="text-gray-700">
                {formData.bio || "No bio provided."}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
            {editMode ? (
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
              />
            ) : (
              <p className="text-gray-700">{formData.userEmail}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
            {editMode ? (
              <input
                type="text"
                name="currentSkills"
                value={formData.currentSkills?.join(", ") || ""}
                onChange={(e) => handleListChange("currentSkills", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skill1, Skill2, Skill3"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.currentSkills?.length > 0 ? (
                  formData.currentSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No skills listed.</p>
                )}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Social Links
            </h2>
            {editMode ? (
              <div className="space-y-2">
                {["twitter", "linkedin", "github"].map((platform) => (
                  <input
                    key={platform}
                    type="text"
                    name="socialLinks"
                    value={formData.socialLinks?.[platform] || ""}
                    onChange={(e) =>
                      handleMapChange("socialLinks", platform, e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`${platform} URL`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-4">
                {formData.socialLinks &&
                Object.entries(formData.socialLinks).length > 0 ? (
                  Object.entries(formData.socialLinks).map(
                    ([platform, link]) =>
                      link && (
                        <a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      )
                  )
                ) : (
                  <p className="text-gray-600">No social links provided.</p>
                )}
              </div>
            )}
          </div>

          {/* Badges */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Badges</h2>
            <div className="flex flex-wrap gap-4">
              {formData.badges && Object.entries(formData.badges).length > 0 ? (
                Object.entries(formData.badges).map(([name, year], idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {name} ({year})
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No badges earned.</p>
              )}
            </div>
          </div>

          {/* Followers and Following */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Stats</h2>
            <div className="flex gap-6">
              <p className="text-gray-700">
                <span className="font-semibold">Followers:</span>{" "}
                {formData.followers?.length || 0}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Following:</span>{" "}
                {formData.following?.length || 0}
              </p>
            </div>
          </div>

          {/* Roles */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Roles</h2>
            {editMode ? (
              <input
                type="text"
                name="roles"
                value={formData.roles?.join(", ") || ""}
                onChange={(e) => handleListChange("roles", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mentor, Learner"
              />
            ) : (
              <div className="flex gap-2">
                {formData.roles?.length > 0 ? (
                  formData.roles.map((role, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No roles assigned.</p>
                )}
              </div>
            )}
          </div>

          {/* Account Status */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Account Status
            </h2>
            <p
              className={
                formData.enabled
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {formData.enabled ? "Enabled" : "Disabled"}
            </p>
          </div>

          {/* Created At / Updated At */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Account Dates
            </h2>
            <div className="flex gap-6">
              <p className="text-gray-700">
                <span className="font-semibold">Created:</span>{" "}
                {formData.createdAt
                  ? new Date(formData.createdAt).toLocaleDateString()
                  : "-"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Updated:</span>{" "}
                {formData.updatedAt
                  ? new Date(formData.updatedAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;