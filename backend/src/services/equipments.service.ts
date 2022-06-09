import { UserType } from 'fastify-jwt';
import prisma from '../utils/prisma';

export async function getStationEquipmentsService(user: UserType, stationId: number) {
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

            return await prisma.equipments.findMany({
                where: { stationId },
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
            });

        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getEquipmentService(user: UserType, equipmentId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
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
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getEquipmentVehiclesService(user: UserType, equipmentId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
                select: {
                    stationId: true,
                    equipmentId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            let vehicles = await prisma.vehicles_equipments.findMany({
                where: { equipmentId: equipment.equipmentId },
                select: {
                    
                    vehicle: {
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
                    }
                }
            })
            vehicles = vehicles.map((vehicle: any) => { return vehicle.vehicle })

            return vehicles;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function addEquipmentService(user: UserType, body: any) {
    try {
        let { stationId, productionDate, technicalExamination, ...rest } = body;
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

            let equipment = await prisma.equipments.create({
                data: {
                    stationId,
                    productionDate: new Date(productionDate),
                    technicalExamination: new Date(technicalExamination),
                    ...rest
                },
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
            });

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateEquipmentService(user: UserType, body: any, equipmentId: number) {
    try {
        let { productionDate, technicalExamination, ...rest } = body;

        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
                select: {
                    stationId: true,
                    equipmentId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            equipment = await prisma.equipments.update({
                where: {
                    equipmentId: equipment.equipmentId
                },
                data: {
                    productionDate: new Date(productionDate),
                    technicalExamination: new Date(technicalExamination),
                    ...rest
                },
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
            });

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateVehicleEquipmentService(user: UserType, vehicleId: number, equipmentId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
                select: {
                    stationId: true,
                    equipmentId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            equipment = await prisma.vehicles_equipments.upsert({
                where: {
                    stationId_vehicleId_equipmentId: {
                        equipmentId: equipmentId, 
                        vehicleId, 
                        stationId: equipment.stationId
                    }
                },
                create: {
                    equipmentId: equipmentId, 
                    vehicleId, 
                    stationId: equipment.stationId
                },
                update: {},
                select: {
                    equipmentId: true,
                    stationId: true,
                    vehicleId: true
                }
            });

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteEquipmentService(user: UserType, equipmentId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
                select: {
                    stationId: true,
                    equipmentId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            equipment = await prisma.equipments.delete({
                where: {
                    equipmentId: equipment.equipmentId
                },
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
            });

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteVehicleEquipmentService(user: UserType, vehicleId: number, equipmentId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let equipment = await prisma.equipments.findFirst({
                where: { equipmentId },
                select: {
                    stationId: true,
                    equipmentId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: equipment.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            equipment = await prisma.vehicles_equipments.delete({
                where: {
                    stationId_vehicleId_equipmentId: {
                        equipmentId: equipmentId, 
                        vehicleId, 
                        stationId: equipment.stationId
                    }
                },
                select: {
                    equipmentId: true,
                    stationId: true,
                    vehicleId: true
                }
            });

            return equipment;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};