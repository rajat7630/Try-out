const BaseModel = require('./BaseModel');

class Problem extends BaseModel {
  static get tableName() {
    return 'problems';
  }

  static get relationMappings() {
    return {
      test: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Test',
        join: {
          from: 'problems.id',
          through: {
            from: 'test_problems.p_id',
            to: 'test_problems.t_id.',
          },
          to: 'tests.id',
        },
      },

      testProblem: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'TestProblem',
        join: {
          from: 'problems.id',
          to: 'testProblems.p_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        problemName: { type: 'string' },
        description: { type: 'string' },
        problemTests: { type: 'json' },
        createdAt: { type: 'timestamp' },
        email: { type: 'string' },
        timelimit: { type: 'string' },
        datalimit: { type: 'string' },
        tags: { type: 'string' },
        solution: { type: 'string' },
      },
    };
  }
}

module.exports = Problem;
