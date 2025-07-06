import React, { useState } from "react";
import "./FAQAccordion.css";
import arrowDown from "../assets/svg/arrowDown.svg";
import arrowUp from "../assets/svg/arrowUp.svg";

function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-accordion">
      {faqs.map((faq, idx) => (
        <div className="faq-item" key={idx}>
          <button
            className="faq-question"
            onClick={() => handleToggle(idx)}
            aria-expanded={openIndex === idx}
          >
            <span>{faq.question}</span>
            <img
              src={openIndex === idx ? arrowUp : arrowDown}
              alt={openIndex === idx ? "Collapse" : "Expand"}
              className={`arrow ${openIndex === idx ? "open" : ""}`}
              style={{ width: 24, height: 24 }}
            />
          </button>
          <div
            className={`faq-answer ${openIndex === idx ? "open" : ""}`}
            style={{
              maxHeight: openIndex === idx ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <div className="faq-answer-content">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion; 