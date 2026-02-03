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
  { name: "", logo: "", isEmpty: true },
  { 
    name: "Render",
    logo: "https://avatars.githubusercontent.com/u/36424661?s=200&v=4",
    isRender: true
  },
  { 
    name: "Neon",
    logo: "https://avatars.githubusercontent.com/u/77690634?s=200&v=4",
    isNeon: true
  },
];

const TechStack = () => {
  return (
    <section id="tech" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 sm:mb-12 lg:mb-16">
          Powered By
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {techStack.map((tech, index) => {
            // Hide empty placeholder on mobile, show on sm+
            if (tech.isEmpty) {
              return <div key={`empty-${index}`} className="hidden sm:block invisible"></div>;
            }
            
            return (
              <div 
                key={tech.name} 
                className="group p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:bg-white shadow-lg sm:shadow-xl hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:scale-105"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center rounded-lg sm:rounded-xl ${
                  tech.isVercel ? 'bg-black p-2 sm:p-3' : 
                  tech.isRender ? 'bg-white p-1.5 sm:p-2 border-2 border-gray-200' : 
                  tech.isNeon ? 'bg-black p-1.5 sm:p-2' : 
                  ''
                }`}>
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={`${
                      tech.isVercel ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 invert' : 
                      tech.isRender ? 'w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16' : 
                      tech.isNeon ? 'w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16' : 
                      'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'
                    } object-contain group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <p className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-900">{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;