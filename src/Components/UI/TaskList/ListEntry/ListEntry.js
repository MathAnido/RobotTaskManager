import React from 'react';
import Button from '../../Button/Button';
const ListEntry = (props) => {
  return (
    <tr>
      <td>{props.number}</td>
      <td>{props.carga}</td>
      <td>{props.descarga}</td>
      <td>
        <Button clicked={() => props.onRemove(props.number)} value="X" />
      </td>
    </tr>
  );
};

export default ListEntry;
