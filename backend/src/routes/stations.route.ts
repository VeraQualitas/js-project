import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/stations.schema";
import { getStations, getStation, addStation, updateStation, deleteStation } from '../controllers/stations.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/stations';

async function stationRoutes(server: FastifyInstance) {

    server.get(
        path,
        {
            preHandler: [server.authorize],
            schema: {
                response: {
                    201: $ref(''),
                    400: e400Properties,
                    500: e500Properties,
                }
            }
        },
        getStations
    );

    server.get(
        path + '/:stationId',
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
        getStation
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
        addStation
    );

    server.put(
        path + '/:stationId',
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
        updateStation
    );

    server.delete(
        path + '/:stationId',
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
        deleteStation
    );
};

export default stationRoutes;