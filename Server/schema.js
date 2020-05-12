const { gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server');
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
    timelimit: String
    datalimit: String
    solution: String
    email: String
  }

  type Payload {
    token: String!
  }

  type Test {
    id: ID!
    testName: String
    difficultyLevel: String
    email: String
    createdAt: String
    problems: [Problem]
  }
  type User {
    id: ID!
    email: String
    name: String
    collegeName: String
  }
  type Attempt {
    id: ID!
    user: User
    t_id: ID!
    solutions: JSON
    attemptTime: String
    score: String
  }
  type Query {
    getToken(id: ID!): Payload
    allProblems: [Problem]
    problemById(id: ID!): Problem
    allTests: [Test]
    testById(id: ID!): Test
    testsByAuthor(email: String): [Test]
    problemsByAuthor(email: String): [Problem]
    testByToken(token: String): Test
    getAttempt(id: ID): [Attempt]
  }
  type Mutation {
    checkProblemIfExists(problemName: String): checkProblemIfExistsOutput
    addProblem(data: addProblemInputs): addProblemOutput!
    deleteProblem(id: ID): [Problem]
    addAttempt(data: addAttemptInput): addAttemptOutput
    updateProblem(id: ID!, data: updateProblemInputs): updateProblemOutput!
    addTest(data: addTestInputs): addTestOutput!
    deleteTest(id: ID): [Test]
    updateTest(id: ID, data: updateTestInputs): updateTestOutput!
    addUser(data: addUserInputs): userDetail
    sendMail(mailBody: String, email: String): mailSent
    addTestProblem(data: addTestProblemsInputs): testProblemOutput!
    updateAttempt(data: updateAttemptInput): updateAttemptOutput
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
  type updateAttemptOutput {
    success: Boolean
    message: String
  }
  input addProblemInputs {
    problemName: String
    description: String
    problemTests: JSON
    email: String
    timelimit: String
    datalimit: String
    solution: String
    tags: String
  }
  input addTestInputs {
    testName: String
    difficultyLevel: String
    email: String
    problems: [ID]
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
    timelimit: String
    datalimit: String
    solution: String
    tags: String
  }
  input updateTestInputs {
    testName: String
    difficultyLevel: String
    problems: [ID]
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
    user: User!
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
