import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const addStationBody = z.object({
    stationName: z.string(),
    country: z.string(),
    city: z.string(),
    street: z.string(),
    postalCode: z.string(),
    description: z.string().optional()
});

const editStationBody = z.object({
    stationName: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    description: z.string().optional()
});

const memberBody = z.object({
    email: z.string().email().optional(),
    role: z.enum(['USER', 'ADMIN']).optional()
});

const stationParamsSchema = z.object({
    stationId: z.number()
});

const accountsStationsParamsSchema = z.object({
    stationId: z.number(),
    accountId: z.number()
});

const responseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any()
});

export const { schemas: stationSchemas, $ref } = buildJsonSchemas(
    {
        addStationBody,
        editStationBody,
        memberBody,
        stationParamsSchema,
        accountsStationsParamsSchema,
        responseSchema
    },
    {
        $id: 'stationSchemas'
    }
);