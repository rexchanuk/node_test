module.exports = {
	"port": 3500,
	"host":"localhost",
	"environment": "dev",
	"FILE_CHMOD":false,
	"TOKENSTR":"PAocHUGr0u9",
	"ENCRYPTMETHOD":"AES-256",
	"ENCRYPTKEY":"ThisisakeyforEncryptKey",
	"DEBUG":true,
	"CONSOLE":true,
	"VERSION":"v1.0",
	
	"secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS FOR TEST",
	
	/* Path Config */
	"rootpath":"C:\\xampp\\htdocs\\node_test\\",
	
	/* Path Config */
	
	/* DB config */
	//"mongoDbUri": "mongodb://localhost:27017",
	//"dbname":"service360react",
	"mysqlhost":"localhost",
	"mysqldb":"node_test",
	"mysqluser":"root",
	"mysqlpwd":"abyrexchan",
	/* DB config */
	
	/* Email Config */
	"MAIL_SMTP":"XXXXXX",
	"MAIL_SMTP_PORT":25,
	"MAIL_SMTP_AUTH":false,
	"MAIL_SYSTEM_NAME":"System",
	"MAIL_SYSTEM_EMAIL":"XXXX@XXX.com",
	"MAIL_ID":"",
	"MAIL_PWD":"",
	/* Email Config */
	
	/* SNS Config */
	"AWS_SNS_REGION":"",
	"AWS_SNS_KEY_ID":"",
	"AWS_SNS_ACCESS_KEY":"",
	"AWS_SNS_SUBJECT":"",
	"ALIBABA_SMS_REGION":"",
	"ALIBABA_SMS_KEY_ID":"",
	"ALIBABA_SMS_ACCESS_KEY":"",
	"ALIBABA_SMS_FROM":"",
	"DEFAULT_SMS":"AWS",	// AWS / ALIBABA
	/* SNS Config */
	
	/* ALIBABA TEMPLATE CODE */
	"ALIBABA_SMS_VERIFY_CODE":"",
	
	/* ALIBABA TEMPLATE CODE */
	
	/* ALI-OSS */
	"ALIYUNOSSAccessKeyId":"",
	"ALIYUNOSSAccessKeySecret":"",
	"ALIYUNOSSRegion":"",
	"ALIYUNOSSEndPoint":"",
	"ALIYUNOSSBucket":"",
	"ALIYUNOSSMasterFolder":"",
	
	/* Message Filter */
	"FilterWord":["仆街","fuck","shit","冚家剷","冚加剷","冚+剷","冚嘉剷","亻卜彳圭亍","仆彳圭亍","亻卜街","閪","仆徍亍","亻卜徍亍","食屎","屌你","屌那星","屌那媽","屌老母","屌你老母","屌妳老母","屌您老母","撚樣","屌9你","食撚屎","呆9","呆撚9","呆撚狗","柒樣","撚柒","呆狗","dumn","屌鳩星","呆鳩","呆撚鳩","戇DOG","戇鳩","戇9","on鳩","屎窟鬼","乜撚野","柑蕉桔梨碌柚","雁鷲鵰狸獅狒","鵰狗豹狸","金錳碘鈮鈹鈷","小你老母","撚屌鳩","含能","臭西","凸你","收皮","條撚","sub9","chilansin","bitch","b!tch","diu","asshole","suck","挑那星","POP街","陷家剷","卜街","能樣","on9","on.9","凸_凸","含撚","冚家祥","f u c k","sh!t","碌9","凸凸","d!u","吹蕭","大波","大胸","含撚","大枝野","大枝o野","大枝嘢","打車輪","口交","肛交","性交","手淫","姦","打茄輪","震蛋","淫蕩","淫慾","性愛","觀音坐蓮","老漢推車","狗仔式","猴子偷桃","顏射","汁男","童顏","陽具","乳溝","乳頭","龜頭","性愛","性慾","性奴","性經","愛撫","賤格","淫婦","淫娃","蕩婦","做雞","幼齒","冚家铲","冚加铲","冚+铲","冚嘉铲","杏加橙","屌那妈","捻样","食捻屎","呆捻9","呆捻狗","柒样","捻柒","屌鸠星","呆鸠","呆捻鸠","戆DOG","戆鸠","戆9","on鸠","乜捻野","捻屌鸠","条捻","陷家铲","能样","含捻","吹萧","含捻","打车轮","打茄轮","淫荡","淫欲","性爱","观音坐莲","老汉推车","颜射","童颜","阳具","乳沟","乳头","龟头","內射","中出","性欲","性经","爱抚","贱格","淫妇","荡妇","做鸡","幼齿","]]>","不舉","不举","凌辱","S.M","汁男","ｆuck","fｕck","fuｃk","fucｋ","ｆｕck","ｆuｃk","ｆucｋ","fｕｃk","fｕcｋ","fuｃｋ","ｆｕｃk","fｕｃｋ","ｆｕｃｋ","ｓhit","sｈit","shｉt","shiｔ","ｓｈit","ｓhｉt","ｓhiｔ","sｈｉt","sｈiｔ","shｉｔ","ｓｈｉt","sｈｉｔ","ｓｈｉｔ","ｓh!t","sｈ!t","sh！t","sh!ｔ","ｓｈ!t","ｓh！t","ｓh!ｔ","sｈ！t","sｈ!ｔ","sh！ｔ","ｓｈ！t","sｈ！ｔ","ｓｈ！ｔ"],
	"ChineseWord":["64","共產黨","共产党","法輪","陳水扁","陈水扁","台獨","藏獨","達賴","台独","藏独","达赖","打倒","萬歲","万岁","六四","民運","民运","鎮壓","镇压","鎮压","镇壓","反共","大日本主義","大日本主义","0759-3699539","13553582962","138017302","突厥革命","322攻台","pk8","qq幻想","ｑq幻想","qｑ幻想","ｑｑ幻想","taiwan","台灣","台湾"],
	
	/*"errormsg":{
		100:"System Error.",
		101:"This function is deprecated.",
		102:"This version is no longer support.",
		103:"No Record",
		201:"The username and email are not match.",
		202:"Email can't reach.",
		301:"用戶已經登記"
	}*/
}