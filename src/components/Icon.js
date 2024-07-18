// src/components/Icon.js
import React, {useEffect} from 'react';
import { useDrag } from 'react-dnd';

function Icon({ type, icon, style }) {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: 'icon',
    item: { type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`You dropped ${item.type} into ${dropResult.name}!`);
      }
    },
  });

  // Hide the default preview image
  useEffect(() => {
    preview(document.createElement('div')); // Creates an empty div as preview
  }, [preview]);

  return (
    <div ref={dragRef} style={{ ...style, opacity: isDragging ? 0 : 1 }}>
      <img src={icon} alt={type} style={{ width: 50, height: 50 }} />
    </div>
  );
}

export default Icon;
