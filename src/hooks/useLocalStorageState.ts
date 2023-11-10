import { useState } from 'react';

export default function useLocalStorageState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // log items to avoid losing all my data in case an evolution erases the value stored
      console.log("Items loaded from local storage:", item)
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}