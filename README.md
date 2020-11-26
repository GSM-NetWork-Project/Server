# DB 생성문
```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(16) NOT NULL,
  `join_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `title` text NOT NULL,
  `theme` text NOT NULL,
  `text` text NOT NULL,
  `is_solved` tinyint NOT NULL DEFAULT '0',
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_owner_id_idx` (`owner_id`),
  CONSTRAINT `question_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `text` text NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id_idx` (`question_id`),
  KEY `answer_owner_id_idx` (`owner_id`),
  CONSTRAINT `answer_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `question_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `text` text NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `comment_question_id_idx` (`question_id`),
  KEY `question_comment_owner_id_idx` (`owner_id`),
  CONSTRAINT `comment_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_comment_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `answer_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answer_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `text` text NOT NULL,
  `upload_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `answer_id_idx` (`answer_id`),
  KEY `answer_comment_owner_id_idx` (`owner_id`),
  CONSTRAINT `answer_comment_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `question_vote` (
  `question_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`owner_id`,`question_id`),
  KEY `vote_question_id_idx` (`question_id`),
  CONSTRAINT `question_vote_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vote_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `answer_vote` (
  `answer_id` int NOT NULL,
  `owner_id` int NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`answer_id`,`owner_id`),
  KEY `answer_vote_owner_id_idx` (`owner_id`),
  CONSTRAINT `answer_vote_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vote_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

# API 요청 방법

## 조회

### 유저 조회 

###### URL

    /api/get_user

###### 인자
- `id` 유저의 고유 id로, 가입한 순서에 해당
- `name` 닉네임
- `email` 가입한 이메일
- `password` 비밀번호
- `join_time` 가입 일시

###### 응답

인자값과 일치하는 모든 유저의 JSON 리스트
```javascript
[{
  "id": 1,
  "name": "정영우",
  "email": "zetafie125@gmail.com",
  "password": "1234",
  "join_time": "2020-11-25T15:00:00.000Z"
}, { ... }, ...]
```
### 질문 조회

###### URL

    /api/get_question

###### 인자
- `id` 질문의 고유 id로, 업로드한 순서에 해당
- `owner_id` 질문을 업로드한 사람의 id
- `title` 제목
- `theme` 주제
- `text` 본문
- `is_solved` 질문 해결 여부(미해결 0, 해결 1)
- `upload_time` 업로드 일시

###### 응답

인자값과 일치하는 모든 질문의 JSON 리스트
```javascript
[{
  "id"          : 1,
  "owner_id"    : 1,
  "title"       : "Node.js, MySQL 연결 중 오류",
  "theme"       : "프로그래밍",
  "text"        : "npm 프로젝트 실행 시 MODULE_NOT_FOUND라는 에러가...",
  "is_solved"   : 0,
  "upload_time" : "2020-11-25T15:00:00.000Z"
}, { ... }, ...]
```
### 답변 조회

###### URL

    /api/get_answer

###### 인자
- `id` 답변의 고유 id로, 업로드한 순서에 해당
- `question_id` 답변이 달린 질문의 id
- `owner_id` 답변을 업로드한 사람의 id
- `text` 본문
- `upload_time` 업로드 일시

###### 응답

인자값과 일치하는 모든 답변의 JSON 리스트
```javascript
[{
  "id"          : 1,
  "question_id" : 1,
  "owner_id"    : 2,
  "text"        : "그 오류는 모듈로 임포트 하려는 파일의 경로나 이름이 안 맞아서 생기는 것으로...",
  "upload_time" : "2020-11-25T15:00:00.000Z"
}, { ... }, ...]
```
### 질문 댓글 조회

###### URL

    /api/get_question_comment

###### 인자
- `id` 댓글의 고유 id로, 업로드한 순서에 해당
- `question_id` 댓글이 달린 질문의 id
- `owner_id` 댓글을 업로드한 사람의 id
- `text` 본문
- `upload_time` 업로드 일시

###### 응답

인자값과 일치하는 모든 질문 댓글의 JSON 리스트
```javascript
[{
  "id"          : 1,
  "question_id" : 1,
  "owner_id"    : 3,
  "text"        : "저도 궁금합니다.",
  "upload_time" : "2020-11-25T15:00:00.000Z"
}, { ... }, ...]
```
### 답변 댓글 조회

###### URL

    /api/get_answer_comment

