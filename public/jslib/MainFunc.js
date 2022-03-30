MainFunc = function(){
	this.mDefaultArray = {"version":mVersion, "COMCDE":"PCSFG","LANG":"zh-hk","SYSID":"INDOME","useridx":"guest","platform":"1","device":"1", "token":"","checksum":"","GMT":"+00:00"};
};
MainFunc.prototype.GetToken=function(){return this.mDefaultArray["token"]}
MainFunc.prototype.InitAccountUpdate=function(pData){
	this.mDefaultArray["useridx"] = pData["xcum_cusid"]
	this.mDefaultArray["LANG"] = pData["xcum_cuslngcde"]
	this.mDefaultArray["token"] = pData["token"]
	this.mDefaultArray["platform"] = this.getPlatform(pData["xcum_dvcplf"])
	this.mDefaultArray["device"] = this.getDevice(pData["xcum_dvctyp"])
	var tmpGMT = (new Date().getTimezoneOffset()>0?'':"+")
	var tmpA = (new Date().getTimezoneOffset()/-60).toString();
	if(tmpA.indexOf("-") == 0){
		if(tmpA.length == 2){
			tmpGMT+=tmpA[0]+"0"+tmpA[1];
		}else{
			tmpGMT+=tmpA;
		}
	}else{
		if(tmpA.length == 2){
			tmpGMT+=tmpA;
		}else{
			tmpGMT+="0"+tmpA;
		}
	}
	tmpGMT+=":00"
	this.mDefaultArray["GMT"] = tmpGMT;
}
MainFunc.prototype.setCookie=function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
MainFunc.prototype.getCookie=function(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
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
};
MainFunc.prototype.CombineDefaultArray=function(pParam_arr){
	for(var i in this.mDefaultArray){
		pParam_arr[i] = this.mDefaultArray[i]
	}
	return pParam_arr
}
MainFunc.prototype.getPlatform=function(pPlatform){
	let return_str = 1
	switch(pPlatform){
	    case "web":
	    	return_str = 1;
	        break;
	    case 'iOS':
	    	return_str = 2;
	        break;
	    case 'Android':
	    	return_str = 3;
	        break;
	    case 'API':
	    	return_str= 4;
	        break;
	    case 'other':
	    	return_str = 5;
	        break;
	    default:
	    	return_str= 1;
	    	break;
	}
	return return_str
}
MainFunc.prototype.getDevice=function(pDevice){
	let return_str = 1
	switch(pDevice){
	    case 'web':
	    	return_str = 1;
	        break;
	    case 'iPhone':
	    	return_str = 2;
	        break;
	    case 'iPad':
	    	return_str = 3;
	        break;
	    case 'iPad Pro':
	    	return_str= 4;
	        break;
	    case 'Android':
	    	return_str = 5;
	        break;
	    case 'API':
	    	return_str = 6;
            break;
        case 'other':
        	return_str = 7;
            break;
	    default:
	    	return_str= 1;
	    	break;
	}
	return return_str
}
MainFunc.prototype.GetCurrentTimestamp=function(){
	let pNow=new Date()
	let pMonth = ((pNow.getMonth()+1)<10?"0"+(pNow.getMonth()+1).toString():(pNow.getMonth()+1).toString())
	let pDate = (pNow.getDate()<10?"0"+pNow.getDate().toString():pNow.getDate().toString())
	let pHour = (pNow.getHours()<10?"0"+pNow.getHours().toString():pNow.getHours().toString())
	let pMin = (pNow.getMinutes()<10?"0"+pNow.getMinutes().toString():pNow.getMinutes().toString())
	let pSec = (pNow.getSeconds()<10?"0"+pNow.getSeconds().toString():pNow.getSeconds().toString())
	//let pTimestamp=(pNow.getTimezoneOffset()/-60)
	/*if(pTimestamp >=0){
		pTimestamp = "+"+pTimestamp.toString()
	}else{
		pTimestamp = pTimestamp.toString()
	}*/
	let curerntTime=pNow.getFullYear().toString()+'-'+pMonth+'-'+pDate+' '+pHour+":"+pMin+':'+pSec
	return curerntTime
}
MainFunc.prototype.GetCurrentTimezone=function(){
	let pNow=new Date()
	return pNow.getTimezoneOffset()/-60;
}
MainFunc.prototype.GetCurrentTime=function(){
	let pNow=new Date()
	return pNow.getTime();
}
MainFunc.prototype.GetUTCTimestamp=function(){
	var mToday = new Date();
	var returnstr = mToday.getUTCFullYear()+"-";
	if(mToday.getUTCMonth() < 9){
		returnstr+='0'+(mToday.getUTCMonth()+1);
	}else{
		returnstr+=(mToday.getUTCMonth()+1);
	}
	returnstr+='-';
	if(mToday.getUTCDate() < 10){
		returnstr+='0'+(mToday.getUTCDate());
	}else{
		returnstr+=(mToday.getUTCDate());
	}
	returnstr+=' ';
	if(mToday.getUTCHours() < 10){
		returnstr+='0'+(mToday.getUTCHours());
	}else{
		returnstr+=(mToday.getUTCHours());
	}
	returnstr+=':';
	if(mToday.getUTCMinutes() < 10){
		returnstr+='0'+(mToday.getUTCMinutes());
	}else{
		returnstr+=(mToday.getUTCMinutes());
	}
	returnstr+=':';
	if(mToday.getUTCSeconds() < 10){
		returnstr+='0'+(mToday.getUTCSeconds());
	}else{
		returnstr+=(mToday.getUTCSeconds());
	}
	return returnstr;
}