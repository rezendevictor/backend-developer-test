# Backend Developer Technical Assessment

# Technologies used on the development of this application

- Serverless
- Docker
- NodeJs
- ExpressJs
- Typescript

# How to run this application
Given that you already have docker installed in your machine, to run this application 
you will need the following steps:

## 0 - Prepare the ambient:
    >> npm install

## 1 - Run Docker
    >> npm run docker
There will be no data in the database, connect on the docker and run the ~/ddl/models.sql to create
the tables.

## 2 - Run the program itself
    >> npm run start
It's very important to notice that this project is using Node v20.11. Versions under v20 might not work.

## 3 - The bucket s3 feed:
You need to config your AWS environment to run it. If you have access to the bucket it will run. 


# Use of AI tools

Here is the links to my conversation with ChatGPT

https://chat.openai.com/share/45850ecc-9447-4d48-9b15-782b88fa8a6b
https://chat.openai.com/share/2fa5712d-1917-4040-90fd-7e16b9349936

My approach to utilizing ChatGPT is akin to employing a turbocharged search engine.
When conventional searches fail to yield the desired results, I turn to the AI for comprehensive insights. 
The code snippets it provides serve as invaluable foundations for comprehending processes and streamlining 
repetitive tasks.

