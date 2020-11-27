export const productsIdPath = {
    patch: {
      tags: ['Products'],
      summary: 'API para atualizar um produto',
      description: 'Essa rota pode ser executada por **qualquer usuário**',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/productPatchParams',
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
                type: 'boolean',
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
    get: {
      tags: ['Products'],
      summary: 'API para retonrnar um produto pelo ID',
      description: 'Essa rota pode ser executada por **qualquer usuário**',
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/schemas/product',
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
  