###### 인자
- `id` 댓글의 고유 id로, 업로드한 순서에 해당
- `question_id` 댓글이 달린 답변의 id
- `owner_id` 댓글을 업로드한 사람의 id
- `text` 본문
- `upload_time` 업로드 일시

###### 응답

인자값과 일치하는 모든 답변 댓글의 JSON 리스트
```javascript
[{
  "id"          : 1,
  "answer_id"   : 1,
  "owner_id"    : 1,
  "text"        : "답변하신 내용이 도움이 되었습니다.",
  "upload_time" : "2020-11-25T15:00:00.000Z"
}, { ... }, ...]
```
### 질문 투표 조회

###### URL

    /api/get_question_vote

###### 인자
- `question_id` 투표한 질문의 id
- `owner_id` 투표한 사람의 id
- `type` 투표 종류(-1은 downvote, 1은 upvote)

###### 응답

인자값과 일치하는 모든 질문 투표의 JSON 리스트
```javascript
[{
  "question_id" : 1,
  "owner_id"    : 3,
  "type"        : 1,
}, { ... }, ...]
```
### 답변 투표 조회

###### URL

    /api/get_answer_vote

###### 인자
- `answer_id` 투표한 답변의 id
- `owner_id` 투표한 사람의 id
- `type` 투표 종류(-1은 downvote, 1은 upvote)

###### 응답

인자값과 일치하는 모든 답변 투표의 JSON 리스트
```javascript
[{
  "answer_id" : 1,
  "owner_id"  : 1,
  "type"      : 1,
}, { ... }, ...]
```
## 생성

###### 응답

성공 시 200(OK), 실패 시 500(Internal Server Error)

### 유저 생성 

###### URL

    /api/add_user

###### 인자
- `id` 
- `name` 필수
- `email` 필수
- `password` 필수
- `join_time`

### 질문 생성 

###### URL

    /api/add_question

###### 인자
- `id`
- `owner_id` 필수
- `title` 필수
- `theme` 필수
- `text` 필수
- `is_solved`
- `upload_time`

### 답변 생성 

###### URL

    /api/add_answer

###### 인자
- `id`
- `question_id` 필수
- `owner_id` 필수
- `text` 필수
- `upload_time`

### 질문 댓글 생성 

###### URL

    /api/add_question_comment

###### 인자
- `id`
- `question_id` 필수
- `owner_id` 필수
- `text` 필수
- `upload_time`

### 답변 댓글 생성 

###### URL

    /api/add_answer_comment

###### 인자
- `id`
- `answer_id` 필수
- `owner_id` 필수
- `text` 필수
- `upload_time`
###  질문 투표 생성 

###### URL

    /api/add_question_vote

###### 인자
- `question_id` 필수
- `owner_id` 필수
- `type` 필수

###  답변 투표 생성 

###### URL

    /api/add_answer_vote

###### 인자
- `answer_id` 필수
- `owner_id` 필수
- `type` 필수

## 수정

###### 인자
조회 시 인자와 동일하나
수정 조건에는 where_을,
수정 내용에는 set_을
각 인자 이름 앞에 붙일 것

예시: id가 1인 유저의 이름을 정영우로 변경 시 /api/modify_user?where_id=1&set_name='정영우'

###### 응답

성공 시 200(OK), 실패 시 500(Internal Server Error)

### 유저 수정

###### URL

    /api/modify_user

### 질문 수정

###### URL

    /api/modify_question

### 답변 수정

###### URL

    /api/modify_answer

### 질문 댓글 수정

###### URL

    /api/modify_question_comment

### 답변 댓글 수정

###### URL

    /api/modify_answer_comment

### 질문 투표 수정

###### URL

    /api/modify_question_vote

### 답변 투표 수정

###### URL

    /api/modify_answer_vote

## 삭제

###### 인자
조회 시 인자와 동일하나
인자 없이 삭제는 불가능

###### 응답

성공 시 200(OK), 실패 시 500(Internal Server Error)

### 유저 삭제

###### URL

    /api/delete_user

### 질문 삭제

###### URL

    /api/delete_answer

### 답변 삭제

###### URL

    /api/delete_answer

### 질문 댓글 삭제

###### URL

    /api/delete_question_comment

### 답변 댓글 삭제

###### URL

    /api/delete_answer_comment

### 질문 투표 삭제

###### URL

    /api/delete_question_vote

### 답변 투표 삭제

###### URL
    /api/delete_answer_vote
