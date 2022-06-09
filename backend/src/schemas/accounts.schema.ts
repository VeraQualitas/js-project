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

const accountSchema = z.object({
    ...accountGenerated,
    ...accountData
});

const registerAccountSchema = z.object({
    ...accountInput,
    confirmPassword: z.string()
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
    message: z.string()
});

export type RegisterAccountInput = z.infer<typeof registerAccountSchema>;
export type LoginAccountInput = z.infer<typeof loginAccountSchema>;

export const { schemas: accountSchemas, $ref } = buildJsonSchemas(
    {
        registerAccountSchema,
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