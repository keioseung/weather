# WeatherPro SaaS - Codespaces 설치 및 Git 설정 가이드

## 🚀 Codespaces 환경에서 전체 설치 명령어

### 1. 프로젝트 초기화 및 의존성 설치

```bash
# 루트 디렉토리에서 모든 의존성 설치 (monorepo)
npm run install:all

# 또는 개별 설치:
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

### 2. 개발 서버 실행

```bash
# 프론트엔드와 백엔드 동시 실행 (새 터미널에서)
npm run dev

# 또는 개별 실행:
# 터미널 1 - 프론트엔드 (포트 3000)
npm run dev:frontend

# 터미널 2 - 백엔드 (포트 5000)
npm run dev:backend
```

### 3. 빌드 및 프로덕션 실행

```bash
# 프론트엔드 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

## 📦 Git 저장소 설정 및 관리

### 1. Git 초기화 및 첫 커밋

```bash
# Git 저장소 초기화
git init

# 모든 파일 스테이징
git add .

# 첫 커밋
git commit -m "🎉 Initial commit: WeatherPro SaaS with React + Node.js + Leaflet"

# 원격 저장소 연결 (GitHub/GitLab 등)
git remote add origin https://github.com/yourusername/weatherpro-saas.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 2. 개발 워크플로우

```bash
# 새 기능 브랜치 생성
git checkout -b feature/new-weather-feature

# 변경사항 커밋
git add .
git commit -m "✨ Add new weather feature"

# 브랜치 푸시
git push origin feature/new-weather-feature

# 메인 브랜치로 병합
git checkout main
git merge feature/new-weather-feature
git push origin main
```

### 3. 환경 변수 설정

```bash
# 백엔드 환경 변수 파일 생성
cd backend
cp .env.example .env

# 프론트엔드 환경 변수 파일 생성
cd ../frontend
cp .env.example .env
```

## 🔧 Codespaces 특화 설정

### 1. 포트 포워딩 설정

Codespaces에서 다음 포트들을 포워딩해야 합니다:
- **포트 3000**: React 프론트엔드
- **포트 5000**: Node.js 백엔드
- **포트 5432**: PostgreSQL (선택사항)

### 2. Codespaces 설정 파일

`.devcontainer/devcontainer.json` 파일을 생성하여 자동 설정:

```json
{
  "name": "WeatherPro SaaS",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "forwardPorts": [3000, 5000],
  "postCreateCommand": "npm run install:all",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-json"
      ]
    }
  }
}
```

## 🐳 Docker 지원 (선택사항)

### 1. Docker Compose 실행

```bash
# Docker Compose로 전체 스택 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 2. 개별 컨테이너 빌드

```bash
# 프론트엔드 빌드
docker build -t weatherpro-frontend ./frontend

# 백엔드 빌드
docker build -t weatherpro-backend ./backend
```

## 🚀 Railway 배포 준비

### 1. Railway CLI 설치 및 로그인

```bash
# Railway CLI 설치
npm install -g @railway/cli

# Railway 로그인
railway login

# 프로젝트 연결
railway link

# 환경 변수 설정
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=your_postgresql_url
railway variables set REDIS_URL=your_redis_url
railway variables set JWT_SECRET=your_jwt_secret
```

### 2. 배포

```bash
# 배포 실행
railway up

# 배포 상태 확인
railway status

# 로그 확인
railway logs
```

## 📋 전체 설치 체크리스트

### 필수 확인사항

- [ ] Node.js 18+ 설치 확인: `node --version`
- [ ] npm 설치 확인: `npm --version`
- [ ] Git 설치 확인: `git --version`
- [ ] 모든 의존성 설치 완료: `npm run install:all`
- [ ] 개발 서버 정상 실행: `npm run dev`
- [ ] 프론트엔드 접속 확인: `http://localhost:3000`
- [ ] 백엔드 API 접속 확인: `http://localhost:5000/health`
- [ ] Git 저장소 초기화 및 첫 커밋 완료
- [ ] 환경 변수 파일 설정 완료
- [ ] Railway 배포 준비 완료

### 테스트 명령어

```bash
# 프론트엔드 테스트
cd frontend && npm test

# 백엔드 테스트
cd backend && npm test

# 전체 테스트
npm test
```

## 🔍 문제 해결

### 일반적인 문제들

1. **포트 충돌**
   ```bash
   # 포트 사용 확인
   lsof -i :3000
   lsof -i :5000
   
   # 프로세스 종료
   kill -9 <PID>
   ```

2. **의존성 설치 실패**
   ```bash
   # 캐시 클리어
   npm cache clean --force
   
   # node_modules 삭제 후 재설치
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript 컴파일 에러**
   ```bash
   # TypeScript 재설치
   npm install -g typescript
   
   # 타입 체크
   npx tsc --noEmit
   ```

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Node.js 버전이 18+인지 확인
2. 모든 의존성이 올바르게 설치되었는지 확인
3. 환경 변수가 올바르게 설정되었는지 확인
4. 포트가 사용 가능한지 확인

---

**🎯 이제 WeatherPro SaaS가 완전히 설정되었습니다!**
