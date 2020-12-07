const selectUserRouter = require('./routes/select/user.js');
const selectQuestionRouter = require('./routes/select/question.js');
const selectQuestionCommentRouter = require('./routes/select/questionComment.js');
const selectQuestionVoteRouter = require('./routes/select/questionVote.js');
const selectAnswerRouter = require('./routes/select/answer.js');
const selectAnswerCommentRouter = require('./routes/select/answerComment.js');
const selectAnswerVoteRouter = require('./routes/select/answerVote.js');

const insertUserRouter = require('./routes/insert/user.js');
const insertQuestionRouter = require('./routes/insert/question.js');
const insertQuestionCommentRouter = require('./routes/insert/questionComment.js');
const insertQuestionVoteRouter = require('./routes/insert/questionVote.js');
const insertAnswerRouter = require('./routes/insert/answer.js');
const insertAnswerCommentRouter = require('./routes/insert/answerComment.js');
const insertAnswerVoteRouter = require('./routes/insert/answerVote.js');

const updateUserRouter = require('./routes/update/user.js');
const updateQuestionRouter = require('./routes/update/question.js');
const updateQuestionCommentRouter = require('./routes/update/questionComment.js');
const updateQuestionVoteRouter = require('./routes/update/questionVote.js');
const updateAnswerRouter = require('./routes/update/answer.js');
const updateAnswerCommentRouter = require('./routes/update/answerComment.js');
const updateAnswerVoteRouter = require('./routes/update/answerVote.js');

const deleteUserRouter = require('./routes/delete/user.js');
const deleteQuestionRouter = require('./routes/delete/question.js');
const deleteQuestionCommentRouter = require('./routes/delete/questionComment.js');
const deleteQuestionVoteRouter = require('./routes/delete/questionVote.js');
const deleteAnswerRouter = require('./routes/delete/answer.js');
const deleteAnswerCommentRouter = require('./routes/delete/answerComment.js');
const deleteAnswerVoteRouter = require('./routes/delete/answerVote.js');

const checkSwearing = require('./routes/check/swearing.js');
const checkSimilarQuestion = require('./routes/check/similarQuestion.js');

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/get_user', selectUserRouter);
app.use('/api/get_question', selectQuestionRouter);
app.use('/api/get_question_comment', selectQuestionCommentRouter);
app.use('/api/get_question_vote', selectQuestionVoteRouter);
app.use('/api/get_answer', selectAnswerRouter);
app.use('/api/get_answer_comment', selectAnswerCommentRouter);
app.use('/api/get_answer_vote', selectAnswerVoteRouter);

app.use('/api/add_user', insertUserRouter);
app.use('/api/add_question', insertQuestionRouter);
app.use('/api/add_question_comment', insertQuestionCommentRouter);
app.use('/api/add_question_vote', insertQuestionVoteRouter);
app.use('/api/add_answer', insertAnswerRouter);
app.use('/api/add_answer_comment', insertAnswerCommentRouter);
app.use('/api/add_answer_vote', insertAnswerVoteRouter);

app.use('/api/modify_user', updateUserRouter);
app.use('/api/modify_question', updateQuestionRouter);
app.use('/api/modify_question_comment', updateQuestionCommentRouter);
app.use('/api/modify_question_vote', updateQuestionVoteRouter);
app.use('/api/modify_answer', updateAnswerRouter);
app.use('/api/modify_answer_comment', updateAnswerCommentRouter);
app.use('/api/modify_answer_vote', updateAnswerVoteRouter);

app.use('/api/remove_user', deleteUserRouter);
app.use('/api/remove_question', deleteQuestionRouter);
app.use('/api/remove_question_comment', deleteQuestionCommentRouter);
app.use('/api/remove_question_vote', deleteQuestionVoteRouter);
app.use('/api/remove_answer', deleteAnswerRouter);
app.use('/api/remove_answer_comment', deleteAnswerCommentRouter);
app.use('/api/remove_answer_vote', deleteAnswerVoteRouter);

app.use('/api/check_swearing', checkSwearing);
app.use('/api/check_similar_question', checkSimilarQuestion);

port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});