import { Prisma } from "@prisma/client";

export type GameWithQuestions = Prisma.GameGetPayload<{
    include: { questions: true };
  }>;