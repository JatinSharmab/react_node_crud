import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

const prisma = new PrismaClient();
dotenv.config();
// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    
    const user = await prisma.emUser.findFirst({
      where: {
        userEmail: username,
      },
    });

    if (!user) {
      res.locals.response = {
        statusCode: 401,
        message: "Invalid username or password",
      data: {},
      };
      return next(); 
    }

    const isValidPassword = await bcrypt.compare(password, user.userPassword);
    if (!isValidPassword) {
      res.locals.response = {
        statusCode: 401,
        message: "Invalid username or password",
        data: {},
      };
      return next();
    }
    const token = jwt.sign(
      { userId: user.userId }, 
      String(process.env.JWT_SECRET), 
      { expiresIn: '10h' }
    );

    // Set response in res.locals
    res.locals.response = {
      statusCode: 200,
      message: "Login successful",
      data: {
        Id: user.userId,
        email: username,
        Token: token,
      },
    };

    return next(); 

    return next(); 
  } catch (error: any) {
    console.error("Login error:", error);
    res.locals.response = {
      statusCode: 400,
      message: error.message || "An error occurred during login",
      data: {},
    };
    return next();
  }
};

// Signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    res.locals.response={
      statusCode:400,
      message:"Username and password are required",
      data:{}
    }
    return next();
    
    // return res
    //   .status(400)
    //   .json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await prisma.emUser.findFirst({
      where: {
        userEmail: email,
      },
    });

    if (existingUser) {
      res.locals.response = {
        statusCode: 400,
        message: "User already exists",
        data: {},
      };
      return next();
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.emUser.create({
      data: {
        userFirstName: firstname,
        userLastName: lastname,
        userEmail: email,
        userPassword: hashedPassword,
        userRoleId: 1,
      },
    });
    console.log(newUser);
    // Set response in res.locals
    res.locals.response = {
      statusCode: 201,
      message: "User registered successfully",
      data: newUser,
    };

    next();  // Move to the next middleware
  } catch (error) {
    console.error("Signup error:", error);
    res.locals.response = {
      statusCode: 500,
      message: "An error occurred during signup",
      data: {},
    };

    return next();
  }
};

