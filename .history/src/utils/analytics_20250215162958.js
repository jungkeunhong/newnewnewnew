import mixpanel from 'mixpanel-browser';

// Mixpanel 초기화
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV !== 'production',
  track_pageview: true,
  persistence: 'localStorage',
  autocapture: true
});

// 이벤트 추적을 위한 헬퍼 함수들
export const Analytics = {
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  
  identify: (id) => {
    mixpanel.identify(id);
  },
  
  setPeople: (props) => {
    mixpanel.people.set(props);
  },
  
  pageView: (pageName) => {
    mixpanel.track('Page View', { pageName });
  }
};

export default Analytics; 