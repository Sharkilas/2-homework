export const httpStatusCodes = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTEND_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    INTERNAL_SERVER_500: 500
  } as const

export type httpStatusCodes = string 

export const errorsMessages = {
    message: 'string',
field: 'string'
  }


export type errorsMessages = string
