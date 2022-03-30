const mysql = require('mysql');
const SqlString = require('sqlstring');
const Config = require('../../env.config');
exports.connectDB = () => {
	return new Promise((resolve, reject) => {
		try{
			var db = mysql.createConnection({
				host:Config.mysqlhost,
				user:Config.mysqluser,
				database:Config.mysqldb,
				password:Config.mysqlpwd,
				debug: false,
				multipleStatements: true,
				dateStrings:true,
			});
			try{
				db.connect();
				resolve(db);
			}catch(e){reject(e);}
		}catch(e){reject(e);}
	});
};
exports.changeTimezone = (pDB, pTime_str) => {
	return new Promise((resolve, reject) => {
		//if(Config.CONSOLE) {console.log("mysql.js : line_"+__line+" : changeTimezone : "+pTime_str);}
		try{pDB.query("SET time_zone= '"+pTime_str+"' ", true, (err, result, fields) => {
			resolve()
		});}catch(e){reject();}
	})
}
exports.begin = (pDB) => {
	return new Promise((resolve, reject) => {
		try{pDB.query("BEGIN", true, (err, result, fields) => {
			if(err){reject(err)}else{resolve()}
		});}catch(e){reject(e);}
	})
}
exports.commit = (pDB) => {
	return new Promise((resolve, reject) => {
		try{pDB.query("COMMIT", true, (err, result, fields) => {
			if(err){reject(err)}else{resolve()}
		});}catch(e){reject(e);}
	})
}
exports.rollback = (pDB) => {
	return new Promise((resolve, reject) => {
		try{pDB.query("ROLLBACK", true, (err, result, fields) => {
			if(err){reject(err)}else{resolve()}
		});}catch(e){reject(e);}
	})
}
exports.createSQL = (pSQL, pData) => {return SqlString.format(pSQL, pData);};
exports.query = (pDB, pSQL) => {
	return new Promise((resolve, reject) => {
		try{
			//if(Config.CONSOLE) {console.log("mysql.js : line_"+__line+" : createSQL : "+pSQL);}
			pDB.query(pSQL, true, (err, result, fields) => {
				if(err){ reject(err);}
				if(result == undefined){
					result={}
				}else{
					try{
						result = JSON.parse(JSON.stringify(result));
					}catch(e) {result={}} 
				}
				if(fields == undefined){
					fields={}
				}else{
					try{
						fields = JSON.parse(JSON.stringify(fields));
					}catch(e) {fields={}} 
				}
				resolve({"result":result, "fields":fields});
			});
		}catch(e){reject(e);}
	});
};