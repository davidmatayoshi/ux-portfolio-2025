import React from 'react';
import Education from './Education';

export default function Background() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-light mb-16">Background</h2>
      
      <div className="space-y-20">
        <section>
          <h3 className="text-2xl mb-10">Experience</h3>
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">Product / UX Design Consultant, SparkVault</h4>
                <span className="text-gray-400 text-sm">2023—Current</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>Design Excellence</strong>: Deliver professional-grade assets including wire-frames, user flows, Figma mockups and prototypes that elevate client brand presence.</li>
                <li><strong>Strategic Advisory</strong>: Provide high-level design strategy consulting for SaaS clients and guiding design practices to ensure brand alignment and impact.</li>
                <li><strong>Cross-functional Collaboration</strong>: Partner with executive teams to translate business goals into creative strategies that align with user needs.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">Senior Manager UX, Pura</h4>
                <span className="text-gray-400 text-sm">03/2023—10/2024</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>High-Impact Design</strong>: Directed the design of an e-commerce site, smart home app, and IoT consumer electronics, supporting Pura's rank as the #1 fastest-growing tech company on Utah Business' Fast 50 List for 2024.</li>
                <li><strong>Executive Communication</strong>: Presented design strategies to senior management, incorporating feedback to align deliverables with brand vision and objectives.</li>
                <li><strong>Creative Leadership</strong>: Led a team of five designers in developing visually compelling and brand-aligned assets across app and web platforms.</li>
                <li><strong>Strategic Brand Management</strong>: Collaborated with Marketing, Product, and Engineering teams to ensure cohesive brand messaging and seamless user experience across all channels.</li>
                <li><strong>Mentorship & Development</strong>: Fostered a collaborative and innovative environment for designers, providing guidance on design principles, workflows, and professional growth with 75% promotions and bonus rate in 18 months.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">UX Director, Lendio</h4>
                <span className="text-gray-400 text-sm">03/2022—01/2023</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>Hands-on Design</strong>: Developed and launched UX/UI for Lendio's flagship mobile app, contributing to product vision as part of the company's strategic tiger team.</li>
                <li><strong>Driving Revenue</strong>: Sole designer for an industry-leading tax credit web application, which resulted in $3MM+ in revenue in the first quarter.</li>
                <li><strong>Talent Development</strong>: Mentored mid-level and junior designers, fostering a collaborative environment and encouraging creative innovation.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">Senior UX Designer, The Church of Jesus Christ of Latter-Day Saints</h4>
                <span className="text-gray-400 text-sm">5/2016—3/2022</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>Product Design</strong>: Responsible for UX on eight products, with a team of three Product Managers and eight developers.</li>
                <li><strong>Global Reach</strong>: Supported a 16MM+ user base in 10+ languages, aligning UX design with business goals, research data, and user insights.</li>
                <li><strong>Leadership Roles</strong>: Served as Team Lead for UX in the Church History Department.</li>
                <li><strong>A/B Testing</strong>: Directed UX for multi-variate (A/B) testing to optimize user engagement.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">Principal UX Designer, StageBase</h4>
                <span className="text-gray-400 text-sm">8/2018—11/2021</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>Leadership</strong>: Built UX discipline from ground up as founding team member, scaling from initial startup through $1MM pre-seed round.</li>
                <li><strong>Strategy</strong>: Partnered with founders to translate complex business challenges into design solutions.</li>
                <li><strong>Design Process</strong>: Created comprehensive UX deliverables including workflow diagrams, wire-frames, high fidelity mockups, and usability requirements.</li>
                <li><strong>Product Design</strong>: Owned end-to-end UI/UX development across product.</li>
                <li><strong>Collaboration</strong>: Maintained close partnership with engineering team in fast-paced and iterative development environment.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <h4 className="text-xl underline decoration-1 underline-offset-8 decoration-blue-500">Manager of Digital Content / UX, Central Washington University</h4>
                <span className="text-gray-400 text-sm">3/2010—5/2016</span>
              </div>
              <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-5 space-y-2">
                <li><strong>Product Ownership</strong>: Spearheaded UX design initiatives, from concept to production for university web platform, enterprise systems, and native apps.</li>
                <li><strong>Stakeholder Management</strong>: Delivered regular briefings and presentations to executive leadership and technical teams.</li>
                <li><strong>Mentorship</strong>: Guided team of five student designers on design principles, workflows, and career track.</li>
                <li><strong>Team Leadership</strong>: Directed the work of a 13-person cross-functional team of content specialists and developers.</li>
                <li><strong>Executive Partnership</strong>: Collaborated directly with university Chief of Staff on strategic digital initiatives.</li>
                <li><strong>Cost Optimization</strong>: Generated $1MM in savings through strategic design thinking approach to website redesign project.</li>
              </ul>
            </div>
          </div>
        </section>

        <Education />
      </div>
    </div>
  );
}