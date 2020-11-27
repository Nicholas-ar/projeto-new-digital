export const productPatchParamsSchema = {
  type: 'object',
  properties: {
    query: {
      properties: {
        _id: { type: 'string' },
      },
    },
    newValue: {
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        brand: { type: 'string' },
        category: { type: 'string' },
        weight: { type: 'string' },
        dimensions: { type: 'string' },
        releaseDate: { type: 'number' },
        stock: { type: 'number' },
      },
    },
  },
  required: [
    'name',
    'description',
    'price',
    'brand',
    'category',
    'weight',
    'dimensions',
    'releaseDate',
    'stock',
  ],
};
