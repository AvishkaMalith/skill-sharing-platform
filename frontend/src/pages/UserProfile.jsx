import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

const UserProfile = () => {
  const { state } = useLocation();
  const userId = state?.userId;

  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        setIsFetching(true);
        try {
          const response = await axios.get(`http://localhost:8080/api/users/get/${userId}`);
          setUserProfile(response.data);
          setFormData(response.data);
        } catch (err) {
          setError(err.message || 'Failed to fetch user profile');
        } finally {
          setIsFetching(false);
        }
      };
      fetchUserProfile();
    }
  }, [userId, isUpdating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.put(`http://localhost:8080/api/users/update`, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      setUserProfile(response.data);
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch user profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isFetching) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="min-h-screen flex items-center justify-center">No user profile found.</div>;
  }

  return (
    <div className="min-h-screen bg-blue-200 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img
              src={formData.profilePictureUrl || 'https://via.placeholder.com/128'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            {editMode ? (
              <>
                <input
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleChange}
                  className="block w-full text-xl font-semibold text-gray-800 mb-1"
                  placeholder="Full Name"
                />
                <input
                  name="userName"
                  value={formData.userName || ''}
                  onChange={handleChange}
                  className="block w-full text-gray-600 mb-1"
                  placeholder="Username"
                />
                <input
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="block w-full text-gray-500 mb-1"
                  placeholder="Location"
                />
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  className="block w-full text-gray-700 mt-2"
                  placeholder="Bio"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">{userProfile.fullName}</h1>
                <p className="text-gray-600">@{userProfile.userName}</p>
                <p className="text-gray-500 mt-1">{userProfile.location}</p>
                <p className="text-gray-700 mt-2">{userProfile.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userProfile.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-md border border-gray-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              {editMode ? (
                <>
                  <input
                    value={formData.socialLinks?.twitter || ''}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="text-sm px-2 py-1 border rounded"
                    placeholder="Twitter URL"
                  />
                  <input
                    value={formData.socialLinks?.linkedin || ''}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="text-sm px-2 py-1 border rounded"
                    placeholder="LinkedIn URL"
                  />
                </>
              ) : (
                <>
                  {userProfile.socialLinks?.twitter && (
                    <a
                      href={userProfile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Twitter
                    </a>
                  )}
                  {userProfile.socialLinks?.linkedin && (
                    <a
                      href={userProfile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 flex gap-6 justify-center md:justify-start">
              <div>
                <span className="font-semibold text-gray-800">{userProfile.followers?.length || 0}</span>
                <span className="text-gray-600"> Followers</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">{userProfile.following?.length || 0}</span>
                <span className="text-gray-600"> Following</span>
              </div>
            </div>
          </div>
        </div>

        {editMode && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        <div className="mt-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            Joined {new Date(userProfile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
