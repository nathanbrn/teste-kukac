/*
  Warnings:

  - You are about to drop the column `return` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `payments` table. All the data in the column will be lost.
  - Added the required column `change` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "changeAmounts" (
    "note1" TEXT NOT NULL,
    "note10" TEXT NOT NULL,
    "note100" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "changeAmounts_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" TEXT NOT NULL,
    "payment" TEXT NOT NULL,
    "change" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_payments" ("createdAt", "id", "price") SELECT "createdAt", "id", "price" FROM "payments";
DROP TABLE "payments";
ALTER TABLE "new_payments" RENAME TO "payments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "changeAmounts_paymentId_key" ON "changeAmounts"("paymentId");
