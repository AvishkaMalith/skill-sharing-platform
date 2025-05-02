import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center py-4 lg:py-16">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Learn. Share. Grow.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Join a global community of professionals exchanging skills and mentorship. Whether you're learning or teaching, SkillEra empowers your journey.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <button className="inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                Browse Mentors
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <img
              src="https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Skill sharing collaboration"
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
