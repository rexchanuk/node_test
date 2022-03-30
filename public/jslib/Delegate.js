Delegate = function(pTarget, pFunction) {
	this.mTarget = pTarget;
	this.mFunction = pFunction;
	this.mArgs = Array.from(arguments).slice(2);
};
/**
 * Execute The Call to callback function
 */
Delegate.prototype.execute=function(){
	var outputArray = [];
	for(var i in this.mArgs){outputArray.push(this.mArgs[i]);}
	var tmpa = Array.from(arguments);
	for(var i in tmpa){outputArray.push(tmpa[i]);}
	try{
		this.mTarget[this.mFunction].apply(this.mTarget, outputArray);
	}catch(e){}
};