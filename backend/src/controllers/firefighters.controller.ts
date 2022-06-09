import { FastifyRequest, FastifyReply } from "fastify";

import { getStationFirefightersService, getFirefighterService, getFirefighterCoursesService, addFirefighterService, updateFirefighterService, deleteFirefighterService } from "../services/firefighters.service";

interface IGetStationParams {
    stationId: number;
}

interface IGetFirefighterParams {
    firefighterId: number;
}

interface IAddFirefighterBody {

}

interface IUpdateFirefighterBody {

}

export const getStationFirefighters = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const firefighters = await getStationFirefightersService(request.user, request.params.stationId);

        if (firefighters === undefined) {
            reply.code(500).send({});
        }

        if (firefighters === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { firefighters }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getFirefighter = async (request: FastifyRequest<{ Params: IGetFirefighterParams }>, reply: FastifyReply) => {
    try {
        const firefighter = await getFirefighterService(request.user, request.params.firefighterId);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { firefighter }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getFirefighterCourses = async (request: FastifyRequest<{ Params: IGetFirefighterParams }>, reply: FastifyReply) => {
    try {
        const courses = await getFirefighterCoursesService(request.user, request.params.firefighterId);

        if (courses === undefined) {
            reply.code(500).send({});
        }

        if (courses === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { courses }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addFirefighter = async (request: FastifyRequest<{ Body: IAddFirefighterBody }>, reply: FastifyReply) => {
    try {
        const firefighter = await addFirefighterService(request.user, request.body);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: { firefighter }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateFirefighter = async (request: FastifyRequest<{ Body: IUpdateFirefighterBody, Params: IGetFirefighterParams }>, reply: FastifyReply) => {
    try {
        const firefighter = await updateFirefighterService(request.user, request.body, request.params.firefighterId);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { firefighter }
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteFirefighter = async (request: FastifyRequest<{ Params: IGetFirefighterParams }>, reply: FastifyReply) => {
    try {
        const firefighter = await deleteFirefighterService(request.user, request.params.firefighterId);

        if (firefighter === undefined) {
            reply.code(500).send({});
        }

        if (firefighter === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Deleted successfully. ',
            data: {}
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};