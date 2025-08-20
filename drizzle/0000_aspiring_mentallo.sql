CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
