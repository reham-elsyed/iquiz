import React, { useEffect } from 'react'
type useLocalStorageProps<T> = {
    key: string;
    value: T;
}
const useLocalStorage = <T,>({ key, value }: useLocalStorageProps<T>) => {
   const [storedValue, setStoredValue] = React.useState(() => {
 if (typeof window !== "undefined"){
    const currentValue = localStorage.getItem(key);
    return currentValue ? JSON.parse(currentValue): value;
 }})

 useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
 },[key, storedValue])
   
   return [storedValue, setStoredValue] as const;
}

export default useLocalStorage