export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Our Research System</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Our research system represents a breakthrough in scientific data analysis, enabling researchers to process and visualize complex datasets with unprecedented speed and accuracy.
            </p>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Developed over three years by a team of interdisciplinary experts, this platform combines advanced machine learning algorithms with intuitive user interfaces to democratize access to powerful analytical tools.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              The system supports collaborative research across multiple disciplines, fostering innovation and accelerating scientific discovery in fields ranging from climate science to genomics.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              {[
                "Real-time data processing and visualization",
                "Multi-modal analysis capabilities",
                "Collaborative workspaces for research teams",
                "Advanced statistical modeling tools",
                "Integration with existing research databases",
                "Secure data storage and sharing protocols",
                "Custom report generation and publication support"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
