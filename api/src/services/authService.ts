import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface User {
  id: number;
  username: string;
  password: string;
}

const filePath = path.resolve(__dirname, '../data/users.json');

// const filePath = path.resolve(__dirname, '');

// const getUsers = (): User[] => {
//   const data = readFileSync(filePath, 'utf-8');
//   return JSON.parse(data);
// };
const getUsers = (): User[] => {
  try {
    const data = readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing users data:', error);
    throw new Error('Unable to fetch users');
  }
};


const saveUsers = (users: User[]) => {
  writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};


export const loginUser = (username: string, password: string): User | null => {
  try {
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    return user || null;
  } catch (error) {
    console.error('Error reading users or parsing data:', error);
    throw new Error('Failed to fetch user data');
  }
};

// export const loginUser = (req:Request,username: string, password: string): User | null => {
//   try {
//     const {username,password = req.body;
//     const user = users.find(user => user.username === username && user.password === password);
//     return user || null;
//   } catch (error) {
//     console.error('Error reading users or parsing data:', error);
//     throw new Error('Failed to fetch user data');
//   }
// };




export const registerUser = (username: string, password: string): User => {
  try {
    const users = getUsers();
    const newUser: User = {
      id: users.length + 1,
      username,
      password,
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('User registration failed');
  }
};

