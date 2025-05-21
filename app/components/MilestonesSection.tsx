export default function MilestonesSection() {
  const milestones = [
    {
      date: "January 2024",
      title: "Project Initiation",
      description: "Initial research proposal approved and project planning begins"
    },
    {
      date: "March 2024",
      title: "Methodology Development",
      description: "Research methodologies finalized and initial data collection begins"
    },
    {
      date: "June 2024",
      title: "Data Collection Complete",
      description: "Primary research data collected and organized for analysis"
    },
    {
      date: "August 2024",
      title: "Analysis Phase",
      description: "Comprehensive analysis of collected data using advanced statistical methods"
    },
    {
      date: "November 2024",
      title: "Interim Findings",
      description: "Preliminary research findings presented to stakeholders"
    },
    {
      date: "February 2025",
      title: "Peer Review Process",
      description: "Research undergoes rigorous peer review process for validation"
    },
    {
      date: "April 2025",
      title: "Publication Preparation",
      description: "Final report preparation and submission for publication"
    }
  ];

  return (
    <section id="milestones" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Project Milestones</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Key achievements and milestones in our research journey.
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-blue-100 dark:border-gray-800 z-10"></div>
                
                {/* Content */}
                <div className="w-full md:w-[calc(50%-2rem)] pt-2">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                      {milestone.date}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Empty space for layout on mobile */}
                <div className="w-0 md:w-[calc(50%-2rem)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
