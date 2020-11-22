export const expressRouterAdapter = (controller, method) => {
    return async (req, res) =>{
        const httpRequest = {body: req.body};

        const httpResponse = await controller[method](httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);

    };
    
};
 