import { Todo } from '../model/Todo';
import useLocalStorageState from './useLocalStorageState';

export default function useTodos(): [Todo[], (value: Todo[]) => void] {

  const [storedValue, setValue] = useLocalStorageState("todos", [] as Todo[]);

  return [storedValue, setValue];
}
