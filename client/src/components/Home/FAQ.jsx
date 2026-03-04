import { useState } from "react";

const faqs = [
  {
    question: "Who is eligible to participate?",
    answer:
      "UM Technothon 2026 is open to all university students across Malaysia. Participants must form a team of 3–5 members.",
  },
  {
    question: "How does the registration process work?",
    answer:
      "Teams must create an account, register their team members, and submit required information before the deadline.",
  },
  {
    question: "Are there any participation fees?",
    answer:
      "There is no registration fee. However, selected finalists may need to commit to attending all final round sessions.",
  },
  {
    question: "What are the submission requirements?",
    answer:
      "Teams must submit a project proposal, demo video, and technical documentation before the submission deadline.",
  },
  {
    question: "How will projects be evaluated?",
    answer:
      "Projects will be judged based on innovation, technical complexity, feasibility, presentation quality, and impact.",
  },
  {
    question: "Where will the event be held?",
    answer:
      "The final round will be held physically at University of Malaya. Further details will be announced soon.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq"
      className="py-28 px-6 md:px-20 bg-gradient-to-b from-[#111827] to-[#0f172a] text-white"
    >
        {/* Divider */}
        <div className="max-w-6xl mx-auto mb-20"> 
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center tracking-widest">
          FAQ
        </h2>

        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4 mb-16"></div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl backdrop-blur-md bg-white/5 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <span className="text-cyan-400 text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;