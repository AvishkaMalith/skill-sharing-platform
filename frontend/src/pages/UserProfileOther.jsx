import chord_C from "./C.png";
import chord_D from "./D.png";
import chord_G from "./G.png";

import profilePicture from "./girl.jpg";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useState } from 'react';

const OtherUserProfile = () => {
  // Mock user data
  const userData = {
    userName: "Janakalani Nishadi",
    fullName: "Janaki200572",
    bio: "Enthusiastic coder and mentor. Sharing knowledge on web development and guitar lessons!",
    profilePictureUrl: profilePicture,
    location: "Avissawella, Sri Lanka",
    badges: ["Community Leader", "Expert Mentor"],
    currentSkills: ["Guitar", "CSS", "JavaScript", "Photography"],
    socialLinks: {
      twitter: "https://twitter.com/janesmith",
      github: "https://github.com/janesmith"
    },
    followers: ["john_doe", "bob_jones", "alice_wonder"],
    following: ["charlie_brown", "david_lee"],
    createdAt: new Date().toISOString(),
  };

  // Mock post data for guitar lesson
  const userPosts = [
    {
      id: "1",
      title: "Beginner Guitar Lesson: Mastering Basic Chords",
      content: `
        Welcome to this beginner guitar lesson! Today, we'll learn three fundamental chords: G Major, C Major, and D Major. These chords are the backbone of many popular songs.

        **G Major Chord**:
        - Place your index finger on the 2nd fret of the A string (5th string).
        - Middle finger on the 3rd fret of the low E string (6th string).
        - Ring finger on the 3rd fret of the high E string (1st string).
        - Strum all strings.

        **C Major Chord**:
        - Index finger on the 1st fret of the B string (2nd string).
        - Middle finger on the 2nd fret of the D string (4th string).
        - Ring finger on the 3rd fret of the A string (5th string).
        - Strum from the A string down (avoid the low E string).

        **D Major Chord**:
        - Index finger on the 2nd fret of the G string (3rd string).
        - Ring finger on the 3rd fret of the B string (2nd string).
        - Middle finger on the 2nd fret of the high E string (1st string).
        - Strum from the D string down (avoid the low E and A strings).

        Practice transitioning between these chords slowly, ensuring each note rings clearly. Try strumming a simple pattern: down, down, up, up, down. With practice, you'll be playing songs in no time!
      `,
      images: [
        { url: chord_G, caption: "G Major Chord" },
        { url: chord_C, caption: "C Major Chord" },
        { url: chord_D, caption: "D Major Chord" },
      ],
      likes: 42,
      comments: 18,
      createdAt: new Date().toISOString(),
    },
  ];

  // State for follow/unfollow
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-blue-200 flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Half: User Details */}
        <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <img
              src={userData.profilePictureUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4"
            />
            {/* User Info */}
            <h1 className="text-xl font-bold text-gray-800">{userData.fullName}</h1>
            <p className="text-gray-600">@{userData.userName}</p>
            <p className="text-gray-500 mt-1">{userData.location}</p>
            <p className="text-gray-700 mt-2 text-center">{userData.bio}</p>

            {/* Follow/Unfollow Button */}
            <button
              onClick={handleFollowToggle}
              className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white ${isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>

            {/* Stats */}
            <div className="mt-4 flex gap-6">
              <div>
                <span className="font-semibold text-gray-800">{userData.followers.length}</span>
                <span className="text-gray-600"> Followers</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">{userData.following.length}</span>
                <span className="text-gray-600"> Following</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4 w-full">
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
            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold text-gray-800">Badges</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-900 text-sm font-medium px-2.5 py-0.5 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex gap-4">
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
              {userData.socialLinks.github && (
                <a
                  href={userData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  GitHub
                </a>
              )}
            </div>

            {/* Joined Date */}
            <p className="text-gray-500 text-sm mt-4">
              Joined {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right Half: Posts */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts by {userData.fullName}</h2>
          <div className="space-y-6">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{post.content}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {post.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-gray-500 text-sm mt-1 text-center">{image.caption}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-6 text-gray-500 items-center">
                  <span>{post.likes} Likes</span>
                  <span>{post.comments} Comments</span>
                  <button className="text-blue-500 hover:text-blue-700">Share</button>
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

export default OtherUserProfile;