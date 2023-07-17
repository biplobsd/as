import { z } from "zod";
import { THEME_MODE_DEFAULT } from "./default";

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

export const ThemeSchema = z
  .enum(["dark", "light"])
  .default(THEME_MODE_DEFAULT);

export type Theme = z.infer<typeof ThemeSchema>;
export type User = z.infer<typeof UserSchema>;
