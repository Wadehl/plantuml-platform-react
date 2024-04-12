import React, { useState, useRef, useEffect } from 'react';

const Split = ({ rate, direction = 'horizontal', children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentRate, setRate] = useState(rate);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event) => {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const newRate =
        direction === 'horizontal'
          ? (event.clientX - containerRect.left) / containerRect.width
          : (event.clientY - containerRect.top) / containerRect.height;

      setRate(Math.max(0.25, Math.min(0.75, newRate)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setInitialPosition(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, direction, setRate]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialPosition(
      direction === 'horizontal' ? event.clientX : event.clientY
    );
  };

  const containerStyle = {
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%'
  };

  const splitLeftStyle = {
    position: 'relative',
    width: direction === 'horizontal' ? `${currentRate * 100}%` : '100%',
    height: direction === 'vertical' ? `${currentRate * 100}%` : '100%'
  };

  const splitRightStyle = {
    position: 'relative',
    flex: 1,
    overflow: 'auto'
  };

  const dividerStyle = {
    position: 'absolute',
    width: direction === 'horizontal' ? '8px' : '100%',
    height: direction === 'vertical' ? '8px' : '100%',
    zIndex: 1,
    backgroundColor: '#ccc',
    cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize'
  };

  const [child1, child2] = React.Children.toArray(children);
  const splitPosition =
    direction === 'horizontal' ? `${currentRate * 100}%` : '100%';
  const dividerPosition =
    direction === 'horizontal'
      ? { left: splitPosition, height: '100%', width: '8px' }
      : { top: splitPosition, height: '8px', width: '100%' };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div className="box-border p-4 overflow-auto" style={splitLeftStyle}>
        {child1}
      </div>
      <div
        style={{ ...dividerStyle, ...dividerPosition }}
        onMouseDown={handleMouseDown}
      />
      <div className="box-border p-4 overflow-auto" style={splitRightStyle}>
        {child2}
      </div>
    </div>
  );
};

export default Split;
