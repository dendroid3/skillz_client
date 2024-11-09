import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faCcVisa, faCcMastercard, faCcAmex } from "@fortawesome/free-brands-svg-icons";

const countries = [
  { id: 1, name: "Kenya" },
  { id: 2, name: "Uganda" },
  { id: 3, name: "Tanzania" },
  { id: 4, name: "Burundi" },
  { id: 5, name: "Rwanda" },
];

const CreditCardPaymentForm = ({ handleCardSubmit }) => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvv, setCvv] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");

  // Function to determine the card type based on card number
  const getCardTypeIcon = () => {
    if (cardNumber.startsWith("4")) {
      return faCcVisa;
    } else if (cardNumber.startsWith("5")) {
      return faCcMastercard;
    } else if (cardNumber.startsWith("3")) {
      return faCcAmex;
    } else {
      return faCreditCard;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Credit Card Payment</h2>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
        />
      </div>

      {/* Card Information */}
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Card Information
        </label>
        <div className="relative">
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="border border-gray-300 rounded-md p-3 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Card Number"
          />
          <FontAwesomeIcon
            icon={getCardTypeIcon()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
          />
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex-1">
            <label htmlFor="mm" className="sr-only">MM</label>
            <input
              id="mm"
              type="number"
              value={mm}
              onChange={(e) => setMm(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="yy" className="sr-only">YY</label>
            <input
              id="yy"
              type="number"
              value={yy}
              onChange={(e) => setYy(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YY"
            />
          </div>
        </div>
      </div>

      {/* CVV */}
      <div className="mb-4">
        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
          CVV
        </label>
        <input
          id="cvv"
          type="number"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="CVV"
        />
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
        />
      </div>

      {/* Country Selection */}
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country or Region
        </label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Country</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleCardSubmit}
        className="bg-blue-500 p-4 rounded-md text-white w-full mt-4 hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default CreditCardPaymentForm;
