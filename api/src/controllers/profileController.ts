import { Request, Response, NextFunction } from "express";
import { getUserProfile, updateUserProfile } from "../services/profileService";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//showing the profile
export const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      res.locals.response = {
        statusCode: 401,
        message: "Unauthorized access",
        data: {},
      };
      return next();
    }

    const user = await getUserProfile(userId);

    res.locals.response = {
      statusCode: 200,
      message: "User profile fetched successfully",
      data: user,
    };

    return next();
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    res.locals.response = {
      statusCode: 500,
      message: error.message || "An error occurred while fetching the profile",
      data: {},
    };
    return next();
  }
};

//editing the profile
export const editMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const { userFirstName, userLastName, userEmail,userGender,userPhone } = req.body;

    if (!userId) {
      res.locals.response = {
        statusCode: 401,
        message: "Unauthorized access",
        data: {},
      };
      return next();
    }

    const updatedUser = await updateUserProfile(userId, {
      userFirstName,
      userLastName,
      userEmail,
      userGender,
      userPhone,
    });

    res.locals.response = {
      statusCode: 200,
      message: "User profile updated successfully",
      data: updatedUser,
    };

    return next();
  } catch (error: any) {
    console.error("Error updating profile:", error);
    res.locals.response = {
      statusCode: 500,
      message: error.message || "An error occurred while updating the profile",
      data: {},
    };
    return next();
  }
};


export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const userId = (req as any).userId;
    console.log(userId,"==============================================")
    if (!userId) {
      res.locals.response = {
        statusCode: 401,
        message: 'Unauthorized: Invalid token.',
        data: {},
      };
      return next();
    }

    const countries = await prisma.emCountry.findMany({
      select: {
        countryName: true,
        countryId: true,
      },
    });

    res.locals.response = {
      statusCode: 200,
      message: 'Countries Fetched Successfully.',
      data: {countries},
    };
    return next();
  }catch (err: any) {
    res.locals.response = {
      statusCode: err?.statusCode || 520,
      message: err?.message || 'Unknown error',
      data: {},
    };
    return next(); 
  }
};

export const getStates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  const userId = await getUserIdFromToken(token);
    const userId = (req as any).userId;
    
    if (!userId) {
      res.locals.response = {
        statusCode: 401,
        message: 'Unauthorized: Invalid token.',
        data: {},
      };
      return next();
    }
    const { userCountry } = req.body;
    if (!userCountry) {
    res.locals.response = {
      statusCode: 404,
      message: 'Country is required.',
      data: {},
    };
    return next();
    }

    const country = await prisma.emCountry.findFirst({
      where: { countryName: userCountry },
      select: { countryId: true },
    });

    if (!country) {
      res.locals.response = {
        statusCode: 404,
        message: 'Country not Found.',
        data: {},
      };
      return next();
    }

    const states = await prisma.emState.findMany({
      where: { countryId: country.countryId },
      select: { stateId: true, stateName: true },
    });
    res.locals.response = {
      statusCode: 200,
      message: 'States fetched successfully.',
      data: { states },
    };
    return next();
  } catch (err: any) {
    res.locals.response = {
      statusCode: err?.statusCode || 520,
      message: err?.message || 'Unknown error',
      data: {},
    };
    return next(); 
  }
};


export const getCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    if (!userId) {
      res.locals.response = {
        statusCode: 401,
        message: 'Unauthorized: Invalid token.',
        data: {},
      };
      return next();
    }
    const { userState } = req.body;
    if (!userState) {
    res.locals.response = {
      statusCode: 404,
      message: 'State is required.',
      data: {},
    };
    return next();
    }

    const state = await prisma.emState.findFirst({
      where: { stateName: userState },
      select: { stateId: true },
    });

    if (!state) {
      res.locals.response = {
        statusCode: 404,
        message: 'State not Found.',
        data: {},
      };
      return next();
    }

    const cities = await prisma.emCities.findMany({
      where: { stateId: state.stateId },
      select: { cityId: true, cityName: true },
    });
    res.locals.response = {
      statusCode: 200,
      message: 'Cities fetched successfully.',
      data: { cities },
    };
    return next();
  } catch (err: any) {
    res.locals.response = {
      statusCode: err?.statusCode || 520,
      message: err?.message || 'Unknown error',
      data: {},
    };
    return next(); 
  }
};
