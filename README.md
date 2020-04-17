# Try-Out
Try-Out is a online recruiting platform which help companies to take online coding test and and analyze it for further recruitment process.

## Installation

Clone the project.

```bash
git clone https://github.com/sourcefuse/tryout.git
```
Downoad the dependencies

```node
pnpm install
```
Setting up docker for postgresQL and Localstack

```bash
sudo docker-compose up -d
```
Setting up knex File

```bash
knex migrate:latest
knex seed:run
```
Run the webApp

```node
pnpm run dev
```

## Features
1. All the sourcefuse members are in the admin panel by default. They can add new problems and test and can send test link to the required candidate via mail.
2. Admin can add existing problems to the test.
3. Admins can also change the existing test and problems.
4. Admin can also see the scores.
5. Students can reach to our support team using our inbuilt chat if they face any problem during the test

