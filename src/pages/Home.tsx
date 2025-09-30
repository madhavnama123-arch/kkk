import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Fish, Dna, Search, Map, Database, BookOpen, Star, MessageSquare } from 'lucide-react';

// Video Component for the Hero Section
const HeroVideoBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
    <video
      className="min-w-full min-h-full absolute object-cover"
      src="https://www.pexels.com/download/video/18304134/"
      autoPlay
      muted
      loop
      playsInline 
    />
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
);

// Scientist Card Component (Redesigned)
const ScientistCard = ({ imageUrl, name, institution, field, experience, impactScore }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/80
              transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:space-x-6">
      <img src={imageUrl} alt={name} className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md" />
      <div className="mt-4 md:mt-0 flex-1">
        <h3 className="text-2xl font-bold text-slate-800 font-google-sans-code">{name}</h3>
        <p className="text-ocean-600 font-semibold mt-1">{field}</p>
        <p className="text-slate-500 text-sm mt-2">{institution}</p>
        
        <div className="flex justify-center md:justify-start items-center space-x-6 mt-4 text-slate-600">
          <div className="text-center">
            <p className="text-xl font-bold">{experience}+</p>
            <p className="text-xs">Years Exp.</p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-xl font-bold">
              {impactScore} <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-xs">Impact Score</p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 border-t border-slate-200 pt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button className="flex-1 bg-gradient-to-r from-ocean-500 to-aqua-500 text-white px-5 py-2.5 rounded-lg
                          font-semibold hover:shadow-lg transition-all duration-300">
          View Research
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg
                          font-semibold hover:bg-slate-100 transition-all duration-300">
          <MessageSquare className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </div>
  </div>
);


// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2 font-google-sans-code">{title}</h3>
    <p className="text-sm text-slate-600 font-zakartra-sans">{description}</p>
  </div>
);

// Full-width information section component
const InfoSection = ({ icon, title, text, imageUrl, imageAlt, reverse = false }) => (
  <section className="py-24 px-6 bg-white">
    <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
      <div className={`text-left ${reverse ? 'md:col-start-2' : ''}`}>
        <div className="mb-6">{icon}</div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4 font-google-sans-code">{title}</h3>
        <p className="text-lg text-slate-600 leading-relaxed font-zakartra-sans">
          {text}
        </p>
      </div>
      <div className={`flex items-center justify-center ${reverse ? 'md:col-start-1' : ''}`}>
        <div className="bg-slate-100 rounded-2xl w-full h-80 shadow-lg flex items-center justify-center text-slate-400">
          {/* In a real application, you'd use an <img src={imageUrl} alt={imageAlt} /> here */}
          {imageAlt}
        </div>
      </div>
    </div>
  </section>
);


const Home = () => {
  const scientists = [
    {
      imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Rajesh Kumar",
      institution: "CSIR-NIO, Goa",
      field: "Physical Oceanography",
      experience: 22,
      impactScore: 4.9,
    },
    {
      imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Priya Nair",
      institution: "CMFRI, Kochi",
      field: "Marine Biology & Fisheries",
      experience: 18,
      impactScore: 4.8,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center text-white p-6">
        <HeroVideoBackground />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-google-sans-code animate-fade-in-up">
            Shark
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-zakartra-sans animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Unifying complex marine data for sustainable ocean management through advanced AI.
          </p>
          <Link to="/ai" className="border-2 border-white text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <span>Try AI Assistant</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* --- Vision & Information Sections --- */}
      <div className="bg-slate-50 py-28">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">A Unified Vision for Marine Intelligence</h2>
              <p className="text-lg text-slate-600 font-zakartra-sans">
                We centralize critical marine data streams into one intelligent platform, empowering researchers and policymakers with actionable insights for conservation and sustainable resource management.
              </p>
            </div>
        </div>
        
        <InfoSection 
          icon={<Globe className="w-12 h-12 text-ocean-600" />}
          title="Oceanographic Data"
          text="Analyze currents, salinity, and climate patterns for a comprehensive marine overview. Our AI models identify trends and anomalies in physical and chemical ocean properties to predict environmental changes."
          imageAlt="[High-resolution 3D ocean current visualization]"
        />

        <InfoSection 
          icon={<Fish className="w-12 h-12 text-aqua-600" />}
          title="Fisheries Data Analytics"
          text="Monitor stock health, track catch trends, and model sustainable fishing practices. The platform integrates historical and real-time data to help ensure the longevity of marine populations and support coastal livelihoods."
          imageAlt="[Interactive dashboard showing fish population trends]"
          reverse={true}
        />

        <InfoSection 
          icon={<Dna className="w-12 h-12 text-deepBlue-600" />}
          title="Biodiversity & eDNA Insights"
          text="Leverage environmental DNA (eDNA), species taxonomy, and habitat mapping to protect marine ecosystems. Uncover the secrets of marine life and track biodiversity with cutting-edge genomic tools."
          imageAlt="[DNA sequencing and species distribution map]"
        />

      </div>

      {/* Scientists Section */}
      <section className="py-28 px-6 bg-slate-100/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">Pioneering Indian Marine Scientists</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-zakartra-sans">
              Our platform is guided by the expertise of leading researchers from India's premier institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-10 max-w-4xl mx-auto">
            {scientists.map((scientist, index) => (
              <ScientistCard key={index} {...scientist} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">Platform Features</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-zakartra-sans">
              A suite of powerful tools designed for modern marine science.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Search className="w-10 h-10 text-ocean-600" />}
              title="AI Search & Analysis"
              description="Pose complex questions in natural language and receive AI-driven insights from integrated datasets."
            />
            <FeatureCard
              icon={<Map className="w-10 h-10 text-aqua-600" />}
              title="Interactive Geovisualization"
              description="Map and visualize marine data in real-time, overlaying different datasets for spatial analysis."
            />
            <FeatureCard
              icon={<Database className="w-10 h-10 text-deepBlue-600" />}
              title="Unified Biodiversity Database"
              description="Access a comprehensive and searchable database of species, eDNA records, and habitat information."
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-seafoam-600" />}
              title="Developer API Access"
              description="Integrate our rich marine datasets into your own applications and models with a robust, documented API."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;