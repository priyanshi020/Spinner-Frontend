import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Install using `npm install react-modal`
import logo from "../Images/tufcon-logo.png";
import { useNavigate } from "react-router-dom";
import "./CSS/QA.css";
const QA = () => {
  const questionsData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Mark Twain",
        "Leo Tolstoy",
      ],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      question: "Which element has the chemical symbol O?",
      options: ["Oxygen", "Gold", "Silver", "Iron"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
    },
    {
      question: "Which is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Pablo Picasso",
        "Claude Monet",
      ],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctAnswer: "Nitrogen",
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
    {
      question: "What is the boiling point of water in Celsius?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      correctAnswer: "100°C",
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
