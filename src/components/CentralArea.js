import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

function CentralArea({ onProcessingComplete }) {
    const [progress, setProgress] = useState(0);
    const [activeDot, setActiveDot] = useState(-1);
    const [isActive, setIsActive] = useState(false); // State to control animation activation
    const totalDots = 5;
    const dotCycleDuration = 300; // Each dot animates for 300ms
    const progressUpdateInterval = 30; // Progress is updated every 30ms

    const [{ isOver }, dropRef] = useDrop({
        accept: 'icon',
        drop: () => {
            if (!isActive) { // Start animations only if they haven't been started yet
                setActiveDot(0);
                setProgress(1);
                setIsActive(true);
            }
        },
    });

    useEffect(() => {
        if (isActive) {
            const progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress < 100) {
                        return prevProgress + 1;
                    } else {
                        clearInterval(progressInterval);
                        setIsActive(false); // Reset activity state to allow reactivation
                        setActiveDot(-1);
                        onProcessingComplete();
                        return prevProgress;
                    }
                });
            }, progressUpdateInterval);

            return () => clearInterval(progressInterval);
        }
    }, [isActive, onProcessingComplete]);

    useEffect(() => {
        if (isActive) {
            let currentDot = 0;
            const dotInterval = setInterval(() => {
                setActiveDot(currentDot);
                currentDot = (currentDot + 1) % totalDots;
            }, dotCycleDuration);

            return () => clearInterval(dotInterval);
        }
    }, [isActive]);

    const dotColors = ['purple', 'blue', 'green', 'orange', 'red'];

    return (
        <div ref={dropRef} style={{ width: 400, height: 200, border: '2px dashed black', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {!isActive ? (
                <div style={{ fontSize: '16px', color: 'grey' }}>Drag and drop here</div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        {Array.from({ length: totalDots }).map((_, index) => (
                            <div key={index} style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: dotColors[index],
                                transform: activeDot === index ? 'scale(1.5)' : 'scale(1)',
                                transition: `transform ${dotCycleDuration / 1000}s ease-in-out`,
                                margin: '0 2px'
                            }} />
                        ))}
                    </div>
                    Processing - {progress}%
                </>
            )}
        </div>
    );
}

export default CentralArea;
