import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const navigations = {
    main: [
      { key: 1, name: 'About', href: '#' },
      { key: 2, name: 'Blog', href: '#' },
      { key: 3, name: 'Jobs', href: '#' },
      { key: 4, name: 'Press', href: '#' },
      { key: 5, name: 'Accessibility', href: '#' },
      { key: 6, name: 'Partners', href: '#' }
    ],
    social: [
      { key: 1, name: 'Facebook', href: '#', icon: FaFacebook },
      { key: 2, name: 'Instagram', href: '#', icon: FaInstagram },
      { key: 3, name: 'Twitter', href: '#', icon: FaTwitter },
      { key: 4, name: 'GitHub', href: '#', icon: FaGithub },
      { key: 5, name: 'YouTube', href: '#', icon: FaYoutube }
    ]
  };

  return (
    <footer className="bg-blue-500">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigations.main.map((item) => (
            <div key={item.key} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-white hover:text-blue-100">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigations.social.map((item) => (
            <a key={item.key} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6 text-blue-900 hover:text-blue-200" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm leading-5 text-blue-200">
          &copy; 2025 SkillEra, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 