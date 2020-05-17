import { writable, derived } from 'svelte/store';
export const testStore = writable({
  testName: '',
  timelimit: '',
  problems: '[]',
  difficultyLevel: '',
  email: 'Sample@gmail.com',
  tags: '',
});
