// src/components/Dashboard.js
import React, { useState } from 'react';
import Icon from './Icon';
import CentralArea from './CentralArea';

import musicIcon from '../assets/icon1.png';
import videoIcon from '../assets/icon2.png';
import documentIcon from '../assets/icon3.png';
import textIcon from '../assets/icon4.png';
import TextImageAnimation from './TextImageAnimation';

function Dashboard() {
    const [processingComplete, setProcessingComplete] = useState(false);

    const handleProcessingComplete = () => {
        setProcessingComplete(true);
    };

    if (processingComplete) {
        return <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Processing Complete!</h1>
        </div>;
    }

    return (
        <div>
          <TextImageAnimation />
          <div style={{ position: 'relative', width: '100%', height: '500px', background: '#e5e5e5' }}>
              <Icon type="music" icon={musicIcon} style={{ position: 'absolute', left: '20%', top: '30%' }} />
              <Icon type="video" icon={videoIcon} style={{ position: 'absolute', left: '75%', top: '20%' }} />
              <Icon type="document" icon={documentIcon} style={{ position: 'absolute', left: '80%', top: '50%' }} />
              <Icon type="text" icon={textIcon} style={{ position: 'absolute', left: '25%', top: '60%' }} />
              <Icon type="text" icon={textIcon} style={{ position: 'absolute', left: '68%', top: '70%' }} />
              <CentralArea onProcessingComplete={handleProcessingComplete} />
          </div>
        </div>
    );
}

export default Dashboard;
