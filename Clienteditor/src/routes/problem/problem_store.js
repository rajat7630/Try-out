import { writable, derived } from 'svelte/store';
export const problemStore = writable({
  problemName: '',
  timelimit: '',
  datalimit: '',
  solution: 'function solution([...args])',
  problemTests: '',
  tags: '',
  description: '',
  email: 'Sample@gmail.com',
});
