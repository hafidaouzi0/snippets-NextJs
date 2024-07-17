/*
  Warnings:

  - You are about to drop the column `little` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `title` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snippet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Snippet" ("code", "id") SELECT "code", "id" FROM "Snippet";
DROP TABLE "Snippet";
ALTER TABLE "new_Snippet" RENAME TO "Snippet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
