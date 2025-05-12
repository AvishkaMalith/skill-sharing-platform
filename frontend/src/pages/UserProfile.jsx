import NavBar from '../../src/components/NavBar';
import Footer from '../../src/components/Footer';
import profilePicture from "./profile-picture.jpg";

const UserProfile = ({ user, posts }) => {
  // Mock user data based on UserModel
  const userData = user || {
    userName: "jani200521",
    fullName: "Janidhu Sampath",
    userEmail: "janidu528@gmail.com",
    bio: "Passionate learner and skill sharer. Love coding and Music !",
    profilePictureUrl: profilePicture,
    location: "Malabe, Sri Lanka",
    badges: ["Top Contributor", "Skill Master"],
    currentSkills: ["JavaScript", "React", "Python"],
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    },
    followers: ["jane_smith", "bob_jones"],
    following: ["alice_wonder", "charlie_brown"],
    createdAt: "2025/01/01",
  };

  // Mock posts data
  const userPosts = posts || [
    {
      id: "1",
      title: "Introduction to Guitar Chords",
      content: "Learn the basics of chords to kick start your guitar playing journey",
      likes: 25,
      comments: 10,
      createdAt: "2025-05-01",
    },
    {
      id: "2",
      title: "Python for Beginners",
      content: "A comprehensive guide to getting started with Python programming.",
      likes: 15,
      comments: 5,
      createdAt: "2025-05-04",
    },
  ];

  return (

    <>
    <NavBar />
    <div className="min-h-screen bg-blue-200 p-2">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8 p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={userData.profilePictureUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{userData.fullName}</h1>
            <p className="text-gray-600">@{userData.userName}</p>
            <p className="text-gray-500 mt-1">{userData.location}</p>
            <p className="text-gray-700 mt-2">{userData.bio}</p>

            {/* Social Links */}
            <div className="mt-4 flex gap-4 justify-center md:justify-start">
              {userData.socialLinks.twitter && (
                <a
                  href={userData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Twitter
                </a>
              )}
              {userData.socialLinks.linkedin && (
                <a
                  href={userData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  LinkedIn
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="mt-4 flex gap-6 justify-center md:justify-start">
              <div>
                <span className="font-semibold text-gray-800">{userData.followers.length}</span>
                <span className="text-gray-600"> Followers</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">{userData.following.length}</span>
                <span className="text-gray-600"> Following</span>
              </div>
            </div>
          </div>

          {/* Skills and Badges */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.currentSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Badges</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-purple-300 text-blue-900 text-sm font-medium px-2.5 py-0.5 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Joined Date */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            Joined {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Published Posts</h2>
        <div className="space-y-6">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <div className="mt-4 flex gap-6 text-gray-500">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UserProfile;