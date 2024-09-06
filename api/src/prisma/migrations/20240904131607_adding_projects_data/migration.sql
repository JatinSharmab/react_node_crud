-- AlterTable
ALTER TABLE "em_projects" ALTER COLUMN "project_start_date" DROP NOT NULL,
ALTER COLUMN "project_deadline_date" DROP NOT NULL,
ALTER COLUMN "project_lead" DROP NOT NULL,
ALTER COLUMN "project_manager" DROP NOT NULL,
ALTER COLUMN "project_client" DROP NOT NULL,
ALTER COLUMN "project_management_tool" DROP NOT NULL,
ALTER COLUMN "project_management_tool_url" DROP NOT NULL,
ALTER COLUMN "project_repo_tool" DROP NOT NULL,
ALTER COLUMN "project_repo_tool_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "em_users" ALTER COLUMN "user_phone" SET DATA TYPE VARCHAR(200);
