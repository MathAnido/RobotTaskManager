import React from 'react';
import ListEntry from './ListEntry/ListEntry';
import './ObstaculoList.css';

const ObstaculoList = (props) => {
  let list = 'Loading...';
  const { obstaculo, onRemove } = props
  if (obstaculo) {
    list = obstaculo.map((obs, index) => {
      return (
        <ListEntry
          key={index}
          number={index + 1}
          x={obs.x}
          y={obs.y}
          radius={obs.radius}
          onRemove={() => onRemove(index)}
        />
      );
    });
  }
  
  if (list.length === 0) {
    list = (
      <tr>
        <td colSpan="4">
          <h4>Não há obstáculos</h4>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <h3>Obstáculos:</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>X</th>
            <th>Y</th>
            {/* <th>Raio</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default ObstaculoList;
