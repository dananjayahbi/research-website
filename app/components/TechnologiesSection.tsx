import Image from 'next/image';

// Import SVGs from the public folder
import nextSvg from '../../public/next.svg';
import vercelSvg from '../../public/vercel.svg';
import fileSvg from '../../public/file.svg';
import globeSvg from '../../public/globe.svg';
import windowSvg from '../../public/window.svg';

export default function TechnologiesSection() {
  const technologies = [
    {
      name: "React",
      icon: globeSvg,
      description: "For building interactive user interfaces"
    },
    {
      name: "Next.js",
      icon: nextSvg,
      description: "For server-side rendering and static site generation"
    },
    {
      name: "TailwindCSS",
      icon: windowSvg,
      description: "For modern, responsive designs"
    },
    {
      name: "Python",
      icon: fileSvg,
      description: "For data processing and analysis"
    },
    {
      name: "TensorFlow",
      icon: vercelSvg,
      description: "For machine learning capabilities"
    },
    {
      name: "PostgreSQL",
      icon: fileSvg,
      description: "For reliable data storage"
    }
  ];

  return (
    <section id="technologies" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Technologies Used</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Our research platform leverages cutting-edge technologies to provide a robust, scalable, and user-friendly experience.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">          {technologies.map((tech, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
              <div className="relative w-20 h-20 mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                  <Image
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
