/*
  Warnings:

  - You are about to drop the column `end` on the `palindromes` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `palindromes` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `palindromes` table. All the data in the column will be lost.
  - Added the required column `numbersPalindromes` to the `palindromes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_palindromes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numbersPalindromes" TEXT NOT NULL
);
INSERT INTO "new_palindromes" ("id") SELECT "id" FROM "palindromes";
DROP TABLE "palindromes";
ALTER TABLE "new_palindromes" RENAME TO "palindromes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
