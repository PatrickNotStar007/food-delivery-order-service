CREATE TYPE "statuses" AS ENUM('pending', 'recieved');--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customerName" varchar(100) NOT NULL,
	"item" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"status" "statuses" DEFAULT 'pending'::"statuses" NOT NULL,
	"created_at" timestamp DEFAULT now()
);
