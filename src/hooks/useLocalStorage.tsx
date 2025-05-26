import React, { useEffect } from "react";
type useLocalStorageProps<T> = {
  key: string;
  value: T;
};
const useLocalStorage = <T,>({ key, value }: useLocalStorageProps<T>) => {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      console.log(item);
      return item ? JSON.parse(item) : value;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
    console.log(storedValue);
  }, [key, storedValue]);

  const removeItem = () => {
    localStorage.removeItem(key);
  };

  return [storedValue, setStoredValue, removeItem] as const;
};

export default useLocalStorage;
