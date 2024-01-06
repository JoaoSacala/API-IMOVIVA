const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (_req, _file, callback) => {
            callback(null, './public/image');
        }, 
        filename: (_req, file, callback) => {
            callback(null, Date.now().toString() + '_' + file.originalname);
        }
    }),
    fileFilter: (req, file, callback) => {
        const extension = ['image/png', 'image/jpeg', 'image/jpg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(!extension){
            return callback(null, false);
        }
        
        
        return callback(null, true);
        
    }
}));