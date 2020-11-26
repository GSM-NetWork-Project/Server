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

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/getUser', selectUserRouter);
app.use('/api/getQuestion', selectQuestionRouter);
app.use('/api/getQuestionComment', selectQuestionCommentRouter);
app.use('/api/getQuestionVote', selectQuestionVoteRouter);
app.use('/api/getAnswer', selectAnswerRouter);
app.use('/api/getAnswerComment', selectAnswerCommentRouter);
app.use('/api/getAnswerVote', selectAnswerVoteRouter);

app.use('/api/createUser', insertUserRouter);
app.use('/api/createQuestion', insertQuestionRouter);
app.use('/api/createQuestionComment', insertQuestionCommentRouter);
app.use('/api/createQuestionVote', insertQuestionVoteRouter);
app.use('/api/createAnswer', insertAnswerRouter);
app.use('/api/createAnswerComment', insertAnswerCommentRouter);
app.use('/api/createAnswerVote', insertAnswerVoteRouter);

app.use('/api/modifyUser', updateUserRouter);
app.use('/api/modifyQuestion', updateQuestionRouter);
app.use('/api/modifyQuestionComment', updateQuestionCommentRouter);
app.use('/api/modifyQuestionVote', updateQuestionVoteRouter);
app.use('/api/modifyAnswer', updateAnswerRouter);
app.use('/api/modifyAnswerComment', updateAnswerCommentRouter);
app.use('/api/modifyAnswerVote', updateAnswerVoteRouter);

app.use('/api/removeUser', deleteUserRouter);
app.use('/api/removeQuestion', deleteQuestionRouter);
app.use('/api/removeQuestionComment', deleteQuestionCommentRouter);
app.use('/api/removeQuestionVote', deleteQuestionVoteRouter);
app.use('/api/removeAnswer', deleteAnswerRouter);
app.use('/api/removeAnswerComment', deleteAnswerCommentRouter);
app.use('/api/removeAnswerVote', deleteAnswerVoteRouter);

port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});