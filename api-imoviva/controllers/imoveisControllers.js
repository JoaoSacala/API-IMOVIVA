const imoveisModels = require('../models/imoveisModels');

const getAll = async (req, res) => {
    const imoveis = await imoveisModels.getAll(req.body);
    return res.status(200).json(imoveis);
};

const createImoveis = async (req, res) => {
    if(req.files && req.body) {
        
        const createdImoveis = await imoveisModels.createImoveis(req.body, req.files);
    
        return res.status(201).json(createdImoveis);
    }
};

module.exports = {
    getAll,
    createImoveis,
};