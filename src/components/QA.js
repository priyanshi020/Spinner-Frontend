import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Install using `npm install react-modal`
import logo from "../Images/tufcon-logo.png";
import { useNavigate } from "react-router-dom";
import "./CSS/QA.css";
const QA = () => {
    const questionsData = [
    {
      question: "TMT \u0938\u094d\u091f\u0940\u0932 \u0915\u093e \u092a\u0942\u0930\u093e \u0928\u093e\u092e \u0915\u094d\u092f\u093e \u0939\u0948?",
      options: [
        "\u091f\u0947\u092e\u094d\u092a\u0930\u094d\u0921 \u092e\u0947\u091f\u0932 \u091f\u093e\u0907\u091f\u0928\u093f\u092f\u092e",
        "\u0925\u092e\u094d\u0921\u0932 \u092e\u0947\u091f\u0932 \u091f\u0948\u0915\u094d\u0928\u094b\u0932\u094b\u091c\u0940",
        "\u0925\u092e\u094b-\u092e\u0948\u0915\u0947\u0928\u093f\u0915\u0932 \u091f\u094d\u0930\u0940\u091f\u0947\u0921",
        "\u091f\u093e\u092f\u091f\u0947\u0928\u093f\u092f\u092e \u092e\u0948\u091f\u0940\u0930\u093f\u092f\u0932 \u091f\u0947\u0938\u094d\u091f",
      ],
      correctAnswer: "\u0925\u092e\u094b-\u092e\u0948\u0915\u0947\u0928\u093f\u0915\u0932 \u091f\u094d\u0930\u0940\u091f\u0947\u0921",
    },
    {
      question: "TUFCON \u0915\u093e Corporate Office \u0915\u0939\u093e \u0939\u0948?",
      options: ["\u0926\u093f\u0932\u094d\u0932\u0940", "\u0915\u094b\u0932\u0915\u093e\u0924\u093e", "\u0917\u093f\u0930\u0940\u0927", "\u092a\u091f\u0928\u093e"],
      correctAnswer: "\u0917\u093f\u0930\u0940\u0927",
    },
    {
      question: "TUFCON TMT \u0938\u094d\u091f\u0940\u0932 \u0915\u094b \u0917\u092e\u0932 \u0915\u0930\u0928\u0947 \u0915\u0940 \u092a\u094d\u0930\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u094b \u0915\u094d\u092f\u093e \u0915\u0939\u0924\u0947 \u0939\u0948?",
      options: ["\u090f\u0938\u0940\u0902\u0915\u094d\u091f\u093f\u0902\u0917", "\u0915\u094d\u0935\u0947\u0902\u091a\u093f\u0902\u0917", "\u092e\u094b\u0932\u094d\u0921\u093f\u0902\u0917", "\u092b\u094d\u092f\u0942\u091a\u093f\u0902\u0917"],
      correctAnswer: "\u0915\u094d\u0935\u0947\u0902\u091a \u0917\u0902",
    },
    {
      question: "TUFCON TMT \u0938\u094d\u091f\u0940\u0932 \u092e\u0947\u0902 \u0928\u093f\u092e\u094d\u0928 \u092a\u094d\u0930\u0915\u093e\u0930 \u0915\u0947 \u0930\u094b\u0927\u0915 \u092a\u0926\u093e\u0930\u094d\u0925 \u0915\u094d\u092f\u093e \u0939\u094b\u0924\u0947 \u0939\u0948\u0902?",
      options: ["\u0905\u0932\u094b\u092f \u0924\u0924\u094d\u0935", "\u0915\u093e\u0930\u094d\u0921\u093e\u0928", "\u091a\u093f\u0932\u094d\u0932\u093f\u0915\u093e", "\u091f\u093e\u0907\u091f\u0947\u0928\u093f\u092f\u092e"],
      correctAnswer: "\u0905\u0932\u094b\u092f \u0924\u0924\u094d\u0935",
    },
    {
      question: "TUFCON TMT \u0938\u094d\u091f\u0940\u0932 \u0915\u0940 \u092e\u091c\u092c\u0942\u0924 \u0935\u093f\u0936\u0947\u0937\u0924\u093e \u0915\u094c\u0928 \u0938\u0940 \u0939\u0948?",
      options: [
        "\u0909\u091a\u094d\u091a \u0932\u0940\u0932\u093e\u092a\u0928",
        "\u0909\u091a\u094d\u091a \u0927\u093e\u0924\u0941\u0918\u0924\u093e",
        "\u0909\u091a\u094d\u091a \u0924\u0928\u094d\u092f\u0924\u093e \u0936\u0915\u094d\u0924\u093f",
        "\u0909\u091a\u094d\u091a \u0924\u093e\u092a\u092e\u093e\u0928 \u0938\u0939\u093f\u0936\u0940\u0932\u0924\u093e",
      ],
      correctAnswer: "\u0909\u091a\u094d\u091a \u0924\u0928\u094d\u092f\u0924\u093e \u0936\u0915\u094d\u0924\u093f",
    },
    {
      question: "TUFCON TMT \u0938\u094d\u091f\u0940\u0932 \u0915\u0940 \u0917\u0930\u094d\u092e \u0919\u0932\u0940 \u0915\u0940 \u0917\u092e\u094d\u0932 \u0915\u0940 \u092a\u094d\u0930\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u094b \u0915\u094d\u092f\u093e \u0915\u0939\u0924\u0947 \u0915\u094b \u0915\u094d\u092f\u093e \u0915\u093e\u0930\u094d\u0921\u093e\u0928",
      options: [
        "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u093e \u091a\u0947\u0936",
        "\u091a\u093f\u0932\u094d\u0932\u093f\u0915\u093e \u0915\u0940 \u091a\u0947\u0936",
        "\u091f\u093e\u092a\u092e \u0915\u0947 \u091a\u0947\u0936",
        "\u091a\u093f\u0932\u094d\u0932\u093f\u0915\u093e \u0915\u0947 \u091a\u0947\u0936",
      ],
      correctAnswer: "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0940 \u091a\u0947\u0936",
    },
    {
      question: "TUFCON TMT \u0915\u093e \u0928\u093f\u092e\u093e\u091c \u0915\u0940 \u0915\u094b \u0915\u094d\u092f\u093e \u0915\u0947 \u092a\u094d\u0930\u0915\u094d\u0930\u093f\u092f\u093e \u0915\u0940 \u0915\u0947 \u0915\u093e \u0915\u0940 \u0915\u093e\u0928 \u0928\u0935\u093f \u0915\u0947 \u091a\u0947\u0936",
      options: [
        "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0940 \u091a\u0947\u0936",
        "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0947 \u091a\u0947\u0936",
        "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0947 \u091a\u0947\u0936",
        "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0940 \u091a\u0947\u0936",
      ],
      correctAnswer: "\u0915\u093e\u0930\u094d\u0921\u093e\u0928 \u0915\u0940 \u091a\u0947\u0936",
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  console.log("qdata", questionsData);
  const navigate = useNavigate();
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    setCurrentQuestion(questionsData[randomIndex]);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openPaymentForm = () => {
    navigate("/payment");
    closeModal();
  };

  const handleIncorrect = () => {
    closeModal();
    navigate("/");
  };

  return (
    <>
      <div className="Apps1" style={{ textAlign: "", padding: "20px" }}>
        <img src={logo}  width={200} className='my-4' />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            textAlign: "center",
            padding: "0px",
          }}
        >
          {/* <h1
            className="text-dark mb-5"
            style={{ marginBottom: "10px", color: "#fff",fontSize:'35px' }}
          >
            Choose the Correct Answer
          </h1> */}
          {currentQuestion && (
            <>
              <div className="" style={{ marginBottom: "50px" }}>
                <h2 style={{ fontSize: "20px" }} className="text-white">
                  {currentQuestion.question}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px",
                  }}
                >
                  {["a", "b"].map((label, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleOptionClick(currentQuestion.options[index])
                      }
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "15px 33px",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{label}.</span>
                      {currentQuestion.options[index]}
                    </button>
                  ))}
                </div>

                {/* Second Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px",
                  }}
                >
                  {["c", "d"].map((label, index) => (
                    <button
                      key={index + 2} // Offset index for the second row
                      onClick={() =>
                        handleOptionClick(currentQuestion.options[index + 2])
                      }
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "15px 33px",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{label}.</span>
                      {currentQuestion.options[index + 2]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              padding: "20px",
              borderRadius: "10px",
              border: "none",
              background: isCorrect ? "#d4edda" : "#f8d7da",
              color: isCorrect ? "#155724" : "#721c24",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          }}
        >
          {/* Close Icon */}
          <button
            onClick={handleIncorrect}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: isCorrect ? "#155724" : "#721c24",
            }}
          >
            &times;
          </button>

          {isCorrect ? (
            <>
              <h2>🎉 Correct Answer!</h2>
              <button
                onClick={openPaymentForm}
                style={{
                  marginTop: "20px",
                  background: "#34A24F",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Proceed to Payment
              </button>
            </>
          ) : (
            <>
              <h2>❌ Wrong Answer!</h2>
              <button
                onClick={handleIncorrect}
                style={{
                  marginTop: "20px",
                  background: "#ccc",
                  color: "#000",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Go to Login
              </button>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default QA;
