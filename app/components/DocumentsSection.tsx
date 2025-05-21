import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  dateAdded: string;
}

export default function DocumentsSection() {
  // Sample documents data
  const documents: Document[] = [
    {
      id: "doc1",
      title: "Research Methodology",
      description: "Comprehensive guide to our research methodology and approach",
      fileUrl: "/documents/document1.pdf",
      fileSize: "2.4 MB",
      dateAdded: "2025-01-15"
    },
    {
      id: "doc2",
      title: "Data Analysis Report",
      description: "Detailed analysis of research data with key findings and insights",
      fileUrl: "/documents/document2.pdf",
      fileSize: "3.8 MB",
      dateAdded: "2025-02-28"
    },
    {
      id: "doc3",
      title: "Literature Review",
      description: "Comprehensive review of existing literature related to our research",
      fileUrl: "/documents/document3.pdf",
      fileSize: "1.7 MB",
      dateAdded: "2025-03-10"
    },
  ];

  return (
    <section id="documents" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Project Documents</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Access and download key research documents related to our project.
        </p>
        
        <div className="grid gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{doc.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-4">Size: {doc.fileSize}</span>
                    <span>Added: {new Date(doc.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link 
                  href={doc.fileUrl}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                  download
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
