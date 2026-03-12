import { useState } from "react";

const faqs = [
  {
    question: "Who can participate?",
    answer:
      "UM Technothon 2026 is open to all undergraduate university students, including diploma students.",
  },
  {
    question: "How many members can a team have?",
    answer:
      "Each team can consist of 1–5 members.",
  },
  {
    question: "When will the competition take place?",
    answer:
      "25th April – 7th June 2026. The competition runs across several phases, ending with the physical final round on 7th June 2026.",
  },
  {
    question: "Is the competition online or physical?",
    answer:
      "The competition will be conducted in both formats. The preliminary round and mentoring sessions will be held online, while the final pitching day will be conducted physically at Universiti Malaya.",
  },
  {
    question: "Is UM Technothon 2026 free to join?",
    answer:
      "Yes. A RM25 commitment fee is required, but it will be fully refunded after completing the competition.",
  },
  {
    question: "What do teams need to submit for the preliminary round?",
    answer:
      "Teams must submit a pitch deck and a video presentation. Optional submissions include a visual prototype (such as Figma) and a GitHub repository.",
  },
  {
    question: "Do teams need to build a working prototype?",
    answer:
      "Yes. Finalist teams will need to develop their prototype during the building phase before presenting in the physical final day.",
  },
  {
    question: "Who can join in terms of background/discipline?",
    answer:
      "No. Students from any discipline are welcome, as the competition encourages multidisciplinary collaboration and diverse perspectives.",
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