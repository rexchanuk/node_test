const nodemailer = require("nodemailer")
const Config = require('../../env.config')
const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: Config.AWS_SNS_KEY_ID,
  secretAccessKey: Config.AWS_SNS_ACCESS_KEY,
  region: Config.AWS_SNS_REGION
})
const GeneralFunc = require('./General')
const sns = new AWS.SNS()
const Core = require('@alicloud/pop-core')
const File = require('./File')
const MysqlDB = require('../db/mysql')

exports.AppNotification = (pDB, pSendNotification) =>{
	return new Promise((resolve, reject) => {
		let pQuery_str = ''
		for(var i=0; i<pSendNotification.length; i++){
			pQuery_str += MysqlDB.createSQL("CALL sp_GET_CHATROMMST_getUserNotification(?,?,?,?);", [pSendNotification[i]["comcde"], pSendNotification[i]["roomId"], pSendNotification[i]["receiveridx"], Config.URL])
		}
		//resolve()
		MysqlDB.query(pDB, pQuery_str).then((pProfileResult) => {
			let pcounter=0
			for(let i=0; i<pProfileResult.result.length; i+=2){
				if(pProfileResult.result[i][0]["device_token"] != ''){
					pSendNotification[pcounter]["notify_param"]["device_token"] = pProfileResult.result[i][0]["device_token"]
					pSendNotification[pcounter]["notify_param"]["badge"] = pProfileResult.result[i][0]["badge"]
					//pSendNotification[pcounter]["notify_param"]["id"] = pSendNotification[i]["roomId"]
					//pSendNotification[pcounter]["notify_param"]["roomurl"] = pProfileResult.result[i][0]["url"]
					if(Config.CONSOLE) {console.log("Pushman.js : line_"+__line+" : exports.AppNotification : "+JSON.stringify(pSendNotification))}
					GeneralFunc.PostRequest("http://pushman.pcsfg.com/api/notifications/send", pSendNotification[pcounter]["notify_param"]).then((pResult)=>{}).catch((pError)=>{})
				}
				pcounter++
			}
			resolve()
		}).catch((pError)=>{
			if(Config.CONSOLE) {console.log(pError)}
			resolve()
		})
	})
}

exports.sendEmail = (pEmail, pName, pSubject, pTemplate, pReplaceValue) => {
	return new Promise((resolve, reject) => {
		try{
			//https://nodemailer.com/message/
			let transporter = nodemailer.createTransport({
				host: Config.MAIL_SMTP,
				port: Config.MAIL_SMTP_PORT,
				secure: Config.MAIL_SMTP_AUTH, // true for 465, false for other ports
				auth: {
					user: Config.MAIL_ID, // generated ethereal user
					pass: Config.MAIL_PWD, // generated ethereal password
				},
			});
			
			for(var i in pReplaceValue){
				while(pTemplate.indexOf(i) >= 0){
					pTemplate = pTemplate.replace(i,pReplaceValue[i])
				}
			}
			
			transporter.sendMail({
			    from: '"'+Config.MAIL_SYSTEM_NAME+'" <'+Config.MAIL_SYSTEM_EMAIL+'>', // sender address
			    to: '"'+pName+'" <'+pEmail+'>', // list of receivers
			    subject: pSubject, // Subject line
			    //text: "Hello world?", // plain text body
			    html: pTemplate, // html body
			    // cc :
			    // bcc :
			    // attachments : [{filename:"",path:""}]
			  }).then((info) => {
				  resolve(true)
			  });
		}catch(e){
			resolve(null);
		}
	})
}

exports.sendAWS_SMS = (pPhone, pMessage) => {
	return new Promise((resolve, reject) => {
		sns.publish({
			'Message': pMessage,
			"Subject" : Config.AWS_SNS_SUBJECT,
			'PhoneNumber': pPhone.replace('-',''),
		}, (error, result) => {
			if(error == null){
				resolve(result)                                                                                           
			}else{
				reject(error)
			}
		})
	})
}

exports.sendAlibaba_SMS_China = (pPhone, pTemplateID, pMessageParam) => {
	return new Promise((resolve, reject) => {
		var requestOption = {method: 'POST'}
		var client = new Core({
		    accessKeyId: Config.ALIBABA_SMS_KEY_ID,
		    accessKeySecret: Config.ALIBABA_SMS_ACCESS_KEY,
		    endpoint: 'dysmsapi.'+Config.ALIBABA_SMS_REGION+'.aliyuncs.com',
		    apiVersion: '2018-05-01'
		})
		var params = {
		    "RegionId": Config.ALIBABA_SMS_REGION,
		    "To": pPhone.replace('-','').replace('+',''),
		    "TemplateCode": pTemplateID,
		    "From": Config.ALIBABA_SMS_FROM,
		    "TemplateParam": pMessageParam, //Optional
		}
		client.request('SendMessageWithTemplate', params, requestOption).then((result) => {
		    if(Config.CONSOLE) {console.log(result)}
		    resolve(result)
		}, (ex) => {
		    if(Config.CONSOLE) {console.log(ex)}
		    reject(ex)
		})
	})
}

exports.sendAlibaba_SMS_Global = (pPhone, pMessage) => {
	return new Promise((resolve, reject) => {
		var requestOption = {method: 'POST'}
		var client = new Core({
			accessKeyId: Config.ALIBABA_SMS_KEY_ID,
		    accessKeySecret: Config.ALIBABA_SMS_ACCESS_KEY,
		    endpoint: 'https://sms-intl.'+Config.ALIBABA_SMS_REGION+'.aliyuncs.com',
		    apiVersion: '2018-05-01'
		});
		var params = {
		    "RegionId": Config.ALIBABA_SMS_REGION,
		    "To": pPhone.replace('-','').replace('+',''),
		    "Message": pMessage,
		    "From": Config.ALIBABA_SMS_FROM
		}
		client.request('SendMessageToGlobe', params, requestOption).then((result) => {
		    if(Config.CONSOLE) {console.log(result)}
		    resolve(result)
		}, (ex) => {
		    if(Config.CONSOLE) {console.log(ex)}
		    reject(ex)
		})
	})
}