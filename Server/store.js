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
    html: '',
};
async function addNewProblem(problem) {
    const res = await Problem.query().insert({
        problemName: problem.problemName,
        description: problem.description,
        problemTests: JSON.stringify(problem.problemTests),
        tags: problem.tags,
        solution: problem.solution,
        timelimit: problem.timelimit,
        datalimit: problem.datalimit,
        email: problem.email,
    });
    console.log(res);
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
        tags: problem.tags,
        solution: problem.solution,
        timelimit: problem.timelimit,
        datalimit: problem.datalimit,
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
        tags: test.tags,
        timelimit: parseInt(test.timelimit),
    });
    console.log(res.id);

    JSON.parse(test.problems).forEach((ele) => {
        addTestProblem({
            t_id: res.id,
            p_id: parseInt(ele.problem.id),
            score: parseInt(ele.score),
        });
    });

    return {
        success: true,
        message: 'Test Added Successfully',
        tests: getAllTests(),
    };
}
async function deleteTest(id) {
    try {
        await Test.query().delete().where('id', parseInt(id));
        await TestProblem.query().delete().where('t_id', parseInt(id));
        console.log('deleted');
        return {
            success: true,
            message: 'deleted',
        };
    } catch (er) {
        console.log(err);
    }
}
async function updateTest(id, test) {
    console.log(id, test);
    const updatedTest = await Test.query().patchAndFetchById(parseInt(id), {
        testName: test.testName,
        difficultyLevel: test.difficultyLevel,
        tags: test.tags,
        timelimit: parseInt(test.timelimit),
    });

    await TestProblem.query().delete().where('t_id', parseInt(id));
    JSON.parse(test.problems).forEach((ele) => {
        addTestProblem({
            t_id: parseInt(id),
            p_id: parseInt(ele.problem.id),
            score: parseInt(ele.score),
        });
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
    const res2 = await Test.query().where('id', parseInt(user.testId));
    const res1 = await getTestProblems(res2[0]);
    const res3 = await addNewAttempt({
        id: parseInt(user.testId),
        problems: res1,
    });
    const token = jwt.sign({ test_id: user.testId, user_id: res.id, attempt_id: res3.id },
        'helloo', {
            expiresIn: 60 * parseInt(res2[0].timelimit),
        }
    );
    return {
        success: true,
        message: 'User Added Successfully',
        token: token,
    };
}

async function addTestProblem(testProblem) {
    const res = await TestProblem.query().insert({
        t_id: testProblem.t_id,
        p_id: testProblem.p_id,
        score: testProblem.score,
    });
    const test = getTestById(testProblem.t_id);
    return {
        success: true,
        message: 'Problem added successfully',
        test: test,
    };
}

function problemReducer(prob) {
    return {
        id: prob.id,
        problemName: prob.problemName,
        description: prob.description,
        problemTests: prob.problemTests,
        createdAt: prob.createdAt,
        email: prob.email,
        datalimit: prob.datalimit,
        solution: prob.solution,
        tags: prob.tags,
        timelimit: prob.timelimit,
    };
}
async function getTestProblems(test) {
    const res = await TestProblem.query()
        .leftJoin('problems', 'testProblems.p_id', '=', 'problems.id')
        .where('testProblems.t_id', parseInt(test.id))
        .select('problems.*', 'testProblems.score');

    const problems = [
        ...res.map((prob) => {
            return { problem: prob, score: prob.score };
        }),
    ];
    return problems;
}
async function testReducer(test) {
    const problems = await getTestProblems(test);
    console.log('reached here');
    return {
        id: test.id,
        testName: test.testName,
        difficultyLevel: test.difficultyLevel,
        email: test.email,
        problems: JSON.stringify(problems),
        createdAt: test.createdAt,
        tags: test.tags,
        timelimit: test.timelimit,
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
    console.log(res);
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

async function getToken(id) {
    const res = await getTestById(parseInt(id));
    const attempt = await addNewAttempt(res);
    console.log(attempt);
    const token = jwt.sign({ testId: id, attemptId: attempt.id }, 'helloo', {
        expiresIn: 60 * 60,
    });
    return { token: token };
}

async function getTestByToken(token) {
    const decode = jwt.decode(token);
    console.log(decode, 'decode');
    const res2 = await Test.query().where('id', parseInt(decode.test_id));
    const res1 = await getTestProblems(res2[0]);
    console.log(res1);
    res2[0].problems = res1.map((ele) => {
        return {
            problemName: ele.problem.problemName,
            id: ele.problem.id,
            description: ele.problem.description,
        };
    });
    console.log(res2[0]);
    return res2[0];
}

function sendMail(mailDetails) {
    console.log(mailDetails);
    const token = jwt.sign({ testId: mailDetails.test_id, email: mailDetails.email },
        'helloo', {
            expiresIn: 60 * 60 * parseInt(mailDetails.linktime),
        }
    );
    let mailBody = `<h1>Sourcefuse Technoogies</h1><p>This link will be active for ${mailDetails.linktime} hours</p><span>To give test click <a href="http://localhost:5000/givetest/${token}">here</a></span>`;
    mailOptions.html = mailBody;
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
    let tt = JSON.stringify(data.problems);
    const res = await Attempt.query().insert({
        t_id: parseInt(data.id),
        solutions: JSON.stringify(data.problems),
    });

    return {
        success: true,
        message: 'Attempt successfully added',
        id: res.id,
    };
}

async function updateAttempt(data) {
    let res = await Attempt.query().where('id', parseInt(data.id));
    let rr = res[0].solutions;
    let tt = JSON.parse(data.solutions);
    console.log(rr);
    console.log(tt);
    let score = 0;
    rr.map((ele, index) => {
        let result = eval(
            `${tt[index].solution} solution(JSON.parse(${ele.problem.problemTests}))`
        );
        let originalResult = eval(
            `${ele.problem.solution} solution(JSON.parse(${ele.problem.problemTests}))`
        );
        console.log(result, 'result', 'original', originalResult);
        if (result === originalResult) {
            score += parseInt(ele.score);
        }
        return {...ele, userSolution: tt[index].solution };
    });
    let res2 = await Attempt.query().patchAndFetchById(parseInt(data.id), {
        u_id: parseInt(data.u_id),
        solutions: JSON.stringify(rr),
        Score: score,
    });
    console.log(res2);
    return {
        success: true,
        message: 'Attempt updated',
    };
}

async function attemptReducer(attempt) {
    const user = await User.query().where('id', parseInt(attempt.u_id));
    const test = await Test.query().where('id', parseInt(attempt.t_id));
    console.log(user[0].id);
    console.log(test);
    return {
        id: attempt.id,
        user: {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            collegeName: user[0].collegeName,
        },
        test: testReducer(test[0]),
        solutions: attempt.solutions,
        attemptTime: attempt.attemptTime,
        score: attempt.Score,
    };
}

async function getAttempt(id) {
    const res = await Attempt.query().where('t_id', parseInt(id));
    console.log(res);
    return res.map((attempt) => {
        return attemptReducer(attempt);
    });
}

async function getAllAttempt() {
    const res = await Attempt.query();
    console.log(res);
    return res.map((attempt) => {
        return attemptReducer(attempt);
    });
}

async function checkProblemIfExists(problemName) {
    console.log(problemName);
    const res = await Problem.query().where('problemName', problemName);
    console.log(res);
    if (res.length === 0) {
        return {
            success: false,
            message: 'Problem Name do not exist',
        };
    }
    return {
        success: true,
        message: 'Problem Name exist',
    };
}
async function checkTestIfExists(testName) {
    console.log(testName);
    const res = await Test.query().where('testName', testName);
    console.log(res);
    if (res.length === 0) {
        return {
            success: false,
            message: 'Test Name do not exist',
        };
    }
    return {
        success: true,
        message: 'Test Name exist',
    };
}
module.exports = {
    checkTestIfExists,
    checkProblemIfExists,
    getAttempt,
    getAllAttempt,
    updateAttempt,
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