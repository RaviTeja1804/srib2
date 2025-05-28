import React from 'react';
import axios from 'axios';
import './fakePayment.css';

function FakePayment() {
  const paymentMethods = [
    { name: "Credit Card", pieces: 3, icon: "💳" },
    { name: "UPI", pieces: 1, icon: "📱" },
    { name: "PayPal", pieces: 2, icon: "🔵" },
    { name: "Cryptocurrency", pieces: 4, icon: "₿" }
  ];

  const handlePayment = async (paymentType) => {
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const username = user.username;
    try {
      const res = await axios.post('http://localhost:4000/pay', {
        username,
        paymentType
      });

      alert(`${res.data.msg}\nYou now have ${res.data.pieces.length} pieces.`);
    } catch (err) {
      alert(err.response?.data?.msg || "Payment failed");
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete a Payment to Earn Puzzle Pieces</h2>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div 
            key={method.name}
            className="payment-card"
            onClick={() => handlePayment(method.name)}
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