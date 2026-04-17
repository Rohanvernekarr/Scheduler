-- CreateTable
CREATE TABLE "TargetedInvite" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "inviteLink" TEXT NOT NULL,
    "meetingLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TargetedInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetedSlot" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "bookedAt" TIMESTAMP(3),
    "bookedByEmail" TEXT,
    "bookedByName" TEXT,

    CONSTRAINT "TargetedSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TargetedInvite_inviteLink_key" ON "TargetedInvite"("inviteLink");

-- AddForeignKey
ALTER TABLE "TargetedInvite" ADD CONSTRAINT "TargetedInvite_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetedSlot" ADD CONSTRAINT "TargetedSlot_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "TargetedInvite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
