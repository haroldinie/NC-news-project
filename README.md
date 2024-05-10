# Northcoders News API

Instructions on how to create environment variables to run locally and install dependencies.

1. Please clone https://github.com/haroldinie/NC-news-project.git
2. create a .env.development file with the contents: PGDATABASE=nc_news
3. create a .env.test file with the contents: PGDATABASE=nc_news_test
4. run: npm install
5. run: npm run setup-dbs
6. run: npm run seed


Minimum versions needed to run:
- Node - v20.12.1. 
- Postgres - ^8.7.3


To run the tests use: npm run test app.test.js


URL for hosted version - https://h-nc-news-project.onrender.com/api/articles

