import React from 'react';
import { Quote } from 'lucide-react';

const references = [
  {
    quote: "David is an outstanding problem-solver and collaborator, combining creativity with strategic thinking to tackle challenges and elevate customer experience. His commitment to quality is unwavering—he never compromises on customer or brand experience. As I've witnessed David managing his team, I've seen him be both respectful and empowering, always advocating for his team and aligning their strengths to create value. Working with David is genuinely enjoyable; his positive energy and dedication make every project smoother and more engaging. Any team would be lucky to have someone as driven, thoughtful, and skilled as David.",
    author: "Rachel Beckstead",
    role: "Sr. Director of Product Management at Pura"
  },
  {
    quote: "David is a talented UX Designer with a knack for diving deep and figuring out complex systems and how to improve them. He's a strong leader who can give good design critique and stoke your brain to the next level of what's possible to make your design better. A humble guy with a great sense of humor who is fun to work with and helps make those around him better. If you get the chance to work with David, you'll see what I mean.",
    author: "Isaac Gerke",
    role: "Director of User Experience, Lendio"
  },
  {
    quote: "I had the privilege of bringing on David to our team at Lendio, and I have no regrets. We immediately put him to work on one of the most complex, technical, and ambiguous areas of of product, and he made an almost immediate impact. His impact continued to grow as he took on new opportunities, most especially his contribution of our Lendio Product Vision tiger team and his transition to Director of Lender SaaS. David is a leader who leads with integrity, smarts, and humility. I hope I get the chance to work with him again.",
    author: "Grant Zabriskie",
    role: "Senior UX Manager, Lendio"
  },
  {
    quote: "David is a joy to work with, including his kind personality, positive attitude, and his super power of making sense of the most complex problems. Put a dry erase marker in his hand and watch him diagram the problem with ease. Everyone loves David and any company will benefit from having him!",
    author: "Jon Smith, MBA",
    role: "Senior UX Designer, Pura"
  },
  {
    quote: "He is a good designer, but more importantly David is a creative thinker and a problem solver. He is constantly exploring better ways to meet our clients needs, whether it relates directly to his job or not. He is a true team player with a great attitude. There is no question that I would hire David again if the opportunity presented itself. If you are looking for someone with a great amount of energy, enthusiasm, creativity and drive, I would strongly recommend adding David to your team.",
    author: "Chad McCraine",
    role: "Advertising/B2B Design Manager, The Seattle Times"
  },
  {
    quote: "Every once in while you have an opportunity to work with someone that that is truly special. The kind of person that thinks out of the box, is wiling to share their ideas, and takes the initiative to bring positive change to an organization. David is one such person and I would recommend him without hesitation.",
    author: "Arthur Thomas",
    role: "Business Development Sales Manager, The Seattle Times"
  }
];

export default function References() {
  return (
    <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-light mb-16">Recommendations</h2>
      <div className="space-y-20">
        {references.map((reference, index) => (
          <div key={index} className="group">
            <Quote size={32} className="mb-6 text-gray-300" />
            <blockquote className="text-xl font-light mb-8 leading-relaxed text-gray-600">
              "{reference.quote}"
            </blockquote>
            <div>
              <div className="font-medium text-lg">{reference.author}</div>
              <div className="text-gray-500">{reference.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}