export const e500Properties = {
    type: 'object',
    properties: { success: { type: 'boolean', default: false }, message: { type: 'string', default: 'An unexpected error has occured. ' } }
}

export const e400Properties = {
    type: 'object',
    properties: { success: { type: 'boolean', default: false }, message: { type: 'string', default: 'Bad request. ' } }
}