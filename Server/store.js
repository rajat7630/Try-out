const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Problem = require('./models/Problem');
const TestProblem = require('./models/TestProblem');
const Test = require('./models/Test');
const User = require('./models/User');
const worker = require("./worker_file.js");
const Attempt = require('./models/Attempt');
const { ref, fn } = require('objection');
const { parentPort } = require("worker_threads");

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tryouteditor@gmail.com',
        pass: 'tryout@123',
    },
});

const mailOptions = {
    from: 'tryouteditor@gmail.com',
    to: '',
    subject: 'Test from Sourcefuse Technologies',
    text: '',
    html: '',
};

async function addNewTest(test) {
    const res = await Test.query().insert({
        testName: test.testName,
        difficultyLevel: test.difficultyLevel,
        email: test.email,
        tags: test.tags,
        timelimit: parseInt(test.timelimit),
    });

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
    await Attempt.query().delete().where('t_id', parseInt(id));
    await TestProblem.query().delete().where('t_id', parseInt(id));
    await Test.query().delete().where('id', parseInt(id));
    return {
        success: true,
        message: 'deleted',
    };
}
async function updateTest(id, test) {
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
    console.log(res);
    const res2 = await Test.query().where('id', parseInt(user.testId));
    const res1 = await getTestProblems(res2[0]);
    const res3 = await addNewAttempt({
        id: parseInt(user.testId),
        u_id: parseInt(res.id),
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
        token,
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
        test,
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
async function getTestProblems(test) {
    const res = await TestProblem.query()
        .leftJoin('problems', 'testProblems.p_id', '=', 'problems.id')
        .where('testProblems.t_id', parseInt(test.id))
        .select('problems.*', 'testProblems.score');
    console.log(res, "res");
    const problems = [
        ...res.map((prob) => ({ problem: prob, score: prob.score })),
    ];
    return problems;
}
async function testReducer(test) {
    const problems = await getTestProblems(test);
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
    return res.map((problem) => problemReducer(problem));
}

async function getSearchProblems(search, page, pageSize) {
    let query = Problem.query().select('problems.*');
    if (search) {
        query = await query.where(fn.lower(ref('problemName')), 'ilike', `%${(search.match(/\w+/gi) || []).join('%')}%`)
            .orderBy('createdAt', 'DESC')
            .page(page - 1, pageSize);
    } else {
        query = await query.orderBy('createdAt', 'DESC').page(page - 1, pageSize);
    }
    return query.results.map((problem) => problemReducer(problem));
}

async function getSearchTests(search, page, pageSize) {
    let query = Test.query().select('tests.*');
    if (search) {
        query = await query.where(fn.lower(ref('testName')), 'ilike', `%${(search.match(/\w+/gi) || []).join('%')}%`)
            .orderBy('createdAt', 'DESC')
            .page(page - 1, pageSize);
    } else {
        query = await query.orderBy('createdAt', 'DESC').page(page - 1, pageSize);
    }
    return query.results.map((test) => testReducer(test));
}

async function getSearchAttempt(search, page, pageSize) {
    var res;
    if (search) {
        res = await Attempt.query()
            .joinRelated('user')
            .where(fn.lower(ref('user.name')), 'ilike', `%${(search.match(/\w+/gi) || []).join('%')}%`)
            .orderBy('attemptTime', 'DESC')
            .page(page - 1, pageSize);
    } else {
        res = await Attempt.query().select('attempts.*').orderBy('attemptTime', 'DESC')
            .page(page - 1, pageSize);
    }
    return res.results.map((attempt) => attemptReducer(attempt));
}

async function deleteProblem(id) {
    await TestProblem.query().delete().where('p_id', parseInt(id));
    await Problem.query().deleteById(parseInt(id));
    return getAllProblems();
}

async function addNewProblem(problem) {
    await Problem.query().insert({
        problemName: problem.problemName,
        description: problem.description,
        problemTests: JSON.stringify(problem.problemTests),
        tags: problem.tags,
        solution: problem.solution,
        timelimit: problem.timelimit,
        datalimit: problem.datalimit,
        email: problem.email,
    });
    return {
        success: true,
        message: 'Problem Added Successfully',
        problems: getAllProblems(),
    };
}
async function getProblemById(id) {
    const res = await Problem.query().findById(id);
    return problemReducer(res);
}

async function getAllTests() {
    const res = await Test.query();
    return res.map((test) => testReducer(test));
}

async function getTestsByAuthor(email) {
    const res = await Test.query().where('email', email);
    return res.map((test) => testReducer(test));
}

async function getTestById(id) {
    const res = await Test.query().where('id', id);
    return testReducer(res[0]);
}

async function getProblemsByAuthor(email) {
    const res = await Problem.query().where('email', email);
    return res.map((problem) => problemReducer(problem));
}

async function getToken(id) {
    const res = await getTestById(parseInt(id));
    const attempt = await addNewAttempt(res);
    const token = jwt.sign({ testId: id, attemptId: attempt.id }, 'helloo', {
        expiresIn: 60 * 60,
    });
    return { token };
}

async function getTestByToken(token) {
    const decode = jwt.decode(token);
    const res2 = await Test.query().where('id', parseInt(decode.test_id));
    const res1 = await getTestProblems(res2[0]);
    res2[0].problems = res1.map((ele) => ({
        problemName: ele.problem.problemName,
        id: ele.problem.id,
        timelimit: ele.problem.timelimit,
        description: ele.problem.description,
    }));
    console.log(res2[0]);
    return res2[0];
}

function sendMail(mailDetails) {
    const token = jwt.sign({ testId: mailDetails.test_id, email: mailDetails.email },
        'helloo', {
            expiresIn: 60 * 60 * parseInt(mailDetails.linktime),
        }
    );
    const mailBody = `<h1>Sourcefuse Technologies</h1><p>This link will be active for ${mailDetails.linktime} hours</p><span>To give test click <a href="http://localhost:5000/givetest/${token}">here</a></span>`;
    mailOptions.html = mailBody;
    mailOptions.to = mailDetails.email;
    console.log(mailBody);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw error;
        } else {
            return {
                success: true,
                message: 'mail sent successfully',
            };
        }
    });
}

