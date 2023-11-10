import { PlusSquare } from 'react-feather';

import { AreaName } from '../../model/model';
import './AreaHeader.css';

function AreaHeader(props: AreaHeaderProps) {
  const { areaKey, add } = props;

  return (
    <div className={"area-title"}>
      <h2 className="title-text">{areaKey}</h2>
      <button onClick={() => add(areaKey)}><PlusSquare /></button>
    </div>
  )
}

type AreaHeaderProps = {
  areaKey: AreaName,
  add: (key: AreaName) => void,
}

export default AreaHeader;