import Image from 'next/image';

export default function HeroSection() {
  return (    <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="/images/video chat.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/90 to-white/90 dark:from-gray-900/90 dark:to-black/90"></div><h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
        Mirror 
      </h1>
      <p className="text-xl md:text-2xl max-w-3xl mb-10 text-gray-700 dark:text-gray-300">
        An innovative multi-modal AI framework for depression detection, combining voice, text, and facial analysis. Leveraging deep learning with CNN-LSTM, RNN, and computer vision to provide accurate mental health monitoring and personalized support through an AI voice companion.
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
      </div>      <div className="w-full max-w-4xl mt-16">
        <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/images/AI_Chatbot.webp"
            alt="AI Chatbot Visualization"
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
