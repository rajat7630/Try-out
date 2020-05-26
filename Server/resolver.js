/* eslint-disable no-unused-vars */
const store = require('./store.js');

module.exports = {
    Query: {
        getTest: (_, { token }) => store.getTestByToken(token),
        getToken: (_, { id }) => store.getToken(id),
        allProblems: () => store.getAllProblems(),
        problemById: (_, { id }) => store.getProblemById(id),
        allTests: () => store.getAllTests(),
        testByToken: (_, { token }) => store.getTestByToken(token),
        testById: (_, { id }) => store.getTestById(id),
        testsByAuthor: (_, { email }) => store.getTestsByAuthor(email),
        problemsByAuthor: (_, { email }) => store.getProblemsByAuthor(email),
        getAttempt: (_, { id }) => store.getAttempt(id),
        getAllAttempt: () => store.getAllAttempt(),
        searchProblems: (_, { search, page = 1, pageSize = 15 }) => store.getSearchProblems(search, page, pageSize),
        searchTests: (_, { search }) => store.getSearchTests(search),
        searchAttempt: (_, { search }) => store.getSearchAttempt(search),
    },
    Mutation: {
        checkTestIfExists: (_, { testName }) => store.checkTestIfExists(testName),
        checkProblemIfExists: (_, { problemName }) =>
            store.checkProblemIfExists(problemName),
        addAttempt: (_, { data }) => store.addNewAttempt(data),
        addProblem: (parent, { data }, ctx, info) => store.addNewProblem(data),
        deleteProblem: (parent, { id }, ctx, info) => store.deleteProblem(id),
        updateProblem: (parent, { id, data }, ctx, info) =>
            store.updateProblem(id, data),
        addTest: (parent, { data }, ctx, info) => store.addNewTest(data),
        deleteTest: (parent, { id }, ctx, info) => store.deleteTest(id),
        updateTest: (parent, { id, data }, ctx, info) => store.updateTest(id, data),
        addUser: (parent, { data }, ctx, info) => store.addNewUser(data),
        addTestProblem: (parent, { data }, ctx, info) => store.addTestProblem(data),
        sendMail: (_, mailDetails) => store.sendMail(mailDetails),
        updateAttempt: (_, { data }) => store.updateAttempt(data),
        checkTimeLimit: (_, { data, timelimit }) => store.checkTimeLimit(data, timelimit),
    },
};