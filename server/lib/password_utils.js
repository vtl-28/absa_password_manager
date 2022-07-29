const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
let encyptedKey, decryptedKey;

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function encrypt(appPassword) {
  let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  encyptedKey = cipher.update(appPassword, "utf8", "hex");
  encyptedKey += cipher.final("hex");
  console.log(encyptedKey);
  return encyptedKey;
}
function decrypt(encyptedKey) {
  let decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  decryptedKey = decipher.update(encyptedKey, "hex", "utf-8");
  decryptedKey += decipher.final("utf8");
  console.log(decryptedKey);
  return decryptedKey;
}

module.exports = {
  genPassword,
  validPassword,
  decrypt,
  encrypt,
};
