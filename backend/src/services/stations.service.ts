import { UserType } from 'fastify-jwt';
import prisma from '../utils/prisma';

export async function getStationsService(user: UserType) {
    try {
        let stations = await prisma.accounts_stations.findMany({
            where: { accountId: user.accountId },
            select: {
                station: {
                    select: {
                        stationId: true,
                        stationName: true,
                        country: true,
                        city: true,
                        street: true,
                        postalCode: true,
                        description: true
                    }
                }
            }
        });
        stations = stations.map((station: any) => { return station.station })
        return stations;

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getStationService(user: UserType, stationId: number) {
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

            return await prisma.stations.findFirst({
                where: { stationId, },
                select: {
                    stationId: true,
                    stationName: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    description: true
                }
            });
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getStationMembersService(user: UserType, stationId: number) {
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

            let members = await prisma.accounts_stations.findMany({
                where: { stationId },
                select: {
                    role: true,
                    account: {
                        select: {
                            accountId: true,
                            email: true,
                            firstname: true,
                            lastname: true,
                            phone: true,
                            description: true
                        }
                    }
                }
            });
            members = members.map((member: any) => { return { role: member.role, ...member.account } });
            return members;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function getStationMemberService(user: UserType, stationId: number, accountId: number) {
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

            let member = await prisma.accounts_stations.findFirst({
                where: { stationId, accountId },
                select: {
                    role: true,
                    account: {
                        select: {
                            accountId: true,
                            email: true,
                            firstname: true,
                            lastname: true,
                            phone: true,
                            description: true
                        }
                    }
                }
            });
            return member !== null ? { role: member.role, ...member.account } : null;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function addStationService(user: UserType, body: any) {
    try {
        return await prisma.$transaction(async (prisma: any) => {
            let station = await prisma.stations.create({
                data: {
                    ...body
                },
                select: {
                    stationId: true,
                    stationName: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    description: true
                }
            });

            let accounts_stations = await prisma.accounts_stations.create({
                data: {
                    accountId: user.accountId,
                    stationId: station.stationId,
                    role: 'ADMIN'
                }
            });

            return station;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function addMemberToStationByEmailService(user: UserType, body: any, stationId: number) {
    try {
        let { role, email } = body;

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

            let accountToAdd = await prisma.accounts.findFirst({
                where: { email },
                select: {
                    accountId: true
                },
            });

            let new_accounts_stations = await prisma.accounts_stations.upsert({
                where: { accountId_stationId: { accountId: accountToAdd.accountId, stationId } },
                create: {
                    accountId: accountToAdd.accountId,
                    stationId: stationId,
                    role
                },
                update: { role },
                select: { role: true }
            });

            return new_accounts_stations;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateStationService(user: UserType, body: any, stationId: number) {
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

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            let station = await prisma.stations.update({
                where: {
                    stationId
                },
                data: {
                    ...body
                },
                select: {
                    stationId: true,
                    stationName: true,
                    country: true,
                    city: true,
                    street: true,
                    postalCode: true,
                    description: true
                }
            });

            return station;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function updateMemberInStationService(user: UserType, body: any, stationId: number, accountId: number) {
    try {
        let { role } = body;

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

            let accountToUpdate = await prisma.accounts_stations.update({
                where: { accountId_stationId: { accountId, stationId } },
                data: {
                    role
                },
                select: {
                    role: true
                }
            });

            return accountToUpdate;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteStationService(user: UserType, stationId: number) {
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

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            let success = await prisma.stations.delete({
                where: { stationId }
            });

            return success > 0 ? {} : null;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};

export async function deleteMemberFromStationService(user: UserType, stationId: number, accountId: number) {
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

            if (accounts_stations === null || accounts_stations.role !== 'ADMIN') { return null; }

            let success = await prisma.accounts_stations.delete({
                where: { accountId_stationId: { accountId, stationId } }
            });

            return await success;
        });

    } catch (e) {
        console.error(e);
        return undefined;
    }
};