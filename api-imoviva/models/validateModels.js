const connection = require('./connection');

async function ValidateUser(id) {

    const [data] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);

    if(!data || data[0].length == 0) {
        return;
    }

    return data[0];
}


module.exports = ValidateUser;