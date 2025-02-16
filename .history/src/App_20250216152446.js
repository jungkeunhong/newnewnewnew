import React, { useEffect } from 'react';
import SkinAnalysisApp from './components/SkinAnalysisApp';
import Analytics from './utils/analytics';

function App() {
  useEffect(() => {
    // 앱 시작 시 익명 사용자 식별
    Analytics.identifyUser();
  }, []);

  return (
    <div className="App">
      <SkinAnalysisApp />
    </div>
  );
}

export default App; 