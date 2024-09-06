/*
  Warnings:

  - You are about to drop the `em_countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `em_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `em_states` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `em_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "em_cities" DROP CONSTRAINT "em_cities_state_id_fkey";

-- DropForeignKey
ALTER TABLE "em_states" DROP CONSTRAINT "em_states_country_id_fkey";

-- DropForeignKey
ALTER TABLE "em_users" DROP CONSTRAINT "em_users_user_role_id_fkey";

-- DropTable
DROP TABLE "em_countries";

-- DropTable
DROP TABLE "em_roles";

-- DropTable
DROP TABLE "em_states";

-- DropTable
DROP TABLE "em_users";

-- CreateTable
CREATE TABLE "roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(30) NOT NULL,
    "role_updated_at" TIMESTAMP(3) NOT NULL,
    "role_deleted_at" TIMESTAMP(3),
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "users" (
    "comment_text" TEXT NOT NULL,
    "commenter_email" TEXT NOT NULL,
    "user_id" SERIAL NOT NULL,
    "user_first_name" VARCHAR(30),
    "user_last_name" VARCHAR(30),
    "user_email" VARCHAR(30) NOT NULL,
    "user_phone" VARCHAR(10),
    "user_street_address" VARCHAR(60),
    "user_city_name" VARCHAR(20),
    "user_state_name" VARCHAR(20),
    "user_country_name" VARCHAR(20),
    "user_updated_at" TIMESTAMP(3),
    "user_deleted_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_password" VARCHAR(200) NOT NULL,
    "user_gender" "gender",
    "user_role_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "countries" (
    "country_id" SERIAL NOT NULL,
    "country_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "states" (
    "state_id" SERIAL NOT NULL,
    "state_name" VARCHAR(30) NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("state_id")
);

-- CreateIndex
CREATE INDEX "users_user_id_idx" ON "users"("user_id");

-- CreateIndex
CREATE INDEX "states_country_id_idx" ON "states"("country_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "em_cities" ADD CONSTRAINT "em_cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;
