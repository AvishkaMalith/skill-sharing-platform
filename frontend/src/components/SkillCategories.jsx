const categories = [
  { name: 'Programming', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Graphic Design', image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Digital Marketing', image: 'https://unsplash.com/photos/a-bunch-of-different-types-of-buttons-on-a-table-JLBi_QoG-zY' },
  { name: 'Photography', image: 'https://images.unsplash.com/photo-1502982720700-bfff97cd766d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Music Production', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=300&q=80' },
  { name: 'Writing', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=300&q=80' },
  { name: 'Video Editing', image: 'https://images.unsplash.com/photo-1536244636800-a3f74db0f27b?auto=format&fit=crop&w=300&q=80' },
  { name: 'Web Development', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80' },
  { name: 'Data Science', image: 'https://images.unsplash.com/photo-1551288049-b1bd52206d22?auto=format&fit=crop&w=300&q=80' },
  { name: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=300&q=80' },
];

const SkillCategories = () => {
  return (
    <div className="max-w-7xl container mx-auto px-8 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Skill Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategories;