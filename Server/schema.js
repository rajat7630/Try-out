const { gql } = require('apollo-server');
const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Problem {
    id: ID!
    problemName: String
    description: String
    createdAt: String
    problemTests: JSON
    tags: String
    timelimit:Int
    datalimit: Int
    solution: String
    email: String
  }

  type Payload {
    token: String!
  }
  type ProblemScore {
    problem: Problem
    score: Int
  }
  type Test {
    id: ID!
    testName: String
    email: String
    createdAt: String
    problems: JSON
    tags: String
    difficultyLevel: String
    timelimit: Int
  }
  type User {
    id: ID!
    email: String
    name: String
    collegeName: String
  }
  type Attempt {
    id: ID!
    test:Test
    user: User
    solutions: JSON
    attemptTime: String
    score: String
  }
  type Query {
    getTest(token:String):Test
    getToken(id: ID!): Payload
    allProblems: [Problem]
    problemById(id: ID!): Problem
    allTests: [Test]
    testById(id: ID!): Test
    testsByAuthor(email: String): [Test]
    problemsByAuthor(email: String): [Problem]
    testByToken(token: String): Test
    getAttempt(id: ID): [Attempt]
    getAllAttempt: [Attempt]
    searchProblems(search: String, page: Int, pageSize: Int) : searchProblemOutput
    searchTests(search: String, page: Int, pageSize: Int):searchTestOutput
    searchAttempt(search: String, page: Int, pageSize: Int):searchAttemptOutput
  }
  type Mutation {
    checkProblemIfExists(problemName: String): checkProblemIfExistsOutput
    checkTestIfExists(testName: String): checkTestIfExistsOutput
    addProblem(data: addProblemInputs): addProblemOutput!
    deleteProblem(id: ID): [Problem]
    addAttempt(data: addAttemptInput): addAttemptOutput
    updateProblem(id: ID!, data: updateProblemInputs): updateProblemOutput!
    addTest(data: addTestInputs): addTestOutput!
    deleteTest(id: ID): deleteTestOutput
    updateTest(id: ID, data: updateTestInputs): updateTestOutput!
    addUser(data: addUserInputs): userDetail
    sendMail(linktime: String, test_id: String, email: String): mailSent
    addTestProblem(data: addTestProblemsInputs): testProblemOutput!
    updateAttempt(data: updateAttemptInput): updateAttemptOutput
    checkTimeLimit(data:String, timelimit: String):timeLimitOutput
  }
  type searchProblemOutput
  {
    problems: [Problem]
    total: Int
  }
  type searchTestOutput
  {
    tests: [Test]
    total: Int
  }
  type searchAttemptOutput
  {
    attempts: [Attempt]
    total: Int
  }
  type timeLimitOutput{
    success: Boolean
    message: String
  }
  type deleteTestOutput{
    success:Boolean
    message:String
  }
  input updateAttemptInput {
    id: ID
    u_id: ID
    solutions: JSON
  }
  type checkProblemIfExistsOutput {
    success: Boolean
    message: String
  }
  type checkTestIfExistsOutput {
    success: Boolean
    message: String
  }
  type updateAttemptOutput {
    success: Boolean
    message: String
  }
  input addProblemInputs {
    problemName: String
    description: String
    problemTests: JSON
    email: String
    timelimit: Int
    datalimit: Int
    solution: String
    tags: String
  }
  input addTestInputs {
    testName: String
    difficultyLevel: String
    email: String
    tags: String
    timelimit: Int
    problems: JSON
  }
  input addAttemptInput {
    u_id: ID
    t_id: ID
    solutions: JSON
  }
  type addAttemptOutput {
    message: String
    success: Boolean
    id: ID
  }
  input addUserInputs {
    name: String
    email: String
    testId: String
    collegeName: String
  }
  input addTestProblemsInputs {
    t_id: Int!
    p_id: Int!
  }
  input updateProblemInputs {
    problemName: String
    description: String
    problemTests: JSON
    timelimit: Int
    datalimit: Int
    solution: String
    tags: String
  }
  input updateTestInputs {
    testName: String
    difficultyLevel: String
    problems: JSON
    timelimit: Int
    tags: String
  }
  type addProblemOutput {
    success: Boolean!
    message: String
    problems: [Problem]
  }
  type addTestOutput {
    success: Boolean
    message: String
  }
  type userDetail {
    success: Boolean
    message: String
    token: String
  }
  type testProblemOutput {
    success: Boolean
    message: String
    test: Test!
  }
  type updateProblemOutput {
    success: Boolean
    message: String
  }
  type updateTestOutput {
    success: Boolean
    message: String
    test: Test!
  }
  type mailSent {
    success: Boolean
    message: String
  }
`;

module.exports = typeDefs;