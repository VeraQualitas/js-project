import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const addEquipmentBody = z.object({
    stationId: z.number(),
    type: z.string(),
    trademark: z.string(),
    productionDate: z.string(),
    fuelType: z.string(),
    technicalExamination: z.string(),
    CNBOP: z.string().optional(),
    additionalInfo: z.string().optional()
});

const editEquipmentBody = z.object({
    type: z.string().optional(),
    trademark: z.string().optional(),
    productionDate: z.string().optional(),
    fuelType: z.string().optional(),
    technicalExamination: z.string().optional(),
    CNBOP: z.string().optional().optional(),
    additionalInfo: z.string().optional()
});

const stationParamsSchema = z.object({
    stationId: z.number()
});

const vehicleAndEquipmentParamsSchema = z.object({
    equipmentId: z.number(),
    vehicleId: z.number()
});

const equipmentParamsSchema = z.object({
    equipmentId: z.number()
});

const responseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any()
});

export const { schemas: equipmentSchemas, $ref } = buildJsonSchemas(
    {
        addEquipmentBody,
        editEquipmentBody,
        stationParamsSchema,
        vehicleAndEquipmentParamsSchema,
        equipmentParamsSchema,
        responseSchema
    },
    {
        $id: 'equipmentSchemas'
    }
);