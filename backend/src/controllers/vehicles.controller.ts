import { FastifyRequest, FastifyReply } from "fastify";

import { getStationVehiclesService, getVehicleService, getVehicleEquipmentsService, addVehicleService, updateVehicleService, deleteVehicleService } from "../services/vehicles.service";

interface IGetStationParams {
    stationId: number;
}

interface IGetVehicleParams {
    vehicleId: number;
}

interface IAddVehicleBody {

}

interface IUpdateVehicleBody {

}

export const getStationVehicles = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const vehicles = await getStationVehiclesService(request.user, request.params.stationId);

        if (vehicles === undefined) {
            reply.code(500).send({});
        }

        if (vehicles === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { vehicles }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getVehicle = async (request: FastifyRequest<{ Params: IGetVehicleParams }>, reply: FastifyReply) => {
    try {
        const vehicle = await getVehicleService(request.user, request.params.vehicleId);

        if (vehicle === undefined) {
            reply.code(500).send({});
        }

        if (vehicle === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { vehicle }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getVehicleEquipments = async (request: FastifyRequest<{ Params: IGetVehicleParams }>, reply: FastifyReply) => {
    try {
        const equipment = await getVehicleEquipmentsService(request.user, request.params.vehicleId);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { equipment }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const addVehicle = async (request: FastifyRequest<{ Body: IAddVehicleBody }>, reply: FastifyReply) => {
    try {
        const vehicle = await addVehicleService(request.user, request.body);

        if (vehicle === undefined) {
            reply.code(500).send({});
        }

        if (vehicle === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: { vehicle }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateVehicle = async (request: FastifyRequest<{ Body: IUpdateVehicleBody, Params: IGetVehicleParams }>, reply: FastifyReply) => {
    try {
        const vehicle = await updateVehicleService(request.user, request.body, request.params.vehicleId);

        if (vehicle === undefined) {
            reply.code(500).send({});
        }

        if (vehicle === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { vehicle }
        };

        reply.code(204).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const deleteVehicle = async (request: FastifyRequest<{ Params: IGetVehicleParams }>, reply: FastifyReply) => {
    try {
        const vehicle = await deleteVehicleService(request.user, request.params.vehicleId);

        if (vehicle === undefined) {
            reply.code(500).send({});
        }

        if (vehicle === null) {
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