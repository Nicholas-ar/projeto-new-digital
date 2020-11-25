export const signupPath = {
    post: {
      tags: ['Sign Up'],
      summary: 'API para criar um usuário',
      description: 'Essa rota pode ser executada por **qualquer usuário**',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/signinParams',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/schemas/signupParams',
              },
            },
          },
        },
        400: {
          $ref: '#/components/badRequest',
        },
        401: {
          $ref: '#/components/unauthorized',
        },
        404: {
          $ref: '#/components/notFound',
        },
        500: {
          $ref: '#/components/serverError',
        },
      },
    },
  };
  