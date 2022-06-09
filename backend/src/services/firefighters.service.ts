import { UserType } from 'fastify-jwt';
import prisma from '../utils/prisma';

export async function getStationFirefightersService(user: UserType, stationId: number) {
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

            return await prisma.firefighters.findMany({
                where: { stationId },
                select: {
                    firefighterId: true,
                    stationId: true,
                    registrationNumber: true,
                    shortname: true,
                    firstname: true,
                    secondName: true,
                    lastname: true,
                    sex: true,
                    birthDate: true,
                    birthPlace: true,
                    fatherName: true,
                    pesel: true,
                    documentNumber: true,
                    education: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    phone: true,
                    phone2: true,
                    email: true,
                    bankAccount: true,
                    drivingLicense: true,
                    additionalInfo: true
                }
            });
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getFirefighterService(user: UserType, firefighterId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let firefighter = await prisma.firefighters.findFirst({
                where: { firefighterId },
                select: {
                    firefighterId: true,
                    stationId: true,
                    registrationNumber: true,
                    shortname: true,
                    firstname: true,
                    secondName: true,
                    lastname: true,
                    sex: true,
                    birthDate: true,
                    birthPlace: true,
                    fatherName: true,
                    pesel: true,
                    documentNumber: true,
                    education: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    phone: true,
                    phone2: true,
                    email: true,
                    bankAccount: true,
                    drivingLicense: true,
                    additionalInfo: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: firefighter.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            return firefighter;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getFirefighterCoursesService(user: UserType, firefighterId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let firefighter = await prisma.firefighters.findFirst({
                where: { firefighterId },
                select: {
                    stationId: true,
                    firefighterId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: firefighter.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null) { return null; }

            let courses = await prisma.firefighters_courses.findMany({
                where: { firefighterId: firefighter.firefighterId },
                select: {
                    course: {
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
            courses = courses.map((course: any) => { return course.course })

            return courses;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function addFirefighterService(user: UserType, body: any) {
    try {
        let { stationId, birthDate, ...rest } = body;
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

            let firefighter = await prisma.firefighters.create({
                data: {
                    stationId,
                    birthDate: new Date(birthDate),
                    ...rest
                },
                select: {
                    firefighterId: true,
                    stationId: true,
                    registrationNumber: true,
                    shortname: true,
                    firstname: true,
                    secondName: true,
                    lastname: true,
                    sex: true,
                    birthDate: true,
                    birthPlace: true,
                    fatherName: true,
                    pesel: true,
                    documentNumber: true,
                    education: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    phone: true,
                    phone2: true,
                    email: true,
                    bankAccount: true,
                    drivingLicense: true,
                    additionalInfo: true
                }
            });

            return firefighter;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateFirefighterService(user: UserType, body: any, firefighterId: number) {
    try {
        let { birthDate, ...rest } = body;

        return await prisma.$transaction(async (prisma: any) => {
            let firefighter = await prisma.firefighters.findFirst({
                where: { firefighterId },
                select: {
                    stationId: true,
                    firefighterId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: firefighter.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            firefighter = await prisma.firefighters.update({
                where: {
                    firefighterId: firefighter.firefighterId
                },
                data: {
                    birthDate: new Date(birthDate),
                    ...rest
                },
                select: {
                    firefighterId: true,
                    stationId: true,
                    registrationNumber: true,
                    shortname: true,
                    firstname: true,
                    secondName: true,
                    lastname: true,
                    sex: true,
                    birthDate: true,
                    birthPlace: true,
                    fatherName: true,
                    pesel: true,
                    documentNumber: true,
                    education: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    phone: true,
                    phone2: true,
                    email: true,
                    bankAccount: true,
                    drivingLicense: true,
                    additionalInfo: true
                }
            });

            return firefighter;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteFirefighterService(user: UserType, firefighterId: number) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let firefighter = await prisma.firefighters.findFirst({
                where: { firefighterId },
                select: {
                    stationId: true,
                    firefighterId: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.findFirst({
                where: { stationId: firefighter.stationId, accountId: user.accountId },
                select: {
                    stationId: true,
                    accountId: true,
                    role: true
                }
            });

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            firefighter = await prisma.firefighters.delete({
                where: {
                    firefighterId: firefighter.firefighterId
                },
                select: {
                    firefighterId: true,
                    stationId: true,
                    registrationNumber: true,
                    shortname: true,
                    firstname: true,
                    secondName: true,
                    lastname: true,
                    sex: true,
                    birthDate: true,
                    birthPlace: true,
                    fatherName: true,
                    pesel: true,
                    documentNumber: true,
                    education: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    phone: true,
                    phone2: true,
                    email: true,
                    bankAccount: true,
                    drivingLicense: true,
                    additionalInfo: true
                }
            });

            return firefighter;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};