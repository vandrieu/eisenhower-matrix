
import AreaContent from './AreaContent';
import AreaHeader from './AreaHeader';

import './AreaView.css';
import { AreaName, Todo } from '../../model/model';

function AreaView(props: AreaProps) {
  const { data, areaKey, add, change, remove } = props;
  const areaClassName = areaKey.toLowerCase();

  return (
    <div key={areaKey} className={`area ${areaClassName}-area`}>

      <AreaHeader areaKey={areaKey} add={add} />
      <AreaContent areaKey={areaKey} add={add} todos={data} change={change} remove={remove} />

    </div>
  )
}

type AreaProps = {
  data: Todo[],
  areaKey: AreaName,
  add: (key: AreaName) => void,
  change: (todoId: string, text: string) => void,
  remove: (todoId: string) => void
}

export default AreaView;