import { useState } from "react";

const MpesaPaymentForm = ({ loading, handlePhoneSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle the form submission
  const handleSubmit = () => {
    // Call the parent function with the phoneNumber
    handlePhoneSubmit(phoneNumber);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">MPESA Payment</h2>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="07123..."
      />
      <button
        onClick={handleSubmit} // Call handleSubmit which passes phoneNumber
        disabled={phoneNumber.length < 10 || loading}
        className={`w-full py-3 rounded-md text-white ${
          phoneNumber.length < 10 || loading ? "bg-blue-300" : "bg-blue-500"
        } transition-colors duration-300`}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
};

export default MpesaPaymentForm;
