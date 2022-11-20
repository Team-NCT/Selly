<img src="https://raw.githubusercontent.com/ddullgi/image_sever/master/img/image-20221120142942632.png" width="20%"> 

### 🧩 https://nftselly.com/

PC환경으로 제작되었습니다. 반응형 페이지가 적용되어 있습니다.

<br>

### [Notion](https://www.notion.so/fc16ed20cdf14b7f995caa0b4bbdcfc1) / [Figma](https://www.figma.com/file/Mo8qTMO2kUpsynlfXo9X0v/Selly?node-id=81%3A2&t=Y8anMSNViwK7lu0a-0) / [UCC](https://www.youtube.com/watch?v=rSx5Uskfg9M)

### <br><br>

# 기업 연계 프로젝트 

> 미술품 공동 소유 리셀러 플랫폼 구현

### 누구나 쉽게 만나는 예술

### **NFT 민팅, 분할, 거래를 Selly에서 경험해보세요.**

<br><br>

# 일정 및 팀원 소개 (대전 1반 2팀)

### 📌 일정 : 2022.10.11 ~ 2022.11.21 (6주)

<br>

### 👨‍💻 팀원 소개 : 총 6명

- 박재경[FE]: 팀장
- 양지호[BE]: 부팀장
- 김지영[FE]: 팀원
- 박성배[BE/BC]: 팀원
- 이윤경[FE/BC]: 팀원
- 황상윤[FE]: 팀원

