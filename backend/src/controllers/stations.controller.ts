import { FastifyRequest, FastifyReply } from "fastify";

import { registerAccountService, findAccountByEmail } from "../services/accounts.service";
import { RegisterAccountInput, LoginAccountInput } from "../schemas/accounts.schema";
import { verifyPassword } from "../utils/hash";
import { server } from "../app";

export const getStations = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getStation = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addStation = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateStation = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteStation = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body;

    try {
        const account = await registerAccountService(body);

        if (account === undefined) {
            reply.code(500).send({});
        }

        if (account === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: {}
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};