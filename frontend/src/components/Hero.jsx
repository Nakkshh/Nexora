const Hero = () => {
  const integrationLogos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png",
      alt: "Gmail"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png",
      alt: "Microsoft"
    },
    {
      src: "https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png",
      alt: "Slack"
    }
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 sm:pt-24 pb-8 sm:pb-12 relative overflow-hidden">
      {/* Decorative Background Elements - Mobile Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Note sticky note - LEFT SIDE */}
        <div className="absolute left-2 sm:left-4 lg:left-8 top-1/4 sm:top-1/3 w-32 h-24 sm:w-40 sm:h-32 lg:w-48 lg:h-40 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-4 lg:p-6 transform rotate-6 hover:rotate-3 transition-all duration-500 border border-yellow-200 z-20">
          <div className="space-y-1 sm:space-y-2">
            <div className="w-12 sm:w-16 lg:w-20 h-2 sm:h-2.5 lg:h-3 bg-yellow-300 rounded-full"></div>
            <div className="w-10 sm:w-12 lg:w-16 h-1.5 sm:h-2 lg:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-14 sm:w-18 lg:w-24 h-1.5 sm:h-2 lg:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-12 sm:w-16 lg:w-20 h-1.5 sm:h-2 lg:h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Check icon sticky note - LEFT BOTTOM */}
        <div className="absolute left-4 sm:left-12 lg:left-24 bottom-1/4 w-20 h-18 sm:w-24 sm:h-20 lg:w-32 lg:h-28 bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-2 sm:p-3 lg:p-4 transform -rotate-3 hover:rotate-0 transition-all duration-500 border border-gray-200 flex items-center justify-center z-20">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Today Tasks - RIGHT BOTTOM (Hidden on small mobile, visible from sm+) */}
        <div className="hidden sm:block absolute right-2 sm:right-6 lg:right-12 bottom-12 sm:bottom-16 lg:bottom-20 w-48 sm:w-56 lg:w-64 h-36 sm:h-40 lg:h-48 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 transform hover:scale-105 transition-all duration-500 z-20">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Today's Tasks</h4>
            <div className="w-2 sm:w-2.5 lg:w-3 h-4 sm:h-5 lg:h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg"></div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">Design landing page</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">Review PRs</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">Deploy to prod</span>
            </div>
          </div>
        </div>

        {/* Reminder - RIGHT TOP */}
        <div className="absolute right-2 sm:right-4 lg:right-8 top-1/4 w-36 sm:w-44 lg:w-52 h-32 sm:h-36 lg:h-44 bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200 p-3 sm:p-4 lg:p-6 transform rotate-6 sm:rotate-9 lg:rotate-12 hover:rotate-9 lg:hover:rotate-9 transition-all duration-500 z-20 overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-2 sm:w-2.5 lg:w-3 h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-orange-400 to-orange-500 rounded-lg"></div>
            <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">Reminders</h4>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 lg:p-3 bg-orange-50 rounded-xl sm:rounded-2xl">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs sm:text-sm text-gray-900 truncate">Team meeting</p>
              <p className="text-[10px] sm:text-xs text-gray-500">2:30 PM</p>
            </div>
          </div>
        </div>

        {/* Meeting timer - CENTER RIGHT (Hidden on mobile, visible from md+) */}
        <div className="hidden md:flex absolute right-20 sm:right-24 lg:right-32 top-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl flex-col items-center justify-center text-white font-bold transform -rotate-6 hover:rotate-0 transition-all duration-500 z-10">
          <span className="text-lg sm:text-xl lg:text-2xl">01:23</span>
          <span className="text-[8px] sm:text-[9px] lg:text-xs uppercase tracking-wide">Meeting</span>
        </div>
      </div>
      {/* Main Content */}
      {/* Main Content - Mobile Responsive */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-black text-gray-900 mb-8 sm:mb-10 lg:mb-12 leading-none">
            {/* First line - BIGGER on mobile */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight sm:leading-none">
                Stay organized and
            </span>

            {/* Second line with anti-clip wrapper - BIGGER on mobile */}
            <div className="overflow-visible py-2">
                <span className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-[1.25] pb-3 [-webkit-text-stroke:1px_transparent]">
                boost your productivity
                </span>
            </div>
        </h1>
        {/* Subtitle - BIGGER on mobile */}
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 mb-16 sm:mb-20 md:mb-28 lg:mb-32 max-w-4xl mx-auto leading-relaxed font-light px-2">
            Efficiently manage your tasks and boost productivity.
        </p>
        {/* Blue dot pattern - Mobile responsive */}
        <div className="mb-6 sm:mb-8 md:mb-12 opacity-80 pointer-events-none z-10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl mx-auto relative">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-white rounded-full shadow-lg absolute -top-1 sm:-top-2 left-1 sm:left-2"></div>
            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg absolute top-1 sm:top-2 right-1 sm:right-2"></div>
          </div>
        </div>
        {/* Integration Logos - Mobile responsive */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-70 mb-6 sm:mb-8 z-20 relative">
          {integrationLogos.map((logo, index) => (
            <img 
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:opacity-100 hover:scale-110 transition-all duration-300 drop-shadow-lg object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;