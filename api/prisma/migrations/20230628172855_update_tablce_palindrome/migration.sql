/*
  Warnings:

  - Added the required column `end` to the `palindromes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `palindromes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_palindromes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "numbersPalindromes" TEXT NOT NULL
);
INSERT INTO "new_palindromes" ("id", "numbersPalindromes") SELECT "id", "numbersPalindromes" FROM "palindromes";
DROP TABLE "palindromes";
ALTER TABLE "new_palindromes" RENAME TO "palindromes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
