-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_palindromes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "numbersPalindromes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_palindromes" ("end", "id", "numbersPalindromes", "start") SELECT "end", "id", "numbersPalindromes", "start" FROM "palindromes";
DROP TABLE "palindromes";
ALTER TABLE "new_palindromes" RENAME TO "palindromes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
