const crypto = require('crypto')
const Config = require('../../env.config')
const axios = require('axios')
var aes256 = require('aes256');
	
exports.SHA265 = (pString) => {
	var hash = crypto.createHash('sha256')
	var return_str = ''
	if(typeof pString == 'undefined'){
		
	}else if(typeof pString == 'object'){
		return_str= hash.update(JSON.stringify(pString)).digest('hex')
	}else{
		return_str = hash.update(pString).digest('hex')
	}
	hash.end()
	return return_str
}

exports.Base64Encode = (pString) => {
	return Buffer.from(pString).toString('base64')
}
exports.Base64Decode = (pString) => {
	return Buffer.from(pString).toString('utf8')
}
exports.AES256Encode = (pString) => {
	var cipher = aes256.createCipher(this.Base64Encode(Config.ENCRYPTKEY))
	return cipher.encrypt(pString)
}
exports.AES256Decode = (pString) => {
	var cipher = aes256.createCipher(this.Base64Encode(config.ENCRYPTKEY))
	return cipher.decrypt(pString)
}