![https://raw.githubusercontent.com/ddullgi/image_sever/master/img/image-20221120211140238.png](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/image-20221120211140238.png)

<br><br>

# **⚡ 기술 스택**

| Frontend                   | Blockchain                  | Backend                   |
| -------------------------- | --------------------------- | ------------------------- |
| VisualStudio Code (1.73.1) | Visual Studio Code (1.73.1) | IntelliJ IDE              |
| React (18.2.0)             | Truffle                     | Java JDK (oracle 11.0.15) |
| Redux (3.7.0)              | Ganache / Goerli            | SpringBoot (2.7.4)        |
| Redux RTK (1.8.6)          |                             | Spring Data JPA           |
| StoryBook/react (6.5.13)   |                             | MariaDB (10.8.3)          |
| SASS (1.55.0)              |                             | NodeJS (16.16.0)          |
| postCSS (8.4.18)           |                             | Gradle (7.5.1)            |
| TypeScript (4.8.4)         |                             | Jenkins                   |
|                            |                             | Doker                     |

<br><br>

# 🏗️ 백엔드 아키텍쳐

![리드미 아키텍처 1](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/%EB%A6%AC%EB%93%9C%EB%AF%B8%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98%201.png)

<br><br>

# 📀ERD

![Copy_of_Copy_of_Copy_of_NFT_고유번호_존재자율_LG_B102](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/Copy_of_Copy_of_Copy_of_NFT_%EA%B3%A0%EC%9C%A0%EB%B2%88%ED%98%B8_%EC%A1%B4%EC%9E%AC%EC%9E%90%EC%9C%A8_LG_B102.png)

<br><br>

# 🎨 디자인 시스템

![https://raw.githubusercontent.com/ddullgi/image_sever/master/img/디자인 시스템.png](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/%EB%94%94%EC%9E%90%EC%9D%B8%20%EC%8B%9C%EC%8A%A4%ED%85%9C.png)

<br><br>

# 🔖 주요 기능

### ✅ Home

![home](https://user-images.githubusercontent.com/97648143/202916946-0e841e38-8715-44b2-b2f1-d6a896aa8d5e.gif)

#### NFT Article Top 10

- 가장 인기 있는 10개의 NFT 작품을 캐러셀로 보여준다.

#### NFT Artists Top 10

- 가장 인기 있는 10명의 작가를 Trend(NFT 거래 수)/Follow로 보여준다.

#### NFT Category

- NFT의 카테고리를 보여준다.
- 클릭 시 해당 카테고리의 Explore 탭으로 이동한다.

#### Selly Statistics

- Selly의 서비스 이용 현황을 보여준다.

<br>

### ✅ Create

![create](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/create.gif)

- 이미지와 제목, 설명 등을 작성하여 NFT를 민팅할 수 있다.
- create 버튼을 클릭하면 이미지가 ipfs 서버에 올라가고, ipfs 주소를 받아 메타데이터에 저장한 후 메타데이터 주소를 서버에 보내 민팅한다.

<br>

### ✅ Sell

![sell(1)](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/sell(1).gif)

- 사용자가 소유한 NFT를 Selly에 판매 등록할 수 있다.
- 원하는 NFT와 카테고리를 선택하고, 조각 이름, 조각 개수, 조각 당 가격을 입력하여 판매 등록한다.

<br>

![sell(2)](https://user-images.githubusercontent.com/97648143/202916612-4d50799e-a670-4a4f-9dd4-e5c69361a186.gif)

- 총 4단계의 과정을 거쳐 판매 등록이 이루어진다.
- 금고 생성하기: NFT의 조각을 생성하기 위해서 NFT를 보관할 금고를 생성한다.
- 금고 승인하기: 생성된 금고가 NFT를 보관할 수 있도록 승인한다.
- 조각 생성하기: 준비된 금고에 NFT를 옮기고 조각을 생성한다.
- 판매 등록하기: 생성된 조각을 Selly에 판매 등록한다.

<br>

### ✅ Explore

![explore](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/explore.gif)

- Explore는 카테고리 별로 판매 등록된 모든 NFT를 볼 수 있다.
- 정렬은 등록일 순, 등록일 역순, 낮은 가격 순, 높은 가격 순으로 이루어져 있다.
- 각각의 NFT 카드에는 현재 조각 시세와 전날 가격에 대한 가격 변동률을 확인할 수 있다.
- NFT를 클릭하면 해당 NFT의 상세 페이지로 이동한다.

<br>

### ✅ NFT detail

![NFT detail](https://user-images.githubusercontent.com/97648143/202916673-187839ad-fb69-4938-952f-97c69e8ffbad.gif)

- NFT의 제목, 이미지와 메타데이터 정보를 볼 수 있다.
- 현재 다른 유저가 판매 중인 조각이 있다면 조각을 구매할 수 있다.
- 현재 보유한 조각이 있다면 조각을 원하는 가격에 판매할 수 있다.
- 판매 현황에서 내가 올린 조각을 볼 수 있다.

<br>

### ✅ Profile

![profile](https://user-images.githubusercontent.com/97648143/202916694-ef5ed808-7897-49e6-9f66-e42ae0286f97.gif)

- 내 프로필에서 총 자산과 투자 원금, 총 손익, 수익률을 볼 수 있다.
- 나를 팔로우한 유저와 내가 팔로잉한 유저를 볼 수 있다.
- 내가 보유한 NFT 조각이나 민팅한 NFT, 판매 중이거나 소유하고 있는 NFT와 북마크한 NFT를 볼 수 있는 탭이 있다.
- 다른 유저의 프로필에서 좋아하는 유저를 팔로우 할 수 있다.

<br>

### ✅ Settings

![settings](https://raw.githubusercontent.com/ddullgi/image_sever/master/img/settings.gif)

- 닉네임, 자기소개, 프로필 이미지, 배너 이미지를 편집하여 개인정보를 수정 할 수 있다.
- 유효성 검사(비속어/닉네임 중복/최소 글자 수/특수 문자)를 실시하여 통과하지 못했을 경우 개인 정보를 수정 할 수 없다.
- 수정이 완료되면 내 프로필로 이동한다.

<br>

### ✅ 반응형

<img src="https://raw.githubusercontent.com/ddullgi/image_sever/master/img/Frame%20786.png" width="80%">

- 375 * 667 사이즈까지 반응형을 구현 하였다.

<br>

# 📖 문서

| Docs          | Link                                                         |
| ------------- | ------------------------------------------------------------ |
| 기업 명세서   | [링크](https://evanescent-tuba-146.notion.site/131c5f7e6bae4e0ca4ef7e245511d3e7) |
| 기능 명세서   | [링크](https://docs.google.com/spreadsheets/d/1_SBIMhLprTB1zuV4mVKE8y8vJX7ZYL8_qYW8jfl_krY/edit#gid=0) |
| 포팅 매뉴얼   | [링크](exec/1-포팅-매뉴얼.pdf)                               |
| QA            | [링크](https://docs.google.com/spreadsheets/d/1j5oia50SrAEjyZ9FIu2-NT7X_BzglaJicKpXCyFR9bY/edit#gid=0) |
| 1차 발표자료  | [링크](https://docs.google.com/presentation/d/1NU1ys-CiT04A-GmNtNMFf02wRTPSCrK6X8DeYlbpl_o/edit#slide=id.p) |
| 중간 발표자료 | [링크](https://docs.google.com/presentation/d/1G03xeKFMjTS24lHRxonMq3IhktJVDfIqOtXFE4mbMSQ/edit#slide=id.p) |
| 최종 발표자료 | [링크](exec/최종-발표-자료.pdf)                              |
| 시연 시나리오 | [링크](exec/3-시연시나리오.md)                               |

