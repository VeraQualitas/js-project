import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const addVehicleBody = z.object({
    stationId: z.number(),
    vehicleName: z.string(),
    registration: z.string(),
    producer: z.string(),
    trademark: z.string(),
    type: z.string(),
    productionDate: z.string(),
    VIN: z.string(),
    operationalNumber: z.string().optional(),
    fuelType: z.enum(['AVGAS', 'AVTUR', 'KEROSENE', 'SOLAR_OIL', 'DIESEL_OIL', 'FUEL_OIL', 'BIODIESEL', 'GASOLINE']),
    fuelCapacity: z.number().optional(),
    waterCapacity: z.number().optional(),
    nextInspectionDate: z.string(),
    CNBOP: z.string().optional(),
    nextInsuranceTerm: z.string(),
    policyNumber: z.string().optional(),
    additionalInfo: z.string().optional(),
    comments: z.string().optional()
});

const editVehicleBody = z.object({
    vehicleName: z.string().optional(),
    registration: z.string().optional(),
    producer: z.string().optional(),
    trademark: z.string().optional(),
    type: z.string().optional(),
    productionDate: z.string().optional(),
    VIN: z.string().optional(),
    operationalNumber: z.string().optional(),
    fuelType: z.enum(['AVGAS', 'AVTUR', 'KEROSENE', 'SOLAR_OIL', 'DIESEL_OIL', 'FUEL_OIL', 'BIODIESEL', 'GASOLINE']).optional(),
    fuelCapacity: z.number().optional(),
    waterCapacity: z.number().optional(),
    nextInspectionDate: z.string().optional(),
    CNBOP: z.string().optional(),
    nextInsuranceTerm: z.string().optional(),
    policyNumber: z.string().optional(),
    additionalInfo: z.string().optional(),
    comments: z.string().optional()
});

const stationParamsSchema = z.object({
    stationId: z.number()
});

const vehicleParamsSchema = z.object({
    vehicleId: z.number()
});

const responseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any()
});

export const { schemas: vehicleSchemas, $ref } = buildJsonSchemas(
    {
        addVehicleBody,
        editVehicleBody,
        stationParamsSchema,
        vehicleParamsSchema,
        responseSchema
    },
    {
        $id: 'vehicleSchemas'
    }
);