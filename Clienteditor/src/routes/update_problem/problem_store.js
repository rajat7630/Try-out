import { writable, derived } from 'svelte/store';
export const problemStore = writable({
  problemName: '',
  timelimit: '',
  datalimit: '',
  solution: '',
  problemTests: '',
  tags: '',
  description: '',
  email: 'Sample@gmail.com',
});
