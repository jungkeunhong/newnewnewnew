import mixpanel from 'mixpanel-browser';

// Mixpanel 초기화
mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV !== 'production',
  track_pageview: true,
  persistence: 'localStorage',
  autocapture: true
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

// 익명 사용자 식별 및 기본 정보 설정
export const identifyUser = () => {
    const userId = generateAnonymousId();
    mixpanel.identify(userId);
    mixpanel.people.set({
        $name: "Anonymous User",
        $email: "anonymous@asentica.com",
        $created: new Date().toISOString(),
        SurveyCompleted: false
    });
    return userId;
};

// 퀴즈/설문 완료 이벤트 트래킹
export const trackQuizCompletion = (quizResults) => {
    const userId = generateAnonymousId();
    mixpanel.track("Quiz Completed", {
        distinct_id: userId,
        ...quizResults
    });
    
    // 사용자 프로필 업데이트
    mixpanel.people.set({
        SurveyCompleted: true,
        skin_concern: quizResults.concerns?.[0] || "Not specified",
        skin_type: quizResults.skinType || "Not specified",
        age_group: quizResults.ageGroup || "Not specified",
        ethnicity: quizResults.ethnicity || "Not specified"
    });
};

// 페이지 뷰 트래킹
export const trackPageView = (pageName) => {
    const userId = generateAnonymousId();
    mixpanel.track("Page View", {
        distinct_id: userId,
        page_name: pageName,
        timestamp: new Date().toISOString()
    });
};

// 사용자 액션 트래킹
export const trackUserAction = (actionName, actionParams = {}) => {
    const userId = generateAnonymousId();
    mixpanel.track(actionName, {
        distinct_id: userId,
        ...actionParams,
        timestamp: new Date().toISOString()
    });
};

// 트리트먼트 조회 트래킹
export const trackTreatmentView = (treatmentId, treatmentName) => {
    const userId = generateAnonymousId();
    mixpanel.track("Treatment View", {
        distinct_id: userId,
        treatment_id: treatmentId,
        treatment_name: treatmentName,
        timestamp: new Date().toISOString()
    });
};

export default {
    identifyUser,
    trackQuizCompletion,
    trackPageView,
    trackUserAction,
    trackTreatmentView
}; 