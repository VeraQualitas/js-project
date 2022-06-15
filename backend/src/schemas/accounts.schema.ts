import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const accountGenerated = {
    accountId: z.string()
};

const accountData = {
    name: z.string()
};

const accountInput = {
    email: z.string().email(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
    password: z.string()
};

const accountUpdate = {
    email: z.string().email(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    description: z.string().optional(),
};

const accountSchema = z.object({
    ...accountGenerated,
    ...accountData
});

const registerAccountSchema = z.object({
    ...accountInput,
    confirmPassword: z.string(),
});

const updateAccountSchema = z.object({
    ...accountUpdate,
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    currentPassword: z.string().optional()
});

const loginAccountSchema = z.object({
    ...accountInput
});

const authenticateAccountSchema = z.object({});

const accountParamsSchema = z.object({
    accountId: z.string()
});

const accountResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        account: accountSchema.optional()
    })
});

const loginResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        accessToken: z.string()
    })
});

const authenticateResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.any()
});

export type RegisterAccountInput = z.infer<typeof registerAccountSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type LoginAccountInput = z.infer<typeof loginAccountSchema>;

export const { schemas: accountSchemas, $ref } = buildJsonSchemas(
    {
        registerAccountSchema,
        updateAccountSchema,
        loginAccountSchema,
        authenticateAccountSchema,
        accountSchema,
        accountParamsSchema,
        accountResponseSchema,
        loginResponseSchema,
        authenticateResponseSchema
    },
    {
        $id: 'accountSchemas'
    }
);