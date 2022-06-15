import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/vehicles.schema";
import { getStationVehicles, getVehicle, getVehicleEquipments, addVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicles.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/vehicles';

async function vehicleRoutes(server: FastifyInstance) {

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
        getStationVehicles
    );

    server.get(
        path + '/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getVehicle
    );

    server.get(
        path + '/:vehicleId/equipments',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleParamsSchema'),
                response: {
                    200: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getVehicleEquipments
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref('addVehicleBody'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        addVehicle
    );

    server.put(
        path + '/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleParamsSchema'),
                body: $ref('editVehicleBody'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        updateVehicle
    );

    server.delete(
        path + '/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref('vehicleParamsSchema'),
                response: {
                    201: $ref('responseSchema'),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteVehicle
    );
};

export default vehicleRoutes;