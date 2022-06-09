import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const addFirefighterBody = z.object({
    stationId: z.number(),
    type: z.enum(['CASUAL', 'SUPPORTING', 'YOUNG', 'HONORABLE']),
    registrationNumber: z.string().optional(),
    shortname: z.string(),
    firstname: z.string().optional(),
    secondName: z.string().optional(),
    lastname: z.string().optional(),
    sex: z.enum(['MAN', 'WOMAN']),
    birthDate: z.string().optional(),
    birthPlace: z.string().optional(),
    fatherName: z.string().optional(),
    pesel: z.string().optional(),
    documentNumber: z.string().optional(),
    education: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    phone: z.string().optional(),
    phone2: z.string().optional(),
    email: z.string().optional(),
    bankAccount: z.string().optional(),
    drivingLicense: z.boolean(),
    additionalInfo: z.string().optional(),
});

const editFirefighterBody = z.object({
    type: z.enum(['CASUAL', 'SUPPORTING', 'YOUNG', 'HONORABLE']).optional(),
    registrationNumber: z.string().optional(),
    shortname: z.string().optional(),
    firstname: z.string().optional(),
    secondName: z.string().optional(),
    lastname: z.string().optional(),
    sex: z.enum(['MAN', 'WOMAN']).optional(),
    birthDate: z.string().optional(),
    birthPlace: z.string().optional(),
    fatherName: z.string().optional(),
    pesel: z.string().optional(),
    documentNumber: z.string().optional(),
    education: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    phone: z.string().optional(),
    phone2: z.string().optional(),
    email: z.string().optional(),
    bankAccount: z.string().optional(),
    drivingLicense: z.boolean().optional(),
    additionalInfo: z.string().optional(),
});

const stationParamsSchema = z.object({
    stationId: z.number()
});

const firefighterParamsSchema = z.object({
    firefighterId: z.number()
});

const responseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any()
});

export const { schemas: firefighterSchemas, $ref } = buildJsonSchemas(
    {
        addFirefighterBody,
        editFirefighterBody,
        stationParamsSchema,
        firefighterParamsSchema,
        responseSchema
    },
    {
        $id: 'firefighterSchemas'
    }
);