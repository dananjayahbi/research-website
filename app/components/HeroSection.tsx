import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 text-center relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black"></div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        Research <span className="text-blue-600 dark:text-blue-400">Project</span>
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mb-10 text-gray-700 dark:text-gray-300">
        Innovative research solutions for the modern scientific community. Exploring the frontiers of knowledge through collaboration and cutting-edge technology.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="#about"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 font-medium"
        >
          Learn More
        </a>
        <a
          href="#contact"
          className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md transition duration-300 font-medium"
        >
          Contact Us
        </a>
      </div>
      <div className="w-full max-w-4xl mt-16">
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/images/hero-placeholder.jpg"
            alt="Research visualization"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
