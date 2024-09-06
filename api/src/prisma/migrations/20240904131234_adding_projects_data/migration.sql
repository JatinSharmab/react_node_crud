-- CreateTable
CREATE TABLE "em_projects" (
    "project_id" SERIAL NOT NULL,
    "project_user_id" INTEGER NOT NULL,
    "project_name" VARCHAR(50) NOT NULL,
    "project_technology" VARCHAR(50) NOT NULL,
    "project_status" VARCHAR(20) NOT NULL,
    "project_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_deleted_at" TIMESTAMP(3),
    "project_updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "project_start_date" TIMESTAMP(3) NOT NULL,
    "project_deadline_date" TIMESTAMP(3) NOT NULL,
    "project_lead" VARCHAR(50) NOT NULL,
    "project_manager" VARCHAR(50) NOT NULL,
    "project_client" VARCHAR(50) NOT NULL,
    "project_management_tool" VARCHAR(50) NOT NULL,
    "project_management_tool_url" VARCHAR(100) NOT NULL,
    "project_repo_tool" VARCHAR(50) NOT NULL,
    "project_repo_tool_url" VARCHAR(100) NOT NULL,
    "project_description" TEXT,

    CONSTRAINT "em_projects_pkey" PRIMARY KEY ("project_id")
);

-- AddForeignKey
ALTER TABLE "em_projects" ADD CONSTRAINT "em_projects_project_user_id_fkey" FOREIGN KEY ("project_user_id") REFERENCES "em_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
