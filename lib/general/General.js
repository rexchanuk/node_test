const Config = require('../../env.config')
const encrypt = require('./Encryption')
const crypto = require('crypto')
const axios = require("axios")

exports.checkVersion = (pNew, pOld) => {
	let new_arr = pNew.substring(1);
	let old_arr = pOld.substring(1);
	if(parseFloat(new_arr) > parseFloat(old_arr)){return false;}
	return true;
}

exports.getModel = (baseUrl) => {
	let split_value = baseUrl.split('/')
	let b = split_value.pop()
	return b
}
exports.getVersion = (baseUrl) => {
	let split_value = baseUrl.split('/')
	let b = split_value.pop()
	let c = split_value.pop()
	return c
}

exports.exportResponse = (res,httpStatus,pComcde,pLang,pResponse, pStatus, pData, pVersion) => {
	let pReturnData = {"version":pVersion,"errno":pStatus,"errMsg":"","timestamp":this.GetCurrentTimestamp(),"data":pData,"checksum":""}
	pReturnData.errMsg = (pResponse ? "Success":"error")
	pReturnData.checksum = encrypt.SHA265(pReturnData)
	//if(Config.CONSOLE) {console.log("General.js : line_"+__line+" : exports.exportResponse : "+JSON.stringify(pReturnData))}
	res.status(httpStatus).send(pReturnData)
}

exports.exportSocketResult = (pSocket,pMessageHeader, pComcde,pLang,pResponse, pStatus, pData, pVersion) => {
	let pReturnData = {"version":pVersion,"errno":pStatus,"errMsg":"","timestamp":this.GetCurrentTimestamp(),"data":pData,"checksum":""}
	pReturnData.errMsg = (pResponse ? "Success":"error")
	pReturnData.checksum = encrypt.SHA265(pReturnData)
	//if(Config.CONSOLE) {console.log("General.js : line_"+__line+" : exports.exportSocketResult : "+JSON.stringify(pReturnData))}
	pSocket.emit(pMessageHeader, pReturnData)
}
exports.GetCookie = (pCookie, cname) => {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(pCookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
exports.PostRequest = (pUrl, pParam_arr) => {
	return new Promise((resolve, reject) => {
		//if(Config.CONSOLE) {console.log("General.js : line_"+__line+" : exports.PostRequest : "+pUrl+" ::: " +JSON.stringify(pParam_arr))}
		axios.post(pUrl, pParam_arr).then((pResult) => {
			resolve(pResult)
		}, (pError)=>{
			reject(pError)
		})
	})
}
exports.GetRequest = (pUrl) => {
	return new Promise((resolve, reject) => {
		axios.get(pUrl).then((pResult) => {
			resolve(pResult)
		}, (pError)=>{
			reject(pError)
		})
	})
}
exports.InitToken = () =>{
	let emptyStr = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890'
    let system_char =''
    for(var i=0; i<16; i++){
    	let pValue = Math.floor(Math.random() * emptyStr.length).toString()
    	system_char += emptyStr.charAt(pValue)
    }
	return encrypt.SHA265(system_char+new Date().toUTCString())
}
exports.ChangeContentToCode = (pMsg)=>{
	let tmpWord = pMsg.split("\r\n")
	if(tmpWord.length == 1){
		tmpWord = tmpWord[0].split("\r")
	}if(tmpWord.length == 1){
		tmpWord = tmpWord[0].split("\n")
	}
	let returnMessage = ''
	for(var j=0; j<tmpWord.length; j++){
		if(j>0){
			returnMessage+="\n"
		}
		for(var i=0;i<tmpWord[j].length; i++){
			if(tmpWord[j].codePointAt(i).toString(16).indexOf("d") != 0){
				returnMessage+="&#x"+tmpWord[j].codePointAt(i).toString(16).toUpperCase()+";"
			}
		}
	}
	return returnMessage
}
exports.ChangeTimestampFromDB=(pTimestamp)=>{
	return pTimestamp.substr(0,10)+" "+pTimestamp.substr(11,8)+" GMT+0"
}
exports.GetCurrentTimestamp=()=>{
	let pNow=new Date()
	let pMonth = ((pNow.getMonth()+1)<10?"0"+(pNow.getMonth()+1).toString():(pNow.getMonth()+1).toString())
	let pDate = (pNow.getDate()<10?"0"+pNow.getDate().toString():pNow.getDate().toString())
	let pHour = (pNow.getHours()<10?"0"+pNow.getHours().toString():pNow.getHours().toString())
	let pMin = (pNow.getMinutes()<10?"0"+pNow.getMinutes().toString():pNow.getMinutes().toString())
	let pSec = (pNow.getSeconds()<10?"0"+pNow.getSeconds().toString():pNow.getSeconds().toString())
	let pTimestamp=(pNow.getTimezoneOffset()/-60)
	if(pTimestamp >=0){
		pTimestamp = "+"+pTimestamp.toString()
	}else{
		pTimestamp = pTimestamp.toString()
	}
	let curerntTime=pNow.getFullYear().toString()+'-'+pMonth+'-'+pDate+' '+pHour+":"+pMin+':'+pSec
	return curerntTime
}