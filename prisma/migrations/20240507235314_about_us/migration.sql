-- CreateTable
CREATE TABLE "AboutUs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "media" BYTEA,

    CONSTRAINT "AboutUs_pkey" PRIMARY KEY ("id")
);
