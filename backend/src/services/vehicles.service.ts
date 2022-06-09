import { UserType } from 'fastify-jwt';
import prisma from '../utils/prisma';

export async function getStationVehiclesService(user: UserType, stationId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            return await prisma.vehicles.findMany({
                where: { stationId },
                select: {
                    stationId: true,
                    vehicleId: true,
                    vehicleName: true,
                    registration: true,
                    producer: true,
                    trademark: true,
                    type: true,
                    productionDate: true,
                    VIN: true,
                    operationalNumber: true,
                    fuelType: true,
                    fuelCapacity: true,
                    waterCapacity: true,
                    nextInspectionDate: true,
                    CNBOP: true,
                    nextInsuranceTerm: true,
                    policyNumber: true,
                    additionalInfo: true,
                    comments: true
                }
            });

        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getVehicleService(user: UserType, vehicleId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let vehicle = await prisma.vehicles.findFirst({
                where: { vehicleId },
                select: {
                    stationId: true,
                    vehicleId: true,
                    vehicleName: true,
                    registration: true,
                    producer: true,
                    trademark: true,
                    type: true,
                    productionDate: true,
                    VIN: true,
                    operationalNumber: true,
                    fuelType: true,
                    fuelCapacity: true,
                    waterCapacity: true,
                    nextInspectionDate: true,
                    CNBOP: true,
                    nextInsuranceTerm: true,
                    policyNumber: true,
                    additionalInfo: true,
                    comments: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: vehicle.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            return vehicle;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getVehicleEquipmentsService(user: UserType, vehicleId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let vehicle = await prisma.vehicles.findFirst({
                where: { vehicleId },
                select: {
                    stationId: true,
                    vehicleId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: vehicle.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            let equipments = await prisma.vehicles_equipments.findMany({
                where: { vehicleId: vehicle.vehicleId },
                select: {
                    equipment: {
                        select: {
                            equipmentId: true,
                            stationId: true,
                            type: true,
                            trademark: true,
                            productionDate: true,
                            fuelType: true,
                            technicalExamination: true,
                            CNBOP: true,
                            additionalInfo: true
                        }
                    }
                }
            })
            equipments = equipments.map((equipment: any) => { return equipment.equipment })

            return equipments;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function addVehicleService(user: UserType, body: any) {
    try {
        let { stationId, productionDate, nextInspectionDate, nextInsuranceTerm, ...rest } = body;
        return await prisma.$transaction(async (prisma: any) => {
            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            let vehicle = await prisma.vehicles.create({
                data: {
                    stationId,
                    productionDate: new Date(productionDate),
                    nextInspectionDate: new Date(nextInspectionDate),
                    nextInsuranceTerm: new Date(nextInsuranceTerm),
                    ...rest
                },
                select: {
                    stationId: true,
                    vehicleId: true,
                    vehicleName: true,
                    registration: true,
                    producer: true,
                    trademark: true,
                    type: true,
                    productionDate: true,
                    VIN: true,
                    operationalNumber: true,
                    fuelType: true,
                    fuelCapacity: true,
                    waterCapacity: true,
                    nextInspectionDate: true,
                    CNBOP: true,
                    nextInsuranceTerm: true,
                    policyNumber: true,
                    additionalInfo: true,
                    comments: true
                }
            });

            return vehicle;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateVehicleService(user: UserType, body: any, vehicleId: number) {
    try {
        let { productionDate, nextInspectionDate, nextInsuranceTerm, ...rest } = body;

        return await prisma.$transaction(async (prisma: any) => {
            let vehicle = await prisma.vehicles.findFirst({
                where: { vehicleId },
                select: {
                    stationId: true,
                    vehicleId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: vehicle.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            vehicle = await prisma.vehicles.update({
                where: {
                    vehicleId: vehicle.vehicleId
                },
                data: {
                    productionDate: new Date(productionDate),
                    nextInspectionDate: new Date(nextInspectionDate),
                    nextInsuranceTerm: new Date(nextInsuranceTerm),
                    ...rest
                },
                select: {
                    stationId: true,
                    vehicleId: true,
                    vehicleName: true,
                    registration: true,
                    producer: true,
                    trademark: true,
                    type: true,
                    productionDate: true,
                    VIN: true,
                    operationalNumber: true,
                    fuelType: true,
                    fuelCapacity: true,
                    waterCapacity: true,
                    nextInspectionDate: true,
                    CNBOP: true,
                    nextInsuranceTerm: true,
                    policyNumber: true,
                    additionalInfo: true,
                    comments: true
                }
            });

            return vehicle;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteVehicleService(user: UserType, vehicleId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let vehicle = await prisma.vehicles.findFirst({
                where: { vehicleId },
                select: {
                    stationId: true,
                    vehicleId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: vehicle.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            vehicle = await prisma.vehicles.delete({
                where: {
                    vehicleId: vehicle.vehicleId
                },
                select: {
                    stationId: true,
                    vehicleId: true,
                    vehicleName: true,
                    registration: true,
                    producer: true,
                    trademark: true,
                    type: true,
                    productionDate: true,
                    VIN: true,
                    operationalNumber: true,
                    fuelType: true,
                    fuelCapacity: true,
                    waterCapacity: true,
                    nextInspectionDate: true,
                    CNBOP: true,
                    nextInsuranceTerm: true,
                    policyNumber: true,
                    additionalInfo: true,
                    comments: true
                }
            });

            return vehicle;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};