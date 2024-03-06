-- CreateTable
CREATE TABLE "SupportGroup" (
    "id" SERIAL NOT NULL,
    "eventDate" TEXT NOT NULL,
    "eventTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "SupportGroup_pkey" PRIMARY KEY ("id")
);
