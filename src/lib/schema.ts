import { z } from 'zod';
const activityLogSchema = z.object({
  date: z.date(),
  action: z.string(),
  description: z.string(),
});
export const memberSchema = z.object({
  id: z.string(),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  email: z.string().email({ message: "Invalid email address." }),
  status: z.enum(["Active", "Pending", "Suspended"]),
  role: z.enum(["Admin", "Member"]),
  registrationDate: z.date(),
  addedBy: z.string(),
  // Optional fields from PRD
  facebook: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  brandMessage: z.string().optional(),
  mainProducts: z.array(z.string()).max(5).optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  productCategory: z.string().optional(),
  activityLog: z.array(activityLogSchema).optional(),
});
export type Member = z.infer<typeof memberSchema>;
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
    profilePhoto: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (files) =>
          !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // path of error
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;