/**
 * Receives Req and Res from Express and adapts to our architecture
 * @param {Class} controller - Object constructor
 * @param {string} method - methods of the controllers
 */

export const expressRouterAdapter = (controller, method) => {
    return async (req, res) =>{
        const httpRequest = {body: req.body};

        const httpResponse = await controller[method](httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);

    };
    
};
 
