import Link from 'next/link';
import Image from 'next/image';
import fileSvg from '../../public/file.svg';

interface Presentation {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  dateAdded: string;
}

export default function PresentationsSection() {
  // Sample presentations data
  const presentations: Presentation[] = [
    {
      id: "pres1",
      title: "Project Overview",
      description: "A comprehensive overview of our research project and goals",
      fileUrl: "/presentations/presentation1.pdf",
      fileSize: "5.2 MB",
      dateAdded: "2025-01-20"
    },
    {
      id: "pres2",
      title: "Interim Findings",
      description: "Presentation of interim research findings and progress update",
      fileUrl: "/presentations/presentation2.pdf",
      fileSize: "4.7 MB",
      dateAdded: "2025-03-05"
    },
    {
      id: "pres3",
      title: "Methodology Explanation",
      description: "Detailed explanation of research methodologies employed",
      fileUrl: "/presentations/presentation3.pdf",
      fileSize: "3.9 MB",
      dateAdded: "2025-04-12"
    },
  ];

  return (
    <section id="presentations" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Project Presentations</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Access and download presentation slides from various project milestones.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentations.map((presentation) => (
            <div key={presentation.id} className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <div className="relative h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <Image
                  src={fileSvg}
                  alt={`${presentation.title} thumbnail`}
                  width={80}
                  height={80}
                  className="opacity-50"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{presentation.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{presentation.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="mr-4">Size: {presentation.fileSize}</span>
                  <span>Added: {new Date(presentation.dateAdded).toLocaleDateString()}</span>
                </div>
                <Link 
                  href={presentation.fileUrl}
                  className="inline-flex items-center w-full justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                  download
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Presentation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
