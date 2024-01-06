const connection = require('./connection');

const getAll = async () => {
    const [imoveis] = await connection.execute('SELECT * FROM imoveis');
    
    const fotos = [];
    
    imoveis.find(imovel => {
        const filename = imovel.fotos.split(' ');

        if (filename.length === 2 ) {
            fotos.push({
                foto1: filename[0],
                foto2: filename[1]
            });
        } else if (filename.length === 3 ) {
            fotos.push({
                foto1: filename[0],
                foto2: filename[1],
                foto3: filename[2]
            });
        } else  if (filename.length === 4) {
            fotos.push({
                foto1: filename[0],
                foto2: filename[1],
                foto3: filename[2],
                foto4: filename[3]
            });
        } else  if (filename.length === 5) {
            fotos.push({
                foto1: filename[0],
                foto2: filename[1],
                foto3: filename[2],
                foto4: filename[3],
                foto5: filename[4],
            });
        }
    });

    const AllImoveis = [];

    for (let i = 0; i < imoveis.length; i++) {
        AllImoveis.push({...imoveis[i], fotos: fotos[i]});
    }

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