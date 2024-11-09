import { useState } from "react";

export const useSendSTKPush = () => {
  const [loading, setLoading] = useState(false);

  const sendSTKPush = async (phoneNumber) => {
    try {
      setLoading(true);
      console.log("Sending STK push to", phoneNumber);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to send STK push", error);
      setLoading(false);
    }
  };

  return { loading, sendSTKPush };
};