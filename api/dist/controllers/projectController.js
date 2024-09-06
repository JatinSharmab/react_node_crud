"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProjectController = exports.listingProjectsController = exports.updateListing = exports.projectDeletedAtController = exports.addProjectController = void 0;
const client_1 = require("@prisma/client");
const projectService_1 = require("../services/projectService");
const prisma = new client_1.PrismaClient();
// Adding the new project
const addProjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectName, projectTechnology, projectStatus, projectManager, projectLead, projectClient, projectManagementTool, projectManagementToolUrl, projectRepoTool, projectRepoToolUrl, projectDescription, } = req.body;
    const projectId = req.userId;
    try {
        const newProject = yield (0, projectService_1.addProject)({
            projectId,
            projectName,
            projectTechnology,
            projectStatus,
            projectManager,
            projectLead,
            projectClient,
            projectManagementTool,
            projectManagementToolUrl,
            projectRepoTool,
            projectRepoToolUrl,
            projectDescription,
        });
        res.locals.response = {
            statusCode: 201,
            message: "User registered successfully",
            data: newProject,
        };
        return next();
    }
    catch (error) {
        console.error("Signup error:", error);
        res.locals.response = {
            statusCode: 500,
            message: "An error occurred during signup",
            data: {},
        };
        return next();
    }
});
exports.addProjectController = addProjectController;
// Deleting the project
const projectDeletedAtController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.body.projectId;
    console.log(projectId);
    try {
        const updatedProject = yield (0, projectService_1.updateProjectDeletedAt)(projectId);
        res.locals.response = {
            statusCode: 200,
            message: "Project deleted successfullyyyyyy",
            data: updatedProject,
        };
        return next();
    }
    catch (error) {
        res.locals.response = {
            statusCode: 500,
            message: "Failed to delete project",
            data: {},
        };
        return next();
    }
});
exports.projectDeletedAtController = projectDeletedAtController;
//listing for the update projects
// Listing the projects
const updateListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const projectId = parseInt(req.params.projectId);
    // const projectId= (req as any).userId;
    const projectId = parseInt(req.body.projectId);
    console.log(projectId, "here is the project id of the update-listing");
    console.log(projectId, "daskfoasdjhfoiasdjhfoijasdoifoi");
    // if(projectId){
    try {
        const projects = yield (0, projectService_1.listingForUpdate)(projectId);
        res.locals.response = {
            statusCode: 200,
            message: "Projects fetched successfully",
            data: projects,
        };
        return next();
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.locals.response = {
            statusCode: 500,
            message: error.message || "An error occurred while fetching the projects",
            data: {},
        };
        return next();
    }
    // }
});
exports.updateListing = updateListing;
// Listing the projects
const listingProjectsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const projectId = parseInt(req.params.projectId);
    const projectId = req.userId;
    // const projectId = req?.body?.projectId;
    console.log(projectId, "daskfoasdjhfoiasdjhfoijasdoifoi");
    // if(projectId){
    try {
        const projects = yield (0, projectService_1.listingProjects)(projectId);
        res.locals.response = {
            statusCode: 200,
            message: "Projects fetched successfully",
            data: projects,
        };
        return next();
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.locals.response = {
            statusCode: 500,
            message: error.message || "An error occurred while fetching the projects",
            data: {},
        };
        return next();
    }
    // }
});
exports.listingProjectsController = listingProjectsController;
// Updating the project
// export const editProjectController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("==============================================");
//   try {
//     const projectId = parseInt(req.params.projectId);
//     // Validate projectId
//     if (isNaN(projectId)) {
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Invalid projectId",
//       });
//     }
//     // Destructure body parameters
// const {
//   projectName,
//   projectTechnology,
//   projectStatus,
//   projectManager,
//   projectLead,
//   projectClient,
//   projectManagementTool,
//   projectManagementToolUrl,
//   projectRepoTool,
//   projectRepoToolUrl,
// } = req.body;
//     // Validate required fields if necessary (example for projectName)
//     if (!projectName) {
//       return res.status(400).json({
//         statusCode: 400,
//         message: "Project name is required",
//       });
//     }
//     // Perform update operation
//     const updatedProject = await editProject(projectId, {
//       projectName,
//       projectTechnology,
//       projectStatus,
//       projectManager,
//       projectLead,
//       projectClient,
//       projectManagementTool,
//       projectManagementToolUrl,
//       projectRepoTool,
//       projectRepoToolUrl,
//     });
//     if (!updatedProject) {
//       return res.status(404).json({
//         statusCode: 404,
//         message: "Project not found",
//       });
//     }
//     // Success response
//     res.locals.response = {
//       statusCode: 200,
//       message: "Project updated successfully",
//       data: updatedProject,
//     };
//     return next();
//   } catch (error: any) {
//     console.error("Error updating project:", error);
//     res.locals.response = {
//       statusCode: 500,
//       message: error.message || "An error occurred while updating the project",
//       data: {},
//     };
//     return next();
//   }
// };
// import toLocaleString from "constants";
// var date = new Date();
// date.toLocaleString();
// const prisma = new PrismaClient();
// //adding the new project
// export const addProject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const {
//     projectUserId,
//     projectName,
//     projectTechnology,
//     projectStatus,
//     projectManager,
//     projectLead,
//     projectClient,
//   } = req.body;
//   try {
//     const newProject = await prisma.emProjects.create({
//       data: {
//         projectName: projectName,
//         projectUserId: projectUserId,
//         projectTechnology: projectTechnology,
//         projectStatus: projectStatus,
//         projectManager: projectManager,
//         projectLead: projectLead,
//         projectClient: projectClient,
//       },
//     });
//     console.log(newProject);
//     res.locals.response = {
//       statusCode: 201,
//       message: "User registered successfully",
//       data: newProject,
//     };
//     return next(); // Move to the next middleware
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.locals.response = {
//       statusCode: 500,
//       message: "An error occurred during signup",
//       data: {},
//     };
//     return next();
//   }
// };
// //deleting the project
// export const updateProjectDeletedAt = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const projectId = parseInt(req.params.projectId);
//   console.log(projectId, "reached control here");
//   try {
//     const updatedProject = await prisma.emProjects.update({
//       where: { projectId: projectId },
//       data: {
//         projectDeletedAt: true,
//       },
//     });
//     res.locals.response = {
//       statusCode: 200,
//       message: "Project deleted successfullyyyyyyyyyy",
//       data: { hello: "sdfj" },
//     };
//     return next();
//     // res
//     //   .status(200)
//     //   .json({
//     //     message: "Project deleted successfully",
//     //     project: updatedProject,
//     //   });
//   } catch (error) {
//     res.locals.response = {
//       statusCode: 500,
//       message: "Failed to Delete Project",
//       data: {},
//     };
//     return next();
//   }
// };
// //listing the projects
// export const listingProjects = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // const projectId=parseInt(req.params.userId);
//   const projectId = parseInt(req.params.projectId);
//   console.log(projectId);
//   if (!projectId) {
//     res.locals.response = {
//       statusCode: 401,
//       message: "Unauthorized access",
//       data: {},
//     };
//     return next();
//   }
//   try {
//     const projects = await prisma.emProjects.findMany({
//       where: {
//         projectUserId: projectId,
//       },
//       select: {
//         projectName: true,
//         projectTechnology: true,
//         projectStatus: true,
//         projectManager: true,
//         projectLead: true,
//         projectClient: true,
//       },
//     });
//     console.log(projects);
//     res.locals.response = {
//       statusCode: 200,
//       message: "Projects fetched successfully",
//       data: projects,
//     };
//     return next();
//   } catch (error: any) {
//     console.error("Error fetching profile:", error);
//     res.locals.response = {
//       statusCode: 500,
//       message: error.message || "An error occurred while fetching the Projects",
//       data: {},
//     };
//     return next();
//   }
// };
// for updating the projects
const editProjectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside project controller--------------------------");
    const projectId = parseInt(req.params.projectId);
    const { projectName, projectTechnology, projectStatus, projectManager, projectLead, projectClient, projectManagementTool, projectManagementToolUrl, projectRepoTool, projectRepoToolUrl, projectDescription, } = req.body;
    console.log(projectId);
    if (!projectName &&
        !projectTechnology &&
        !projectStatus &&
        !projectManager &&
        !projectLead &&
        !projectClient &&
        !projectManagementTool &&
        !projectManagementToolUrl &&
        !projectRepoTool &&
        !projectRepoToolUrl &&
        !projectDescription) {
        res.locals.response = {
            message: "All fields are required",
            statusCode: 300,
            data: {},
        };
        return next();
    }
    if (!projectId) {
        res.locals.response = {
            statusCode: 401,
            message: "Unauthorized access",
            data: {},
        };
        return next();
    }
    try {
        const updateProject = yield prisma.emProjects.update({
            where: {
                projectId: projectId,
            },
            data: {
                projectName: projectName,
                projectTechnology: projectTechnology,
                projectStatus: projectStatus,
                projectManager: projectManager,
                projectLead: projectLead,
                projectClient: projectClient,
                projectManagementTool: projectManagementTool,
                projectManagementToolUrl: projectManagementToolUrl,
                projectRepoTool: projectRepoTool,
                projectRepoToolUrl: projectRepoToolUrl,
                projectDescription: projectDescription,
            },
            // select: {
            //   projectName: true,
            //   projectTechnology: true,
            //   projectStatus: true,
            //   projectManager: true,
            //   projectLead: true,
            //   projectClient: true,
            // },
        });
        const updatedProjects = yield prisma.emProjects.findMany({
            where: {
                projectUserId: projectId, // Use projectUserId here to fetch updated records
            },
            select: {
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
        console.log(updatedProjects);
        res.locals.response = {
            statusCode: 200,
            message: "Project updated successfully",
            data: updatedProjects,
        };
        return next();
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.locals.response = {
            statusCode: 500,
            message: error.message || "An error occurred while updating the project",
            data: {},
        };
        return next();
    }
});
exports.editProjectController = editProjectController;
