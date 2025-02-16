import React, { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import SkinAnalysisApp from './components/SkinAnalysisApp';

function App() {
  useEffect(() => {
    // Mixpanel 초기화 (YOUR_TOKEN은 실제 토큰으로 교체)
    mixpanel.init('YOUR_TOKEN', {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: true,
      persistence: 'localStorage'
    });
  }, []);

  return (
    <div className="App">
      <SkinAnalysisApp />
    </div>
  );
}

export default App; 