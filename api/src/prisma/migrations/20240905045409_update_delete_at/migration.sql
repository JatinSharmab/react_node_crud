/*
  Warnings:

  - The `project_deleted_at` column on the `em_projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "em_projects" DROP COLUMN "project_deleted_at",
ADD COLUMN     "project_deleted_at" BOOLEAN;
