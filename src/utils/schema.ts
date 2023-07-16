import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().optional(),
  email_verified: z.boolean().optional(),
  family_name: z.string().optional(),
  given_name: z.string(),
  hd: z.string().optional(),
  locale: z.string().optional(),
  name: z.string().optional(),
  picture: z.string(),
  sub: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
