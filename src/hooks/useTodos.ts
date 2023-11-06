import { TodoModel } from '../model';
import useLocalStorageState from './useLocalStorageState';

export default function useTodos(): [TodoModel[], (value: TodoModel[]) => void] {

  const [storedValue, setValue] = useLocalStorageState("todos", [] as TodoModel[]);

  return [storedValue, setValue];
}
