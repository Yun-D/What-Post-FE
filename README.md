<img width="773" alt="왓포스트 소개 이미지" src="https://user-images.githubusercontent.com/46706905/227791805-df765c03-903f-45d2-af57-fc8a50ce82be.png">

# 📝 컨텐츠 감상평 기록 웹 서비스, 왓포스트

> 내가 본 영화, 읽은 책의 감상평을 기록하고 공유하는 웹 서비스

<br/>

## 🎯 서비스 소개

**왓포스트**는 영화, 책을 간편하게 검색하고 감상평을 기록하는 서비스입니다. <br />
다양한 컨텐츠의 긴 포스트를 남길 수 있는 곳이 있었으면 하여 제작하게 되었습니다.
다른이의 느낌, 감상은 컨텐츠를 선택하는 이유가 되기도 하므로 접근성이 좋은 창구를 만들고 싶었습니다.

> ⚠️ 현재 백엔드 서버 미운영 중이라 일부 기능(로그인, 포스트 작성/조회)이 동작하지 않습니다.

<br/><br/><br/>

## ✨ 주요 기능

### 🔐 인증 (Auth)

- 로그인 시 수신한 JWT accessToken을 axios 공통 헤더(`Authorization`)에 설정하여 인증된 API 요청 처리
- 회원가입 시 아이디 중복 확인 API 호출 및 가입 성공 시 완료 페이지 이동 처리

### 🔍 컨텐츠 검색

- 카카오 책 검색, KMDb 영화 DB, 영화진흥위원회 박스오피스 등 복수 API 연동 및 데이터 가공
- 영화 검색 결과에서 장르·감독 정보 누락 및 성인물 항목을 클라이언트 측에서 필터링하여 데이터 품질 개선
- Redux Toolkit `createSlice`로 검색어, 결과 목록, 선택 항목, 페이지 상태를 전역 관리
- 더보기 버튼 클릭 시 결과를 concat하여 누적하는 방식으로 페이지네이션 구현

### ✏️ 포스트 작성

- 모달 내 API 검색 → 컨텐츠 선택 → CKEditor 5로 본문 작성 → 공개/비공개 설정 후 업로드

### 📚 마이페이지

- 나의 포스트 조회 및 수정

<br />

## 👩‍💻 팀원 소개

<table>
	<tbody>
		<tr>
			<td align="center"><a href="https://github.com/Yun-D"><img src="https://avatars.githubusercontent.com/u/46706905?s=400&v=4"width=100px;" alt="[FE] Yun-D"/><br /><sub><b>[FE] Yun-D </b></sub></a></td>
			<td align="center"><a href="https://github.com/bbaecco"><img src="https://avatars.githubusercontent.com/u/46706915?v=4"width=100px;" alt="[BE] bbaecco"/><br /><sub><b>[BE] bbaecco </b></sub></a></td>
		</tr>
	</tbody>
</table>

<br />

## 🛠️ 기술 스택

#### FE

<div>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
	<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
	<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
	<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
</div>

#### BE

<div>
	<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
	<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
	<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

<br />

## 💡 기술 선택 이유

### Redux + Redux Toolkit

검색 기능 구현 시 검색어, 결과 목록, 선택 항목, 페이지 상태 등 여러 컴포넌트가
공유해야 하는 상태가 많았습니다. props로 계속 전달하면 컴포넌트가 깊어질수록
관리가 복잡해지기 때문에 전역 상태 관리 라이브러리를 도입했습니다.
단방향 데이터 흐름으로 상태 변화를 추적하기 쉽고 레퍼런스가 풍부한 Redux를 선택했으며,
보일러플레이트 코드는 Redux Toolkit으로 줄였습니다.

### Styled-Components

컴포넌트와 스타일을 같은 파일에서 관리할 수 있어 관련 코드를 한눈에 파악하기
좋았습니다. props를 활용한 동적 스타일링과 기존 스타일을 상속해 변형하는 방식이
컴포넌트 재사용에 편리했습니다.

### CKEditor 5

WYSIWYG 에디터 라이브러리를 검토한 결과, 오랜 역사와 넓은 사용자층을 가진
CKEditor를 선택했습니다. 적용 후 사용법이 간단하고 UI도 깔끔하여 만족스러웠습니다.

### Axios

서버와의 REST API 통신에 사용했습니다. fetch 대비 응답 데이터 자동 파싱,
공통 헤더 설정 등 편의 기능이 풍부해 JWT 토큰 기반 인증 처리에 적합했습니다.

<br />

## 📂 프로젝트 구조

```
src/
├── APIs/            # API 호출 함수 및 키 관리
├── Assets/          # 이미지, 아이콘, 더미데이터
├── Components/      # 공통 컴포넌트 (레이아웃, 버튼, 모달 등)
├── Pages/           # 페이지 컴포넌트
│   ├── Auth/        # 로그인, 회원가입
│   ├── Home/
│   ├── MyPost/      # 마이페이지, 포스트 작성
│   ├── SearchBook/  # 도서 검색
│   └── SearchMovie/ # 영화 검색
├── Store/           # Redux store
├── Styles/          # 글로벌 스타일, 테마
└── Utils/           # 유틸 함수 (auth, post 등)
```

<br />

## ⚙️ 커밋 컨벤션

| 커밋 타입   |                                                                 |
| ----------- | --------------------------------------------------------------- |
|             |                                                                 |
| **기능**    |                                                                 |
| ✨Feat:     | 새로운 기능 추가                                                |
| 🐛Fix:      | 버그 수정                                                       |
| 🎨Design:   | UI 디자인 변경                                                  |
|             |                                                                 |
| **개선**    |                                                                 |
| 💄Style:    | 서식 지정(css 조건 추가…)                                       |
| ♻️Refactor: | 코드 리팩토링                                                   |
| 🗑️Remove:   | 코드 or 파일 삭제                                               |
|             |                                                                 |
| **기타**    |                                                                 |
| 🎉          | 개발환경 세팅, 첫번째 커밋                                      |
| 🚧Etc:      | 기타 작업 (주석 추가 or 변경…)                                  |
|             | 📁: 파일 또는 폴더명 업데이트                                   |
| 📝Docs:     | README 등 문서 추가 or 업데이트                                 |
| ✅Test:     | 테스트 코드 추가 or 업데이트                                    |
| 👷Chore:    | 잡다한 일, 빌드 작업 업데이트, 패키지 매니저 구성 등 (pom.xml…) |

**| 참고** [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)

<br/> <br/>

## 📸 스크린샷

<table>
  <tr>
    <td><img width="480" alt="Image" src="https://github.com/user-attachments/assets/a9cf4696-7503-4bbe-a6ae-f5cc9ace97c4" /></td>
    <td><img width="480" alt="Image" src="https://github.com/user-attachments/assets/13b7d230-ee13-4632-ae07-4ceca4d000c3" /></td>
  </tr>
  <tr>
    <td><img width="480" alt="Image" src="https://github.com/user-attachments/assets/30a065a2-8388-4cc1-8fd6-1c9e57f38c99" /></td>
    <td><img width="480" alt="Image" src="https://github.com/user-attachments/assets/753fe49d-ed92-4143-9057-a8b2f4be266d" /></td>
  </tr>
</table>
