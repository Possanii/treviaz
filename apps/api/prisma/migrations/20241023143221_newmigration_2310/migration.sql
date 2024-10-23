-- CreateEnum
CREATE TYPE "ForumStatus" AS ENUM ('APPROVED', 'DENIED', 'PENDING');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DENIED', 'REVOKED');

-- AlterTable
ALTER TABLE "forum_threads" ADD COLUMN     "status" "ForumStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING';
