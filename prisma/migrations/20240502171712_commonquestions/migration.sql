-- CreateTable
CREATE TABLE "CommomQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "CommomQuestion_pkey" PRIMARY KEY ("id")
);
