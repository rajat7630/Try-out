// Update with your config settings.
<<<<<<< HEAD
const DB_URL =
  'postgres://eqazfhypdfnyit:271d3c235b466496b57b5688f92f19bdda8d6aa411070b719c7e0b78a81c5af1@ec2-18-233-137-77.compute-1.amazonaws.com:5432/dd46afmd7o4p9i';
=======
// const DB_URL = 'postgres://eqazfhypdfnyit:271d3c235b466496b57b5688f92f19bdda8d6aa411070b719c7e0b78a81c5af1@ec2-18-233-137-77.compute-1.amazonaws.com:5432/dd46afmd7o4p9i';
>>>>>>> f6fa512... knexfile fixed
module.exports = {
  production: {
    client: 'postgresql',
    debug: true,
    connection: {
      user: 'eqazfhypdfnyit',
<<<<<<< HEAD
<<<<<<< HEAD
      password:
        '271d3c235b466496b57b5688f92f19bdda8d6aa411070b719c7e0b78a81c5af1',
=======
      password: '271d3c235b466496b57b5688f92f19bdda8d6aa411070b719c7e0b78a81c5af1',
>>>>>>> f6fa512... knexfile fixed
=======
      password:
        '271d3c235b466496b57b5688f92f19bdda8d6aa411070b719c7e0b78a81c5af1',
>>>>>>> dc9adb1... fix: pubnubClient.js
      host: 'ec2-18-233-137-77.compute-1.amazonaws.com',
      port: '5432',
      database: 'dd46afmd7o4p9i',
    },
    ssl: true,
  },

  development: {
    client: 'postgresql',
    connection: {
      user: 'postgres',
<<<<<<< HEAD
<<<<<<< HEAD
      password: 'postgres',
      host: 'localhost',
      port: '5432',
      database: 'try_out',
    },
  },
=======
      password: 'password',
=======
      password: 'postgres',
>>>>>>> dc9adb1... fix: pubnubClient.js
      host: 'localhost',
      port: '5432',
      database: 'try_out',
    },
  },
<<<<<<< HEAD


>>>>>>> f6fa512... knexfile fixed
=======
>>>>>>> dc9adb1... fix: pubnubClient.js
};