async function addNewAttempt(data) {
    const tt = JSON.stringify(data.problems);
    const res = await Attempt.query().insert({
        t_id: parseInt(data.id),
        solutions: JSON.stringify(data.problems),
        u_id: parseInt(data.u_id),
    });

    return {
        success: true,
        message: 'Attempt successfully added',
        id: res.id,
    };
}

async function updateAttempt(data) {
    const res = await Attempt.query().where('id', parseInt(data.id));
    const rr = res[0].solutions;
    const tt = JSON.parse(data.solutions);

    let score = 0;
    rr.map(async(ele, index) => {
        let ree = `${tt[index].solution} solution(JSON.parse(${ele.problem.problemTests}))`;
        await worker(ree, ele.problem.timelimit, (data) => {
            console.log(data);
            if (data === true) {
                const result = eval(
                    `${tt[index].solution} solution(JSON.parse(${ele.problem.problemTests}))`
                );
                const originalResult = eval(
                    `${ele.problem.solution} solution(JSON.parse(${ele.problem.problemTests}))`
                );
                console.log("result", result, "original", originalResult);
                if (result === originalResult) {
                    score += parseInt(ele.score);
                }
            }
        });
        return {...ele, userSolution: tt[index].solution };
    });
    const res2 = await Attempt.query().patchAndFetchById(parseInt(data.id), {
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
    console.log(attempt);
    const user = await User.query().where('id', parseInt(attempt.u_id));
    const test = await Test.query().where('id', parseInt(attempt.t_id));

    return {
        id: attempt.id,
        user: user[0],
        test: testReducer(test[0]),
        solutions: attempt.solutions,
        attemptTime: attempt.attemptTime,
        score: attempt.Score,
    };
}

async function getAttempt(id) {
    const res = await Attempt.query().where('t_id', parseInt(id));
    return res.map((attempt) => attemptReducer(attempt));
}

async function getAllAttempt() {
    const res = await Attempt.query();
    return res.map((attempt) => attemptReducer(attempt));
}

async function checkProblemIfExists(problemName) {
    const res = await Problem.query().where('problemName', problemName);
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
    const res = await Test.query().where('testName', testName);
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
async function checkTimeLimit(data, timelimit) {
    let status;
    await worker(data, timelimit, (check) => {
        status = check;
    });
    return {
        success: status,
        message: "proceed"
    }
}
module.exports = {
    checkTimeLimit,
    checkTestIfExists,
    checkProblemIfExists,
    getAttempt,
    updateAttempt,
    addNewAttempt,
    getProblemById,
    getAllProblems,
    getSearchProblems,
    getSearchTests,
    getSearchAttempt,
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
    getAllAttempt,
    sendMail,
    addNewUser,
};