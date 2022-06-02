import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/vehicles.schema";
import { getVehicles, getVehicle, addVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicles.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/vehicles';

async function vehicleRoutes(server: FastifyInstance) {

    server.get(
        'stations/:stationId' + path,
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getVehicles
    );

    server.get(
        path + '/:vehicleId',
        {
            preHandler: [server.authorize],
            schema: {
                params: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getVehicle
    );

    server.post(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                body: $ref(''),
                response: {
                    201: $ref(''),
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
                params: $ref(''),
                body: $ref(''),
                response: {
                    201: $ref(''),
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
                params: $ref(''),
                body: $ref(''),
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        deleteVehicle
    );
};

export default vehicleRoutes;