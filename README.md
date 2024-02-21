# Backend Developer Technical Assessment
**Candidate:** Victor Rezende
**Linkedln:** https://www.linkedin.com/in/victor-rezende-38b3ab152/

# Applications Dependencies and Technologies
- **Docker**, used to run the application in a independent environment;
- **ExpressJs**, used as a main framework to develop the features;
- **NodeJs**, used as a runtime environment to build and launch the application;
- **Serverless**, used to configure the infraestructure of the system as a IAAS;
- **Typescript**, used as main languange to code.

# How to Run this Application
Given that you already have [the docker application](https://www.docker.com/) installed in your machine, to run this application you will need to execute the following steps:

## 0 - Prepare the Application Dependencies:

### 0.1 - Node Dependencies
    >> npm install
> It's very important to notice that this project is using Node v20.11. Versions under v20 might not work.

### 0.2 - AWS Dependencies
To be able to access the S3 Bucket at AWS, valid AWS credentials are needed. You need to have your AWS environment configured in order to access this feature on this application.

## 1 - Prepare the Environment
    >> npm run docker
There will be no data in the database, connect on the docker and run the `~/ddl/models.sql` to create
the tables.

## 2 - Run the Application
    >> npm run start


# Use of AI tools

Here is the links to my conversation with ChatGPT:

- https://chat.openai.com/share/45850ecc-9447-4d48-9b15-782b88fa8a6b
- https://chat.openai.com/share/2fa5712d-1917-4040-90fd-7e16b9349936

My approach to utilizing ChatGPT is akin to employing a improved search engine.
When conventional searches fail to yield the desired results, I turn to the AI for comprehensive and direct insights. The code snippets it provides serve as valuable foundations for comprehending processes and streamlining repetitive tasks.
