import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavorites = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useFavorites;
