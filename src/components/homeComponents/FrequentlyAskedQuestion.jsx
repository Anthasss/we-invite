import faqs from "../../json/faqs.json";
export default function FrequentlyAskedQuestion() {
  return (
    <div className="w-full h-auto bg-secondary flex items-center justify-center p-8">
      <div className="w-4/5 p-12 bg-primary rounded-xl flex flex-col justify-center items-center">
        {/* title */}
        <h2 className="text-4xl text-neutral font-great-vibes">Frequently Asked Questions</h2>
        <div className="w-1/2">
          <div className="divider divider-neutral m-0 p-0 mb-6 w-full"></div>
        </div>

        {/* faq accordion question*/}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-transparent border-b-2 border-neutral text-neutral"
          >
            <input
              type="checkbox"
              name={`my-accordion-${index}`}
            />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
