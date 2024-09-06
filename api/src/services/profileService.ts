import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserProfile = async (userId: string) => {
  try {
    const user = await prisma.emUser.findUnique({
      where: {
        userId: parseInt(userId), 
      },
      select: {
        userId: true,
        userFirstName: true,
        userLastName: true,
        userEmail: true,
        userRoleId: true,
        userPhone:true,
        userGender:true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message || "Error fetching user profile");
  }
};

interface UpdateUserProfileData {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone:string;
  userGender:any;
}

export const updateUserProfile = async (userId: string, data: UpdateUserProfileData) => {
  try {
    const updatedUser = await prisma.emUser.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        userFirstName: data.userFirstName,
        userLastName: data.userLastName,
        userEmail: data.userEmail,
        userPhone:data.userPhone,
        userGender:data.userGender,
      },
      select: {
        userId: true,
        userFirstName: true,
        userLastName: true,
        userEmail: true,
        userRoleId: true,
        userPhone:true,
        userGender:true,
        userCountry:true,
        userState:true,
        userCity:true,
      },
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message || "Error updating user profile");
  }
};
