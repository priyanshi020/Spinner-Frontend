import React, { useState, useEffect } from "react";
import Modal from "react-modal"; // Install using `npm install react-modal`
import logo from '../Images/tufcon-logo.png'
import { useNavigate } from "react-router-dom";
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
const navigate=useNavigate()
  useEffect(() => {
    // Randomly pick a question on component load
    const randomIndex = Math.floor(Math.random() * questionsData.length);
    setCurrentQuestion(questionsData[randomIndex]);
    console.log("current", currentQuestion);
  }, []);
  console.log("hrlooo");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowModal(true); // Open modal for feedback
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openPaymentForm = () => {
    navigate('/payment')
    closeModal();
  };

  return (
    <div
      
      style={{ textAlign: "center", padding: "20px" }}
    >
      <img src={logo} height={120} width={120}/>
     <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    // backgroundColor: "#282c34", // Optional background color
    textAlign: "center",
    padding: "20px",
  }}
>
  <h1 style={{ marginBottom: "20px", color: "#fff" }}>
    Choose the Correct Answer
  </h1>
  {currentQuestion && (
    <>
      <div style={{ marginBottom: "20px" }}>
        <h2 className="text-white">{currentQuestion.question}</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              background: "#f0f0f0",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  )}
</div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "400px",
            textAlign: "center",
            padding: "20px",
            borderRadius: "10px",
            border: "none",
            background: isCorrect ? "#d4edda" : "#f8d7da",
            color: isCorrect ? "#155724" : "#721c24",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
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
              onClick={closeModal}
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
              Try Again
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default QA;
