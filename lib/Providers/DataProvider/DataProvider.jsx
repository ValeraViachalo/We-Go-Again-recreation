import React, { createContext } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

export const getData = async (url) => {
  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const DataContext = createContext();

export const DataProvider = ({ children, url, dehydratedState }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <DataFetcher url={url}>{children}</DataFetcher>
      </Hydrate>
    </QueryClientProvider>
  );
};

const DataFetcher = ({ children, url }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getData(url),
    queryKey: ["data", url],
  });

  if (isError) {
    console.error("Error fetching data:", error);
    return <div>Error loading data: {error.message}</div>;
  }

  return !isLoading && data ? (
    <DataContext.Provider value={{ data, isLoading }}>
      {children}
    </DataContext.Provider>
  ) : null;
};