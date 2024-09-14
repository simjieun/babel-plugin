# 바벨 플러그인: 자동 Sentry 로깅 & 콘솔 로그 제거

이 플러그인은 `try-catch` 문에서 자동으로 Sentry 에러 로깅을 추가하고, 모든 `console.log` 문을 제거합니다.

## 설치

1. Babel CLI 및 Core 설치:
   ```bash
   npm install @babel/cli @babel/core --save-dev
   ```

2. 플러그인 설치 후, `.babelrc` 또는 `babel.config.js`에 추가:
   ```json
   {
     "plugins": [
       "./path-to-your-plugin/auto-sentry-logging",
       "./path-to-your-plugin/remove-console-log"
     ]
   }
   ```

## 기능

### 1. 자동 Sentry 에러 로깅
`catch` 블록에 `Sentry.captureException(error)`가 없을 경우 자동으로 추가합니다.

### 2. 콘솔 로그 제거
모든 `console.log` 문을 제거합니다.

## 예시

```javascript
try {
  // 코드 실행
} catch (error) {
  console.error(error); // Sentry.captureException이 추가됨
}

console.log("이 코드는 제거됩니다."); // 제거됨
```
