const techStack = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
  { 
    name: "Vercel", 
    logo: "https://www.svgrepo.com/show/327408/logo-vercel.svg",
    isVercel: true
  },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  // Empty placeholder
  { name: "", logo: "", isEmpty: true },
  // Render with better logo source
  { 
    name: "Render",
    logo: "https://avatars.githubusercontent.com/u/36424661?s=200&v=4",
    isRender: true
  },
  // Neon with better logo source
  { 
    name: "Neon",
    logo: "https://avatars.githubusercontent.com/u/77690634?s=200&v=4",
    isNeon: true
  },
];


const TechStack = () => {
  return (
    <section id="tech" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-16">
          Powered By
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-16 max-w-6xl mx-auto">
          {techStack.map((tech, index) => {
            // Skip rendering empty placeholders
            if (tech.isEmpty) {
              return <div key={`empty-${index}`} className="invisible"></div>;
            }
            
            return (
              <div 
                key={tech.name} 
                className="group p-8 rounded-3xl hover:bg-white shadow-xl hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-xl ${
                  tech.isVercel ? 'bg-black p-3' : 
                  tech.isRender ? 'bg-white p-2 border-2 border-gray-200' : 
                  tech.isNeon ? 'bg-black p-2' : 
                  ''
                }`}>
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={`${
                      tech.isVercel ? 'w-14 h-14 invert' : 
                      tech.isRender ? 'w-16 h-16' : 
                      tech.isNeon ? 'w-16 h-16' : 
                      'w-20 h-20'
                    } object-contain group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <p className="font-bold text-lg text-gray-900">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default TechStack;
