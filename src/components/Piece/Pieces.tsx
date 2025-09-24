import { useRef, useState } from 'react';
import { gameInit } from '../../utils/GameInit';
import Piece from './Piece';

const copyPosition = (position: string[][]) => {
  let newPosition = new Array(8).fill('').map(() => new Array(8).fill(''));

  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length; j++) {
      newPosition[i][j] = position[i][j];
    }
  }

  return newPosition;
};

export default function Pieces() {
  const [position, setPosition] = useState(gameInit());
  const boardRef = useRef(null);

  const getCordonnate = (e): { x: number; y: number } => {
    const { top, left, width } = boardRef.current?.getBoundingClientRect();
    const size = width / 8;
    const x = Math.floor((e.clientX - left) / size);
    const y = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const onDrop = (e) => {
    const newPosition = copyPosition(position);
    const { x, y } = getCordonnate(e);
    const [p, i, j] = e.dataTransfer.getData('text').split(',');
    console.log(e.dataTransfer.getData('text').split(','));

    console.log(i, j);

    newPosition[i][j] = '';
    newPosition[x][y] = p;

    console.log(newPosition);
    console.log('x: ', x, 'y: ', y);

    setPosition(newPosition);
  };

  return (
    <div
      ref={boardRef}
      className="pieces"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {position.map((row, i) =>
        row.map((_, j) =>
          position[i][j] ? (
            <Piece key={`${i}-${j}`} i={i} j={j} piece={position[i][j]} />
          ) : null
        )
      )}
    </div>
  );
}
