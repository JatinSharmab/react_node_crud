import { PrismaClient } from "@prisma/client";
import { strict } from "assert";

const prisma = new PrismaClient();

// Adding the new project
export const addProject = async (projectData: {
  projectId:number;
  projectName: string;
  projectTechnology: string;
  projectStatus: string;
  projectManager: string;
  projectLead: string;
  projectClient: string;
  projectManagementTool: string;
  projectManagementToolUrl: string;
  projectRepoTool: string;
  projectRepoToolUrl: string;
  projectDescription: string;
}) => {
  const newProject = await prisma.emProjects.create({
    data: {
      projectName: projectData.projectName,
      projectUserId: projectData.projectId,
      projectTechnology: projectData.projectTechnology,
      projectStatus: projectData.projectStatus,
      projectManager: projectData.projectManager,
      projectLead: projectData.projectLead,
      projectClient: projectData.projectClient,
      projectManagementTool: projectData.projectManagementTool,
      projectManagementToolUrl: projectData.projectManagementToolUrl,
      projectRepoTool: projectData.projectRepoTool,
      projectRepoToolUrl: projectData.projectRepoToolUrl,
      projectDescription: projectData.projectDescription,
    },
  });
  return newProject;
};

// Deleting the project
export const updateProjectDeletedAt = async (projectId: number) => {
  const updatedProject = await prisma.emProjects.update({
    where: { projectId: projectId },
    data: {
      projectDeletedAt: true,
    },
  });
  return updatedProject;
};


// for listing in update projects


export const listingForUpdate = async (projectId: any) => {
  console.log(projectId,'in prima query')
  const projects = await prisma.emProjects.findMany({
    where: {
      // projectUserId: projectId, AND, projectDeletedAt: null,
      projectId: projectId,
    },
    select: {
      // projectId: true,
      projectName: true,
      projectTechnology: true,
      projectStatus: true,
      projectManager: true,
      projectLead: true,
      projectClient: true,
      projectManagementTool: true,
      projectManagementToolUrl: true,
      projectRepoTool: true,
      projectRepoToolUrl: true,
      projectDescription: true,
    },
  });
  return projects;
};

// Listing the projects
export const listingProjects = async (projectId: number) => {
  console.log(projectId,'in prima query')
  const projects = await prisma.emProjects.findMany({
    where: {
      // projectUserId: projectId, AND, projectDeletedAt: null,
      projectUserId: projectId,
      AND:[
        {
          projectDeletedAt: null
        }
      ]
    },
    select: {
      projectId: true,
      projectName: true,
      projectTechnology: true,
      projectStatus: true,
      projectManager: true,
      projectLead: true,
      projectClient: true,
      projectManagementTool: true,
      projectManagementToolUrl: true,
      projectRepoTool: true,
      projectRepoToolUrl: true,
      projectDescription: true,
    },
  });
  return projects;
};

// Updating the project
export const editProject = async (
  projectId: number,
  projectData: {
    projectName: string;
    projectTechnology: string;
    projectStatus: string;
    projectManager: string;
    projectLead: string;
    projectClient: string;
    projectManagementTool: string,
    projectManagementToolUrl: string,
    projectRepoTool: string,
    projectRepoToolUrl:string,
  }
) => {
  const res = await prisma.emProjects.update({
    where: {
      projectId: projectId,
    },
    data: {
      projectName: projectData.projectName,
      projectTechnology: projectData.projectTechnology,
      projectStatus: projectData.projectStatus,
      projectManager: projectData.projectManager,
      projectLead: projectData.projectLead,
      projectClient: projectData.projectClient,
      projectManagementTool: projectData.projectManagementTool,
      projectManagementToolUrl: projectData.projectManagementToolUrl,
      projectRepoTool: projectData.projectRepoTool,
      projectRepoToolUrl:projectData.projectRepoToolUrl,
    },
  });
  console.log(res,'result')

  const updatedProjects = await prisma.emProjects.findUnique({
    where: {
      projectId: projectId,
    },
    select: {
      // projectId: true,
      projectName: true,
      projectTechnology: true,
      projectStatus: true,
      projectManager: true,
      projectLead: true,
      projectClient: true,
      projectManagementTool: true,
      projectManagementToolUrl: true,
      projectRepoTool: true,
      projectRepoToolUrl:true,
    },
  });
  console.log(updatedProjects)
  return updatedProjects;
};
