import React from "react";

const useFetch = (action: Function) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const res = await action();

        setResponse(res);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
      }
    })();
  }, []);

  return { response, error, isLoading };
};

export default useFetch;
