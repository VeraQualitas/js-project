import { FastifyRequest, FastifyReply } from "fastify";

import { getStationEquipmentsService, getEquipmentService, getEquipmentVehiclesService, addEquipmentService, updateEquipmentService, updateVehicleEquipmentService, deleteEquipmentService, deleteVehicleEquipmentService } from "../services/equipments.service";

interface IGetStationParams {
    stationId: number;
}

interface IGetEquipmentParams {
    equipmentId: number;
}

interface IGetVehicleParams {
    vehicleId: number;
}

interface IGetVehicleAndEquipmentParams {
    vehicleId: number;
    equipmentId: number;
}

interface IAddEquipmentBody {

}

interface IUpdateEquipmentBody {

}

export const getStationEquipments = async (request: FastifyRequest<{ Params: IGetStationParams }>, reply: FastifyReply) => {
    try {
        const equipments = await getStationEquipmentsService(request.user, request.params.stationId);

        if (equipments === undefined) {
            reply.code(500).send({});
        }

        if (equipments === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            data: { equipments }
        };

        reply.code(200).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const getEquipment = async (request: FastifyRequest<{ Params: IGetEquipmentParams }>, reply: FastifyReply) => {
    try {
        const equipment = await getEquipmentService(request.user, request.params.equipmentId);

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

export const getEquipmentVehicles = async (request: FastifyRequest<{ Params: IGetEquipmentParams }>, reply: FastifyReply) => {
    try {
        const vehicles = await getEquipmentVehiclesService(request.user, request.params.equipmentId);

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

export const addEquipment = async (request: FastifyRequest<{ Body: IAddEquipmentBody }>, reply: FastifyReply) => {
    try {
        const equipment = await addEquipmentService(request.user, request.body);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Added successfully. ',
            data: { equipment }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateEquipment = async (request: FastifyRequest<{ Body: IUpdateEquipmentBody, Params: IGetEquipmentParams }>, reply: FastifyReply) => {
    try {
        const equipment = await updateEquipmentService(request.user, request.body, request.params.equipmentId);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
            reply.code(400).send({});
        }

        const response = {
            success: true,
            message: 'Updated successfully. ',
            data: { equipment }
        };

        reply.code(201).send(response);

    } catch (e) {
        console.error(e);
        reply.code(500).send({});
    }
};

export const updateVehicleEquipment = async (request: FastifyRequest<{ Params: IGetVehicleAndEquipmentParams }>, reply: FastifyReply) => {
    try {
        const equipment = await updateVehicleEquipmentService(request.user, request.params.vehicleId, request.params.equipmentId);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
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

export const deleteEquipment = async (request: FastifyRequest<{ Params: IGetEquipmentParams }>, reply: FastifyReply) => {
    try {
        const equipment = await deleteEquipmentService(request.user, request.params.equipmentId);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
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

export const deleteVehicleEquipment = async (request: FastifyRequest<{ Params: IGetVehicleAndEquipmentParams }>, reply: FastifyReply) => {
    try {
        const equipment = await deleteVehicleEquipmentService(request.user, request.params.vehicleId, request.params.equipmentId);

        if (equipment === undefined) {
            reply.code(500).send({});
        }

        if (equipment === null) {
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