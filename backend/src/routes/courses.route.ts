import { FastifyInstance } from "fastify";

import { $ref } from "../schemas/courses.schema";
import { getCourses, getCourse, addCourse, updateCourse, deleteCourse } from '../controllers/courses.controller';
import { e400Properties, e500Properties } from "./_error_opts";

const path = '/courses';

async function courseRoutes(server: FastifyInstance) {

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
        getCourses
    );

    server.get(
        path + '/:courseId',
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
        getCourse
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
        addCourse
    );

    server.put(
        path + '/:courseId',
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
        updateCourse
    );

    server.delete(
        path + '/:courseId',
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
        deleteCourse
    );
};

export default courseRoutes;