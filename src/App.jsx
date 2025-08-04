import React from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiDatabricks,
  SiSqlite,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiMongoose,
  SiDocker,
  SiAwsamplify,
  SiVitest,
  SiJest,
  SiGraphql,
} from "react-icons/si";
import CodeSnippetPlayer from "./CodeSnippetsPlayer";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

const tabs = [
  {
    id: "typescript",
    label: "TypeScript",
    icon: <SiTypescript />,
    language: "ts",
    code: `// Imports
import { Schema, model } from 'mongoose';

// Collection name
const collection = 'Design';

// Schema
const schema = new Schema<TDesign>({
  name: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

// Model
export default model<TDesign>(collection, schema);`,
  },
  {
    id: "express",
    label: "Express",
    icon: <SiExpress />,
    language: "js",
    code: `// Import Express
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post('/data', (req, res) => {
  res.json({ message: 'Data received', data: req.body });
});

// Start server
app.listen(3000, () => console.log('Running on 3000'));`,
  },
  {
    id: "redux",
    label: "Redux",
    icon: <SiRedux />,
    language: "js",
    code: `// Import Redux
import { createStore } from 'redux';

// Reducer
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
};

// Store
const store = createStore(reducer);

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });`,
  },
  {
    id: "next",
    label: "Next",
    icon: <SiNextdotjs />,
    language: "tsx",
    code: `// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>This is a sample page.</p>
    </div>
  );
}

// API route - pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, Next.js!' });
}`,
  },
  {
    id: "dbms",
    label: "DBMS",
    icon: <SiDatabricks />,
    language: "bash",
    code: `-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

-- Select all users
SELECT * FROM users;`,
  },
  {
    id: "sql",
    label: "SQL",
    icon: <SiMysql />,
    language: "sql",
    code: `-- Create table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Insert data
INSERT INTO products (name, price) VALUES
('Laptop', 999.99),
('Phone', 499.99);

-- Fetch products
SELECT * FROM products WHERE price > 500;`,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: <SiPostgresql />,
    language: "sql",
    code: `-- Create database
CREATE DATABASE mydb;

-- Create table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER
);

-- Insert records
INSERT INTO employees (name, department, salary)
VALUES ('John Doe', 'Engineering', 70000);

-- Query records
SELECT * FROM employees;`,
  },
  {
    id: "prisma",
    label: "Prisma",
    icon: <SiPrisma />,
    language: "js",
    code: `// Import Prisma Client
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' }
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

main().finally(() => prisma.$disconnect());`,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    icon: <SiMongodb />,
    language: "js",
    code: `// Import MongoDB driver
const { MongoClient } = require('mongodb');

// Connection URL
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
try {
  await client.connect();
  const db = client.db('test');
  const users = await db.collection('users').find().toArray();
  console.log('Users:', users);
} finally {
  await client.close();
}
}

run().catch(console.dir);`,
  },
  {
    id: "mongoose",
    label: "Mongoose",
    icon: <SiMongoose />,
    language: "js",
    code: `// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Model
const User = mongoose.model('User', userSchema);

// Fetch users
User.find().then(users => console.log(users));`,
  },
  {
    id: "docker",
    label: "Docker",
    icon: <SiDocker />,
    language: "bash",
    code: `# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package.json ./
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]`,
  },
  {
    id: "aws",
    label: "AWS",
    icon: <SiAwsamplify />,
    language: "bash",
    code: `# Configure AWS CLI
aws configure

# List S3 buckets
aws s3 ls

# Upload file to S3
aws s3 cp myfile.txt s3://my-bucket/

# Deploy Lambda function
aws lambda create-function --function-name myLambda \
  --runtime nodejs18.x --role myRole \
  --handler index.handler --zip-file fileb://myLambda.zip`,
  },
  {
    id: "vitest",
    label: "Vitest",
    icon: <SiVitest />,
    language: "js",
    code: `// Import Vitest
import { describe, it, expect } from 'vitest';

describe('Math tests', () => {
  it('adds numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('subtracts numbers correctly', () => {
    expect(5 - 3).toBe(2);
  });
});`,
  },
  {
    id: "jest",
    label: "Jest",
    icon: <SiJest />,
    language: "jsx",
    code: `// Import Jest
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('multiplies 2 * 3 to equal 6', () => {
  expect(2 * 3).toBe(6);
});

test('divides 10 / 2 to equal 5', () => {
  expect(10 / 2).toBe(5);
});`,
  },
  {
    id: "graphql",
    label: "GraphQL",
    icon: <SiGraphql />,
    language: "js",
    code: `// Import Apollo Server
const { ApolloServer, gql } = require('apollo-server');

// Type definitions
const typeDefs = gql
  type Query { hello: String }
;

// Resolvers
const resolvers = {
  Query: { hello: () => 'Hello, GraphQL!' }
};

// Create server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(\`Server ready at \${url}\`);
});`,
  },
];

export default function App() {
  return (
    <div style={styles.wrapper}>
      <CodeSnippetPlayer tabs={tabs} switchDelay={3000} typingSpeed={10} primaryColor="#00ff99" />
    </div>
  );
}
