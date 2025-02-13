# Asentica - AI 기반 피부 분석 및 의사 매칭 서비스

Asentica는 AI 기술을 활용하여 사용자의 피부를 분석하고, 적합한 의사와 매칭해주는 서비스입니다.

## 주요 기능

- 🔍 AI 피부 분석
  - 사진 업로드를 통한 피부 상태 분석
  - 6가지 주요 지표 측정 (수분, 탄력, 여드름, 피부결, 모공, 색소)
  - 상세한 분석 리포트 제공

- 👩‍⚕️ 맞춤형 의사 매칭
  - 피부 상태에 따른 최적의 의사 추천
  - 상세한 의사 프로필 정보 제공
  - 실시간 예약 시스템

- 📊 개인화된 피부 관리
  - 맞춤형 제품 추천
  - 피부 변화 트래킹
  - 상세한 치료 정보 제공

## 기술 스택

- React.js
- Firebase (Authentication, Realtime Database)
- Framer Motion
- Tailwind CSS
- Google Maps API

## 시작하기

1. 저장소 클론
```bash
git clone https://github.com/yourusername/asentica.git
cd asentica
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. 개발 서버 실행
```bash
npm start
```

## 프로젝트 구조

```
src/
  ├── components/        # 리액트 컴포넌트
  ├── assets/           # 이미지, 폰트 등 정적 파일
  ├── styles/           # CSS 파일
  └── utils/            # 유틸리티 함수
```

## 라이선스

MIT License 