import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/equipments.schema";
import { getStationEquipments, getEquipment, getEquipmentVehicles, addEquipment, updateEquipment, updateVehicleEquipment, deleteEquipment, deleteVehicleEquipment } from '../controllers/equipments.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/equipments';

async function equipmentRoutes(server: FastifyInstance) {

    server.get(
        '/stations/:stationId' + path,
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('stationParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getStationEquipments
    );

    server.get(
        path + '/:equipmentId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('equipmentParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getEquipment
    );

    server.get(
        path + '/:equipmentId/vehicles',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('equipmentParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getEquipmentVehicles
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('addEquipmentBody'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        addEquipment
    );

    server.put(
        path + '/:equipmentId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('equipmentParamsSchema'),
                body: $ref('editEquipmentBody'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateEquipment
    );

    server.put(
        path + '/:equipmentId/vehicles/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleAndEquipmentParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateVehicleEquipment
    );

    server.delete(
        path + '/:equipmentId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('equipmentParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteEquipment
    );

    server.delete(
        path + '/:equipmentId/vehicles/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleAndEquipmentParamsSchema'),
                response: {
                    204: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteVehicleEquipment
    );
};

export default equipmentRoutes;
