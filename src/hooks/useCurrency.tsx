import { useState, useEffect } from "react";
import axios from "axios";
import { getRate } from "@/http/api";

const useCurrency = () => {
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace the URL below with your API endpoint
        const response = await getRate();

        if (response) {
          setExchangeRate(+response.rate);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        setError((err as unknown as any)?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { exchangeRate, loading, error };
};

export default useCurrency;
