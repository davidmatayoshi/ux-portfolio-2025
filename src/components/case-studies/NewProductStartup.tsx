import React from 'react';

export default function NewProductStartup() {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-24 space-y-24">
        <header className="space-y-12">
          <h1 className="text-5xl font-light">New Product Startup</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Client</h3>
              <p>Confidential</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Role</h3>
              <p>Lead Product Designer</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Duration</h3>
              <p>4 months</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Team</h3>
              <p>3 Engineers, Product Manager</p>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-light">Challenge</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            A startup approached us with a vision for a revolutionary product in the smart home space. 
            They needed to validate their concept, understand user needs, and create a compelling MVP 
            that would attract both users and investors.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-light">Solution</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We developed a comprehensive product strategy and design system that enabled rapid 
            iteration and testing. Through user research and prototyping, we refined the concept 
            into a viable product that resonated with target users while maintaining technical feasibility.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-light">Impact</h2>
          <ul className="space-y-4">
            <li className="text-xl text-gray-600">Successfully raised $2.5M in seed funding</li>
            <li className="text-xl text-gray-600">Achieved 92% user satisfaction in beta testing</li>
            <li className="text-xl text-gray-600">Reduced development time by 40% through systematic design approach</li>
            <li className="text-xl text-gray-600">Featured in TechCrunch and Product Hunt</li>
          </ul>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-light">Process</h2>
          
          <div className="space-y-6">
            <h3 className="text-2xl">Discovery & Research</h3>
            <img 
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
              alt="Team collaborating on research"
              className="w-full max-w-[800px] aspect-[16/9] object-cover rounded-lg"
            />
            <p className="text-xl text-gray-600 leading-relaxed">
              We conducted extensive user interviews, competitive analysis, and market research to 
              understand the landscape and identify opportunities. This phase helped validate core 
              assumptions and refine the product vision.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl">Concept Development</h3>
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
              alt="Wireframes and sketches"
              className="w-full max-w-[800px] aspect-[16/9] object-cover rounded-lg"
            />
            <p className="text-xl text-gray-600 leading-relaxed">
              Through rapid prototyping and iteration, we explored various concepts and interaction 
              models. Weekly design sprints helped us quickly validate ideas and pivot based on feedback.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl">Design System</h3>
            <img 
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
              alt="Design system components"
              className="w-full max-w-[800px] aspect-[16/9] object-cover rounded-lg"
            />
            <p className="text-xl text-gray-600 leading-relaxed">
              We created a comprehensive design system that ensured consistency across the product 
              while enabling rapid development. This included a component library, interaction patterns, 
              and documentation.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl">Testing & Refinement</h3>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
              alt="User testing session"
              className="w-full max-w-[800px] aspect-[16/9] object-cover rounded-lg"
            />
            <p className="text-xl text-gray-600 leading-relaxed">
              Through multiple rounds of user testing, we refined the product based on real user 
              feedback. This iterative process helped us identify and fix usability issues while 
              validating our design decisions.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}