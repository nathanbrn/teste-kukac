/*
  Warnings:

  - You are about to drop the column `amountPorts` on the `motorbikes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_motorbikes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "yearMan" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "whells" INTEGER NOT NULL,
    "passengers" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_motorbikes" ("brand", "createdAt", "id", "model", "passengers", "whells", "yearMan") SELECT "brand", "createdAt", "id", "model", "passengers", "whells", "yearMan" FROM "motorbikes";
DROP TABLE "motorbikes";
ALTER TABLE "new_motorbikes" RENAME TO "motorbikes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
