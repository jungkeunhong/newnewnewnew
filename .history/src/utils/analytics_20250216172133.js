import mixpanel from 'mixpanel-browser';

// Mixpanel 초기화
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV !== 'production',
  track_pageview: true,
  persistence: 'localStorage',
  autocapture: false
});

// 익명 사용자 ID 생성
function generateAnonymousId() {
    let anonymousId = localStorage.getItem("anonymous_id");
    if (!anonymousId) {
        anonymousId = `anon_${crypto.randomUUID()}`; 
        localStorage.setItem("anonymous_id", anonymousId);
    }
    return anonymousId;
}

// 사용자 기본 속성 설정
function setUserProperties() {
    return {
        $os: navigator.platform,
        $browser: navigator.userAgent,
        $referrer: document.referrer,
        $referring_domain: document.referrer ? new URL(document.referrer).hostname : '',
        $device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
        $screen_height: window.screen.height,
        $screen_width: window.screen.width,
        $viewport_height: window.innerHeight,
        $viewport_width: window.innerWidth,
        $initial_time: new Date().toISOString(),
        $timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        $language: navigator.language,
        app_version: '1.0.0'
    };
}

// 기본 트래킹 함수
const track = (eventName, eventProperties = {}) => {
    const userId = generateAnonymousId();
    const userProperties = setUserProperties();
    
    // 이벤트 이름 표준화
    const standardizedEventName = eventName.replace(/\s+/g, '_').toLowerCase();
    
    mixpanel.track(standardizedEventName, {
        distinct_id: userId,
        ...eventProperties,
        ...userProperties,
        timestamp: new Date().toISOString(),
        session_id: localStorage.getItem('session_id') || `session_${Date.now()}`
    });
};

// 익명 사용자 식별 및 기본 정보 설정
const identifyUser = () => {
    const userId = generateAnonymousId();
    const userProperties = setUserProperties();
    
    mixpanel.identify(userId);
    mixpanel.people.set({
        $name: "Anonymous User",
        $email: `${userId}@anonymous.asentica.com`,
        $created: new Date().toISOString(),
        ...userProperties,
        user_type: 'anonymous',
        registration_method: 'anonymous',
        last_seen: new Date().toISOString(),
        SurveyCompleted: false
    });

    // 첫 방문 이벤트 트래킹
    if (!localStorage.getItem('first_visit')) {
        track('First Visit', userProperties);
        localStorage.setItem('first_visit', 'true');
    }

    return userId;
};

// 퀴즈/설문 완료 이벤트 트래킹
const trackQuizCompletion = (quizResults) => {
    const userId = generateAnonymousId();
    const userProperties = setUserProperties();
    
    track("Quiz Completed", {
        ...quizResults,
        completion_time: new Date().toISOString()
    });
    
    // 사용자 프로필 업데이트
    mixpanel.people.set({
        SurveyCompleted: true,
        skin_concern: quizResults.concerns?.[0] || "Not specified",
        skin_type: quizResults.skinType || "Not specified",
        age_group: quizResults.ageGroup || "Not specified",
        ethnicity: quizResults.ethnicity || "Not specified",
        last_quiz_completion: new Date().toISOString(),
        total_quizzes_completed: mixpanel.people.increment('total_quizzes_completed'),
        quiz_results: quizResults
    });

    // 사용자 세그먼트 업데이트
    mixpanel.people.set_once({
        first_quiz_completion: new Date().toISOString()
    });
};

// 페이지 뷰 트래킹
const trackPageView = (pageName) => {
    track("Page View", {
        page_name: pageName
    });

    // 세션 관리
    if (!localStorage.getItem('session_id')) {
        const sessionId = `session_${Date.now()}`;
        localStorage.setItem('session_id', sessionId);
        track('Session Start', {
            session_id: sessionId
        });
    }
};

// 사용자 액션 트래킹
const trackUserAction = (actionName, actionParams = {}) => {
    track(actionName, actionParams);

    // 사용자 활동 업데이트
    mixpanel.people.set({
        last_activity: new Date().toISOString(),
        last_action: actionName
    });
};

// 트리트먼트 조회 트래킹
const trackTreatmentView = (treatmentId, treatmentName) => {
    track("Treatment View", {
        treatment_id: treatmentId,
        treatment_name: treatmentName
    });

    // 관심 트리트먼트 업데이트
    mixpanel.people.union({
        viewed_treatments: [treatmentName]
    });
};

const Analytics = {
    track,
    identifyUser,
    trackQuizCompletion,
    trackPageView,
    trackUserAction,
    trackTreatmentView
};

export default Analytics; 