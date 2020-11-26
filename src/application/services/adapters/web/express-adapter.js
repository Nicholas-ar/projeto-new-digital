/**
 * Receives Req and Res from Express and adapts to our architecture
 * @param {Controller} controller - Object constructor
 * @param {string} method - methods of the controllers
 */

export const expressRouterAdapter = (controller, method) => {
    return async (req, res) =>{
        const httpRequest = {body: req.body, params:req.params};

        const httpResponse = await controller[method](httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);

    };
    
};
 
