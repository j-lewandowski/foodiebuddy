-- AlterTable
CREATE SEQUENCE restaurant_id_seq;
ALTER TABLE "Restaurant" ALTER COLUMN "id" SET DEFAULT nextval('restaurant_id_seq');
ALTER SEQUENCE restaurant_id_seq OWNED BY "Restaurant"."id";
