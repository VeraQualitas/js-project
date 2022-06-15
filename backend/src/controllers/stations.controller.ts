import { FastifyRequest, FastifyReply } from "fastify";

import { getStationsService, getStationService, getStationMembersService, getStationMemberService, addStationService, addMemberToStationByEmailService, updateStationService, updateMemberInStationService, deleteStationService, deleteMemberFromStationService } from "../services/stations.service";

interface IGetStationParams {
    stationId: number;
}

interface IGetAccountsStationsParams {
    stationId: number;
    accountId: number;
}

interface IAddStationBody {

}

interface IAddMemberToStationBody {

}

interface IUpdateStationBody {

}

interface IUpdateMemberInStationBody {

}

export const getStations = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const stations = await getStationsService(request.user);

        if (stations === undefined) {
            reply.code(500).send({});
        }

        if (stations === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { stations }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getStation = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const station = await getStationService(request.user, request.params.stationId);

        if (station === undefined) {
            reply.code(500).send({});
        }

        if (station === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { station }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getStationMembers = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const members = await getStationMembersService(request.user, request.params.stationId);

        if (members === undefined) {
            reply.code(500).send({});
        }

        if (members === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { members }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getStationMember = async (request: FastifyRequest<{ Params: IGetAccountsStationsParams }>, reply: FastifyReply) => {
    try {
        const member = await getStationMemberService(request.user, request.params.stationId, request.params.accountId);

        if (member === undefined) {
            reply.code(500).send({});
        }

        if (member === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { member }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addStation = async (request: FastifyRequest<{ Body: IAddStationBody }>, reply: FastifyReply) => {
    try {
        const station = await addStationService(request.user, request.body);

        if (station === undefined) {
            reply.code(500).send({});
        }

        if (station === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: { station }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addMemberToStationByEmail = async (request: FastifyRequest<{ Body: IAddMemberToStationBody, Params: IGetStationParams }>, reply: FastifyReply) => {

    try {
        const member = await addMemberToStationByEmailService(request.user, request.body, request.params.stationId);

        if (member === undefined) {
            reply.code(500).send({});
        }

        if (member === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateStation = async (request: FastifyRequest<{ Body: IUpdateStationBody, Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const station = await updateStationService(request.user, request.body, request.params.stationId);

        if (station === undefined) {
            reply.code(500).send({});
        }

        if (station === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { station }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateMemberInStation = async (request: FastifyRequest<{ Body: IUpdateMemberInStationBody, Params: IGetAccountsStationsParams }>, reply: FastifyReply) => {
    try {
        const member = await updateMemberInStationService(request.user, request.body, request.params.stationId, request.params.accountId);

        if (member === undefined) {
            reply.code(500).send({});
        }

        if (member === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteStation = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const station = await deleteStationService(request.user, request.params.stationId);

        if (station === undefined) {
            reply.code(500).send({});
        }

        if (station === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Deleted successfully. ',
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteMemberFromStation = async (request: FastifyRequest<{ Params: IGetAccountsStationsParams }>, reply: FastifyReply) => {
    try {
        const member = await deleteMemberFromStationService(request.user, request.params.stationId, request.params.accountId);

        if (member === undefined) {
            reply.code(500).send({});
        }

        if (member === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Deleted successfully. ',
            data: {}
        };
        console.log(response)

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};