# 🌤️ WeatherPro SaaS - Professional Weather Dashboard

전세계 날씨를 한눈에 볼 수 있는 전문적인 웨더 SaaS 플랫폼입니다. 인터랙티브 세계지도와 실시간 날씨 데이터를 제공합니다.

## ✨ 주요 기능

- 🌍 **전세계 커버리지**: 200개 이상의 국가와 지역
- 🗺️ **인터랙티브 세계지도**: Leaflet.js 기반 실시간 지도
- ⚡ **실시간 업데이트**: 1분마다 업데이트되는 날씨 정보
- 📱 **모바일 친화적**: 반응형 디자인으로 모든 디바이스 지원
- 🔍 **스마트 검색**: 도시명, 국가명으로 빠른 검색
- 📊 **상세한 날씨 정보**: 온도, 습도, 풍속, 기압, 가시거리
- 📅 **5일 예보**: AI 기반 정확한 날씨 예보
- 🎨 **세련된 UI/UX**: Framer Motion 애니메이션과 Glass Morphism

## 🚀 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Leaflet.js** (지도)
- **React Query** (데이터 관리)
- **Zustand** (상태 관리)
- **Lucide React** (아이콘)

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** (데이터베이스)
- **Redis** (캐싱)
- **JWT** (인증)
- **Rate Limiting** (보안)

### 배포
- **Railway** (Frontend + Backend)
- **PostgreSQL** (Railway Database)

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/weatherpro-saas.git
cd weatherpro-saas
```

### 2. 의존성 설치
```bash
# 루트 의존성 설치
npm install

# 모든 의존성 설치 (프론트엔드 + 백엔드)
npm run install:all
```

### 3. 환경 변수 설정

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=your_postgresql_url

# Redis
REDIS_URL=your_redis_url

# JWT
JWT_SECRET=your_jwt_secret

# Weather API (OpenWeatherMap)
OPENWEATHER_API_KEY=your_openweather_api_key
```

### 4. 개발 서버 실행
```bash
# 프론트엔드 + 백엔드 동시 실행
npm run dev

# 또는 개별 실행
npm run dev:frontend  # Frontend (포트 3000)
npm run dev:backend   # Backend (포트 5000)
```

## 🗺️ 사용 방법

1. **지도에서 위치 선택**: 세계지도의 아무 곳이나 클릭
2. **주요 도시 클릭**: 서울, 도쿄, 뉴욕 등 주요 도시 마커 클릭
3. **검색으로 찾기**: 상단 검색창에 도시명 입력
4. **최근 검색**: 사이드바에서 최근 검색 기록 확인

## 🚀 Railway 배포

### 1. Railway 프로젝트 생성
```bash
# Railway CLI 설치
npm install -g @railway/cli

# 로그인
railway login

# 프로젝트 초기화
railway init
```

### 2. 환경 변수 설정
Railway 대시보드에서 다음 환경 변수들을 설정하세요:

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app
DATABASE_URL=your_railway_postgresql_url
REDIS_URL=your_railway_redis_url
JWT_SECRET=your_secure_jwt_secret
OPENWEATHER_API_KEY=your_openweather_api_key
```

### 3. 배포
```bash
# 배포
railway up

# 또는 GitHub 연동 후 자동 배포
```

## 📁 프로젝트 구조

```
weatherpro-saas/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # React 컴포넌트
│   │   ├── types/          # TypeScript 타입 정의
│   │   ├── store/          # Zustand 스토어
│   │   ├── api/            # API 클라이언트
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                  # Node.js 백엔드
│   ├── src/
│   │   ├── routes/         # API 라우트
│   │   ├── controllers/    # 컨트롤러
│   │   ├── models/         # 데이터 모델
│   │   ├── middleware/     # 미들웨어
│   │   └── ...
│   ├── package.json
│   └── ...
├── package.json             # 루트 패키지
├── railway.json            # Railway 설정
└── README.md
```

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
```bash
# 프론트엔드 컴포넌트 생성
cd frontend/src/components
touch NewComponent.tsx
```

### API 엔드포인트 추가
```bash
# 백엔드 라우트 생성
cd backend/src/routes
touch newRoute.ts
```

### 데이터베이스 마이그레이션
```bash
# PostgreSQL 마이그레이션 실행
cd backend
npm run migrate
```

## 🧪 테스트

```bash
# 백엔드 테스트
cd backend
npm test

# 프론트엔드 테스트
cd frontend
npm test
```

## 📊 성능 최적화

- **React Query**: 서버 상태 캐싱
- **Redis**: 세션 및 데이터 캐싱
- **Compression**: 응답 압축
- **Rate Limiting**: API 요청 제한
- **CDN**: 정적 자산 배포

## 🔒 보안

- **Helmet**: 보안 헤더 설정
- **CORS**: 크로스 오리진 요청 제어
- **Rate Limiting**: DDoS 방지
- **JWT**: 안전한 인증
- **Input Validation**: 입력 데이터 검증

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- **이메일**: contact@weatherpro.com
- **GitHub**: [@your-username](https://github.com/your-username)
- **웹사이트**: [WeatherPro](https://weatherpro-saas.railway.app)

## 🙏 감사의 말

- [OpenWeatherMap](https://openweathermap.org/) - 날씨 데이터 제공
- [Leaflet](https://leafletjs.com/) - 인터랙티브 지도
- [Railway](https://railway.app/) - 클라우드 배포 플랫폼

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
