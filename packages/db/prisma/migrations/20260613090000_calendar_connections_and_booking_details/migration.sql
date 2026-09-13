-- Add booking details used by public booking pages and calendar sync.
ALTER TABLE "Booking"
ADD COLUMN "guestName" TEXT,
ADD COLUMN "title" TEXT,
ADD COLUMN "timeZone" TEXT,
ADD COLUMN "externalCalendarEventId" TEXT,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Store user-owned external calendar connections.
CREATE TABLE "CalendarConnection" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT,
  "email" TEXT,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "tokenType" TEXT,
  "scope" TEXT,
  "expiryDate" TIMESTAMP(3),
  "calendarId" TEXT NOT NULL DEFAULT 'primary',
  "syncEnabled" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CalendarConnection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CalendarConnection_userId_provider_key"
ON "CalendarConnection"("userId", "provider");

ALTER TABLE "CalendarConnection"
ADD CONSTRAINT "CalendarConnection_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
