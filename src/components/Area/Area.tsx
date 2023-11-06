
import AreaContent from './AreaContent';
import AreaHeader from './AreaHeader';

import './Area.css';
import { AreaName, TodoModel } from '../../model';

function Area(props: AreaProps) {
  const { data, areaKey, add, change, remove } = props;
  const areaClassName = areaKey.toLowerCase();

  return (
    <div key={areaKey} className={`area ${areaClassName}-area`}>

      <AreaHeader areaKey={areaKey} add={add} />
      <AreaContent areaKey={areaKey} todos={data} change={change} remove={remove} />

    </div>
  )
}

type AreaProps = {
  data: TodoModel[],
  areaKey: AreaName,
  add: (key: AreaName) => void,
  change: (todoId: string, text: string) => void,
  remove: (todoId: string) => void
}

export default Area;