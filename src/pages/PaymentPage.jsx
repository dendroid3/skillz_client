import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import MpesaPaymentForm from "../components/MpesaPaymentForm";
import CreditCardPaymentForm from "../components/CreditCardPaymentForm";
import BASE_URL from "./UTILS";

const paymentMethods = [
  {
    id: 1,
    name: "Credit Card",
  },
  {
    id: 2,
    name: "MPESA",
  },
];

const PaymentPage = () => {
  const { courseId, learnerId } = useParams(); // Access the parameters from the URL
  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/payments/sendSTKPush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneNumber, amount: 10 }), // Example amount
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("STK Push Response: ", data);

      await enrollUserInCourse();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const enrollUserInCourse = async () => {
    try {
      console.log("Enrolling user with courseId:", courseId, "and learnerId:", learnerId);

      const response = await fetch(`${BASE_URL}/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: courseId,
          learner_id: learnerId,
          status: "enrolled",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Enrollment Response: ", data);

       // Redirect to the dashboard after successful enrollment
      navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleCardSubmit = () => {
    console.log("Submitting card details");
  };

  return (
    <div className="content p-10 bg-gray-50 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Select your payment method to continue</h1>

      <div className="flex gap-4 mb-10">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`border rounded-md px-6 py-3 text-base ${
              paymentMethod === method.id
                ? "border-blue-500 text-blue-500"
                : "border-gray-300"
            }`}
          >
            {method.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        {!paymentMethod && (
          <p className="text-gray-500">No payment method selected</p>
        )}
        {paymentMethod === 2 && (
          <MpesaPaymentForm
            loading={loading}
            handlePhoneSubmit={(phoneNumber) => handlePhoneSubmit(phoneNumber)} // Pass the phone number to handlePhoneSubmit
          />
        )}
        {paymentMethod === 1 && (
          <CreditCardPaymentForm handleCardSubmit={handleCardSubmit} />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
