/*
  Warnings:

  - You are about to drop the `ceps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `changeAmounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `palindromes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ceps";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "changeAmounts";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "palindromes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "payments";
PRAGMA foreign_keys=on;
