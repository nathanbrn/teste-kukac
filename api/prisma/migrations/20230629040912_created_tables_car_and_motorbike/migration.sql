-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "yearMan" INTEGER NOT NULL,
    "amountPorts" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "motorbikes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "yearMan" INTEGER NOT NULL,
    "amountPorts" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "whells" INTEGER NOT NULL,
    "passengers" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
