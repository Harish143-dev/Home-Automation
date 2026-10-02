-- AlterTable
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "inquiryType" TEXT NOT NULL DEFAULT 'General';

-- CreateTable
CREATE TABLE IF NOT EXISTS "CareerApplication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "experience" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "message" TEXT,
    "resumeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);
