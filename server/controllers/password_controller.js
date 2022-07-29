const Password = require('../models/password');
const User = require('../models/user');
const gen_password = require('../lib/password_utils').genPassword;
const { encrypt,  decrypt } = require('../lib/password_utils');
let encryptedKey = '', decryptedKey = '';

module.exports = {
    //handler to create and store user application password
    create: (req, res, next) => {
        encryptedKey = encrypt(req.body.application_password);
        
        let password_params = {
            department: req.body.department,
            application_name: req.body.appication_name,
            username: req.body.username,
            application_password: encryptedKey
        }

        Password.create(password_params).then(password => {
            res.status(200).send(password);
        }).catch(error => {
            res.status(404).send(`Error saving password: ${error.message}`)
            
        });
    },
    show_application_password: (req, res, next) => {
        Password.find()
        .then(password => {   
                res.status(200).send(password);
            
        }).catch(error => {
            res.status(404).send(`Error retrieving last inserted application password: ${error.message}`);
        });
    },
    decrypt_application_password: (req, res, next) => {
        decryptedKey = decrypt(encryptedKey);
        Password.findOne({ application_password: encryptedKey }).then(password => {   
            res.status(200).send(decryptedKey);
        }).catch(error => {
            res.status(404).send(`Error fetching and decrypting password: ${error.message}`)
        })
    },
    delete_password: (req, res, next) => {
        Password.findByIdAndRemove({_id: req.params.id})
        .then((data) => {
            res.json({ message: "Application password deleted successfully", data })
        }).catch((error) => {
            res.status(404).send(`Application password delete failed: ${error.message}`)
        })
        
    }
}