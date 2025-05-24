import React from 'react';
import './fakePayment.css';

function FakePayment({ onPaymentSuccess }) {
  const paymentMethods = [
    { name: "Credit Card", pieces: 3, icon: "💳" },
    { name: "UPI", pieces: 1, icon: "📱" },
    { name: "PayPal", pieces: 2, icon: "🔵" },
    { name: "Cryptocurrency", pieces: 4, icon: "₿" }
  ];

  const handlePayment = (pieces) => {
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSuccess(pieces);
      alert(`Payment successful! You earned ${pieces} puzzle pieces.`);
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Complete a Payment to Earn Puzzle Pieces</h2>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div 
            key={method.name}
            className="payment-card"
            onClick={() => handlePayment(method.pieces)}
          >
            <div className="payment-icon">{method.icon}</div>
            <h3>{method.name}</h3>
            <p>+{method.pieces} puzzle pieces</p>
            <div className="payment-btn">Pay Now</div>
          </div>
        ))}
      </div>
      <p className="disclaimer">This is a simulation. No real payments are processed.</p>
    </div>
  );
}

export default FakePayment;