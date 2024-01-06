const connection = require('./connection');

const getAll = async () => {
    const [imoveis] = await connection.execute(
        'SELECT * FROM imoveis INNER JOIN apartamentos ON imoveis.id = apartamentos.id_imovel',
    );
    
    
    const AllImoveis = imoveis.map(imovel => {
        const filenames = imovel.fotos.split(' ');
        const fotos = filenames.map(filename => (filename));
        return { ...imovel, fotos };
    });
    

    return AllImoveis;
    
};

const createImoveis = async (imovel, images) => {
    const {
        tipo_imovel,
        titulo,
        preco,
        dimensoes,
        municipio,
        distrito,
        bairro,
        quartos,
        banheiros,
        suites,
        detalhes,
        tipo_anuncio,
    } = imovel;
  
    const ArrayFotos = [];
  
    images.forEach((image) => {ArrayFotos.push(image.filename);
    });
  
    const fotos = ArrayFotos.join(' ');
  
    const queryImoveis = 'INSERT INTO imoveis(tipo_imovel, titulo, preco, dimensoes, municipio, distrito, bairro, fotos, detalhes, tipo_anuncio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
    const [resultImoveis] = await connection.execute(queryImoveis, [
        tipo_imovel,
        titulo,
        preco,
        dimensoes,
        municipio,
        distrito,
        bairro,
        fotos,
        detalhes,
        tipo_anuncio,
    ]);
  
    const id_imovel = resultImoveis.insertId;
  
    const queryApartamentos = 'INSERT INTO apartamentos (id_imovel, quartos, banheiros, suites) VALUES (?, ?, ?, ?)';
  
    await connection.execute(queryApartamentos, [id_imovel, quartos, banheiros, suites]);
  
    return { insertId: id_imovel, queryApartamentos };
};

module.exports = {
    getAll,
    createImoveis,
};