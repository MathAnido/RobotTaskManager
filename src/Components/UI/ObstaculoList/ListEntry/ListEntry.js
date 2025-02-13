import React from 'react';
import Button from '../../Button/Button';
const ListEntry = (props) => {
  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.x}</td>
      <td>{props.y}</td>
      {/* <td>{props.radius}</td> */}
      <td>
        <Button clicked={() => props.onRemove()} value="X" />
      </td>
    </tr>
  );
};

export default ListEntry;
