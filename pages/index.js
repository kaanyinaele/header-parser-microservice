import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/whoami");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
      console.error("Fetch error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Request Header Parser</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <h1>Request Header Parser</h1>
        <button
          onClick={getInfo}
          disabled={isLoading}
          aria-label="Get user information"
        >
          {isLoading ? "Loading..." : "Get My Info"}
        </button>

        {error && <div className="error">{error}</div>}

        {isLoading ? (
          <div className="loading-container">
            <div
              className="spinner"
              role="status"
              aria-label="Loading data"
            ></div>
          </div>
        ) : (
          result && (
            <pre className="result">{JSON.stringify(result, null, 2)}</pre>
          )
        )}
      </div>
    </>
  );
}
