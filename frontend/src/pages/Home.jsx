import React from 'react'
import fullbanner from "/full-banner.png";
const Home = () => {
  return (
    <main className="min-h-screen  text-gray-900 ">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-[clamp(2rem,6vw,5rem)] leading-tight font-extrabold tracking-tight">
            Build experiences <br /> that feel alive.
          </h1>
          <p className="mt-6 text-[clamp(1rem,2vw,1.25rem)] text-gray-600 font-light max-w-xl mx-auto">
            Simple. Elegant. Animated. Create stunning interfaces with
            performance-driven motion and meaningful content.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="btn primary">
              Get Started
            </button>
            <button className="btn secondary">
              View Showcase
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img
              src={fullbanner}
              alt="Preview"
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-3xl font-semibold mb-4">
              Designed to inspire, built for clarity.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Our approach is rooted in simplicity and polish — we combine great
              typography, subtle interactions, and focused layout design. No
              noise, no clutter. Just experience-driven UI with soul.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home