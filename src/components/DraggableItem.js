// src/components/DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableItem({ id, type, icon, style }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}>
      <img src={icon} alt={type} style={{ width: 50, height: 50 }} />
    </div>
  );
}

export default DraggableItem;
