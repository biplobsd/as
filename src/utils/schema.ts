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

export const RMUserSchema = z.object({
  displayName: z.string(),
  photoURL: z.string(),
  star: z.number(),
});

export const SignSchema = z.enum(["+", "-", "random"]);

export const UserSettingSchema = z.object({
  timeout: z.number(),
  numberRange: z.number(),
  increaseNumber: z.number(),
  numberPoint: z.number(),
  sign: SignSchema,
  themeMode: ThemeSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;
export type User = z.infer<typeof UserSchema>;
export type RMUser = z.infer<typeof RMUserSchema>;
export type Sign = z.infer<typeof SignSchema>;
export type UserSetting = z.infer<typeof UserSettingSchema>;
