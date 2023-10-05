import useLocalStorageState from './useLocalStorageState';

export default function useAreasData() {

  const [storedValue, setValue] = useLocalStorageState("areaList", initialData);

  return [storedValue, setValue];
}

const initialData = {
  doArea: {
    name: "Do",
    items: []
  },
  scheduleArea: {
    name: "Schedule",
    items: []
  },
  delegateArea: {
    name: "Delegate",
    items: []
  },
  eliminateArea: {
    name: "Eliminate",
    items: []
  }
}