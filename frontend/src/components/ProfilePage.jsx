import { useState, useEffect } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/get/68104b559d28eb48d147699c");
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async (updatedData) => {
    try {
      await axios.put(`http://localhost:8080/api/users/update/${updatedData.userId}`, updatedData);
      alert("Profile Updated Successfully!");
      setUserData(updatedData);
    } catch (error) {
      console.error("Failed to save user data", error);
      alert("Failed to update profile!");
    }
  };

  if (loading) return <div className="text-center p-10">Loading Profile...</div>;
  if (!userData) return <div className="text-center p-10">No user data found!</div>;

  return (
    <UserProfile userData={userData} onSave={handleSave} />
  );
};

export default ProfilePage;
