
CREATE TYPE "gender" AS ENUM ('male', 'female');


CREATE TABLE "em_roles" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(30) NOT NULL,
    "role_updated_at" TIMESTAMP(3) NOT NULL,
    "role_deleted_at" TIMESTAMP(3),
    "role_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "em_roles_pkey" PRIMARY KEY ("role_id")
);


CREATE TABLE "em_users" (
    "user_id" SERIAL NOT NULL,
    "user_first_name" VARCHAR(30) NOT NULL,
    "user_last_name" VARCHAR(30) NOT NULL,
    "user_email" VARCHAR(30) NOT NULL,
    "user_phone" VARCHAR(10) NOT NULL,
    "user_street_address" VARCHAR(60) NOT NULL,
    "user_city_name" VARCHAR(20) NOT NULL,
    "user_state_name" VARCHAR(20) NOT NULL,
    "user_country_name" VARCHAR(20) NOT NULL,
    "user_updated_at" TIMESTAMP(3) NOT NULL,
    "user_deleted_at" TIMESTAMP(3),
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_password" VARCHAR(200) NOT NULL,
    "user_gender" "gender" NOT NULL,
    "user_role_id" INTEGER NOT NULL,

    CONSTRAINT "em_users_pkey" PRIMARY KEY ("user_id")
);


CREATE TABLE "em_countries" (
    "country_id" SERIAL NOT NULL,
    "country_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "em_countries_pkey" PRIMARY KEY ("country_id")
);


CREATE TABLE "em_states" (
    "state_id" SERIAL NOT NULL,
    "state_name" VARCHAR(30) NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "em_states_pkey" PRIMARY KEY ("state_id")
);


CREATE TABLE "em_cities" (
    "city_id" SERIAL NOT NULL,
    "city_name" VARCHAR(30) NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "em_cities_pkey" PRIMARY KEY ("city_id")
);


CREATE INDEX "em_users_user_role_id_idx" ON "em_users"("user_role_id");


CREATE INDEX "em_states_country_id_idx" ON "em_states"("country_id");


CREATE INDEX "em_cities_state_id_idx" ON "em_cities"("state_id");


ALTER TABLE "em_users" ADD CONSTRAINT "em_users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "em_roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "em_states" ADD CONSTRAINT "em_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "em_countries"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "em_cities" ADD CONSTRAINT "em_cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "em_states"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;
