const Problem = require('./models/Problem');
const TestProblem = require('./models/TestProblem');
const Test = require('./models/Test');
const User = require('./models/User');
const Attempt = require('./models/Attempt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tryouteditor@gmail.com',
    pass: 'tryout@123',
  },
});

let mailOptions = {
  from: 'tryouteditor@gmail.com',
  to: '',
  subject: 'Test from Sourcefuse Technologies',
  text: '',
};
async function addNewProblem(problem) {
  const res = await Problem.query().insert({
    problemName: problem.problemName,
    description: problem.description,
    problemTests: JSON.stringify(problem.problemTests),
    difficultyLevel: problem.difficultyLevel,
    email: problem.email,
  });

  return {
    success: true,
    message: 'Problem Added Successfully',
    problems: getAllProblems(),
  };
}

async function deleteProblem(id) {
  console.log('delete problem');
  const deleteTest = await TestProblem.query()
    .delete()
    .where('p_id', parseInt(id));

  await Problem.query().deleteById(parseInt(id));

  return getAllProblems();
}

async function updateProblem(id, problem) {
  const updatedProblem = await Problem.query().patchAndFetchById(parseInt(id), {
    problemName: problem.problemName,
    description: problem.description,
    problemTests: JSON.stringify(problem.problemTests),
    difficultyLevel: problem.difficultyLevel,
  });

  return {
    success: true,
    message: 'Problem updated Successfully',
    problem: problemReducer(updatedProblem),
  };
}
async function addNewTest(test) {
  console.log(test);
  const res = await Test.query().insert({
    testName: test.testName,
    difficultyLevel: test.difficultyLevel,
    email: test.email,
  });
  console.log(res.id);
  test.problems.forEach((ele) => {
    addTestProblem({ t_id: res.id, p_id: parseInt(ele) });
  });

  return {
    success: true,
    message: 'Test Added Successfully',
    tests: getAllTests(),
  };
}
async function deleteTest(id) {
  await TestProblem.query().delete().where('t_id', parseInt(id));

  await Test.query().deleteById(parseInt(id));
  return getAllTests();
}
async function updateTest(id, test) {
  console.log(id, test);
  const updatedTest = await Test.query().patchAndFetchById(parseInt(id), {
    testName: test.testName,
    difficultyLevel: test.difficultyLevel,
  });

  await TestProblem.query().delete().where('t_id', parseInt(id));
  test.problems.forEach((ele) => {
    addTestProblem({ t_id: parseInt(id), p_id: parseInt(ele) });
  });

  return {
    success: true,
    message: 'Test updated Successfully',
    test: testReducer(updatedTest),
  };
}
async function addNewUser(user) {
  const res = await User.query().insert({
    email: user.email,
    name: user.name,
    collegeName: user.collegeName,
  });
  return {
    success: true,
    message: 'User Added Successfully',
    user: res
  };
}

async function addTestProblem(testProblem) {
  const res = await TestProblem.query().insert({
    t_id: testProblem.t_id,
    p_id: testProblem.p_id,
  });
  const test = getTestById(testProblem.t_id);
  return {
    success: true,
    message: 'Problem added successfully',
    test: test,
  };
}
async function problemReducer(prob) {
  return {
    id: prob.id,
    problemName: prob.problemName,
    description: prob.description,
    problemTests: prob.problemTests,
    difficultyLevel: prob.difficultyLevel,
    createdAt: prob.createdAt,
    email: prob.email,
  };
}
async function testReducer(test) {
  const problem = await Problem.query().where(
    'id',
    'IN',
    TestProblem.query().select('p_id').where('t_id', test.id)
  );
  return {
    id: test.id,
    testName: test.testName,
    difficultyLevel: test.difficultyLevel,
    email: test.email,
    createdAt: test.createdAt,
    problems: problem.map((prob) => {
      return problemReducer(prob);
    }),
  };
}

async function getAllProblems() {
  const res = await Problem.query();
  return res.map((problem) => {
    return problemReducer(problem);
  });
}

async function getProblemById(id) {
  const res = await Problem.query().findById(id);
  console.log(res);
  return problemReducer(res);
}

async function getAllTests() {
  const res = await Test.query();
  return res.map((test) => {
    return testReducer(test);
  });
}

async function getTestsByAuthor(email) {
  const res = await Test.query().where('email', email);
  return res.map((test) => {
    return testReducer(test);
  });
}

async function getTestById(id) {
  const res = await Test.query().where('id', id);
  return testReducer(res[0]);
}

async function getProblemsByAuthor(email) {
  const res = await Problem.query().where('email', email);
  return res.map((problem) => {
    return problemReducer(problem);
  });
}

function getToken(id) {
  const token = jwt.sign({ testId: id }, 'helloo', {
    expiresIn: 60 * 60,
  });
  return { token: token };
}

function getTestByToken(token) {
  const decode = jwt.decode(token);
  console.log(decode);
  return getTestById(decode.testId);
}

function sendMail(mailDetails) {
  console.log(mailDetails);
  mailOptions.text = mailDetails.mailBody;
  mailOptions.to = mailDetails.email;
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(('Email Sent: ', info));
      return {
        success: true,
        message: 'mail sent successfully',
      };
    }
  });
}

async function addNewAttempt(data) {
  const res = await Attempt.query().insert({
    u_id: parseInt(data.u_id),
    t_id: parseInt(data.t_id),
    solutions: data.solutions
  });
  console.log(res);
  return {
    success: true,
    message: 'Attempt successfully added',
  };
}

module.exports = {
  addNewAttempt,
  getProblemById,
  getAllProblems,
  getProblemsByAuthor,
  addNewProblem,
  deleteProblem,
  updateProblem,
  getTestById,
  getAllTests,
  getTestsByAuthor,
  addNewTest,
  deleteTest,
  updateTest,
  addTestProblem,
  getTestByToken,
  getToken,
  sendMail,
  addNewUser,
};
