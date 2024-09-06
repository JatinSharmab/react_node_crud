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
exports.editProject = exports.listingProjects = exports.listingForUpdate = exports.updateProjectDeletedAt = exports.addProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Adding the new project
const addProject = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = yield prisma.emProjects.create({
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
});
exports.addProject = addProject;
// Deleting the project
const updateProjectDeletedAt = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProject = yield prisma.emProjects.update({
        where: { projectId: projectId },
        data: {
            projectDeletedAt: true,
        },
    });
    return updatedProject;
});
exports.updateProjectDeletedAt = updateProjectDeletedAt;
// for listing in update projects
const listingForUpdate = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(projectId, 'in prima query');
    const projects = yield prisma.emProjects.findMany({
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
});
exports.listingForUpdate = listingForUpdate;
// Listing the projects
const listingProjects = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(projectId, 'in prima query');
    const projects = yield prisma.emProjects.findMany({
        where: {
            // projectUserId: projectId, AND, projectDeletedAt: null,
            projectUserId: projectId,
            AND: [
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
});
exports.listingProjects = listingProjects;
// Updating the project
const editProject = (projectId, projectData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.emProjects.update({
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
            projectRepoToolUrl: projectData.projectRepoToolUrl,
        },
    });
    console.log(res, 'result');
    const updatedProjects = yield prisma.emProjects.findUnique({
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
            projectRepoToolUrl: true,
        },
    });
    console.log(updatedProjects);
    return updatedProjects;
});
exports.editProject = editProject;
