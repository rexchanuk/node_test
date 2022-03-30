const Config = require('../../env.config')
const fs = require('fs-extra')
const sizeOf = require('image-size');
const Jimp = require('jimp');
const ExifImage = require('exif').ExifImage;

exports.CreateDirectory = (pPath) =>{
	return new Promise((resolve, reject) => {
		fs.mkdir(pPath, { recursive: true }, (err)=>{
			//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.CreateDirectory : "+pPath)}
			if(err) {reject(err)}else{resolve()}
		})
	})
}

exports.CopyFile = (pSource, pDest) => {
	return new Promise((resolve, reject) => {
		fs.stat(pSource+"_ori", (err, stats)=>{
			if(err){}else{
				let tmpSource = [];
				if(pDest.indexOf("/") >= 0){
					tmpSource = pDest.split("/")
				}else{
					tmpSource = pDest.split("\\")
				}
				tmpSource[tmpSource.length-1] = "ori_"+tmpSource[tmpSource.length-1];
				//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.CopyFile : From "+pSource+" to "+pDest)}
				fs.copyFile(pSource+"_ori", tmpSource.join("/"), (err)=>{
					//if(Config.CONSOLE) {console.log(err)}
				})
			}
		})
		fs.copyFile(pSource, pDest, (err)=>{
			if(err){
				//if(Config.CONSOLE) {console.log(err)}
				reject(err)
			}else{
				//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.CopyFile : From "+pSource+" to "+pDest)}
				if(Config.FILE_CHMOD){
					fs.chmod(pDest, 0o755, (err)=>{})
				}
				resolve()
			}
		})
	})
}

exports.SaveFileBase64 = (pDestination, pData) =>{
	return new Promise((resolve, reject) => {
		try{
			//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileBase64 : Data Length => "+pData["data"].length+", actual size => "+pData["size"])}
			let base64Data  = pData["data"].replace('data:'+pData["type"]+';base64,', "");
			//base64Data  +=  base64Data.replace('+', ' ');
			fs.writeFile(pDestination, base64Data, "base64", function (err) {
				if(err) {
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileBase64 : Write to File has Error")}
					delete base64Data
					reject(err)
				}else{
					delete base64Data
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileBase64 : Write to File Success "+pDestination)}
					if(Config.FILE_CHMOD){
						fs.chmod(pDestination, 0o755, (err)=>{})
					}
					if(pData["type"].indexOf("image/") >= 0){
						try {
							new ExifImage({ image : pDestination }, function (error, exifData) {
								var tmpOri = 0;
								if (error){
									
								}else{
									try{
										if(exifData.image.Orientation != 1){
											tmpOri = exifData.image.Orientation-1
										}
									}catch(e){
										tmpOri = 0
									}
									//if(Config.CONSOLE) {console.log(exifData);} // Do something with your data!
								}
								sizeOf(pDestination, function (err, dimensions) {
									if(err){
										resolve(pData)
										//reject(err)
									}else{
										pData["width"] = dimensions.width
										pData["height"] = dimensions.height
										if(dimensions.width > 1120){
											//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileBase64 : Resize Image "+pDestination)}
											fs.copyFile(pDestination, pDestination+"_ori", (err)=>{
												if(err){
													pDestination=null
													resolve(pData)
												}else{
													if(Config.FILE_CHMOD){
														fs.chmod(pDestination, 0o755, (err)=>{})
													}
													let newHeight = 1120/dimensions.width * dimensions.height
													Jimp.read(pDestination).then((lenna)=>{
														lenna.resize(1120, Jimp.AUTO).rotate(tmpOri*90).write(pDestination)
														if(tmpOri % 2 == 0){
															pData["width"] = 1120
															pData["height"] = newHeight
														}else{
															pData["width"] = newHeight
															pData["height"] = 1120
														}
														//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileBase64 : Resize Image Success "+pDestination)}
														pDestination=null
														resolve(pData)
													}).catch((err)=>{
														//if(Config.CONSOLE) {console.log(err)}
														pDestination=null
														resolve(pData)
													})
												}
											});
										}else{
											pDestination=null
											resolve(pData)
										}
									}
								})
							});
						} catch (error) {
							pDestination=null
							//if(Config.CONSOLE) {console.log('Error: ' + error.message)}
						}
						
					}else{
						pDestination=null
						resolve(pData)
					}
				}
			});
		}catch(e){reject(e);}
	})
}

exports.SaveFileData = (pDestination, pData, pIsJson=false) => {
	return new Promise((resolve, reject) => {
		try{
			if(pData == undefined) {
				//if(Config.CONSOLE) {console.log("no Data")}
				reject()
			}else{
				if(pIsJson){
					pData = JSON.stringify(pData)
				}
				//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileData : Save File Data "+pDestination + ", Data => "+JSON.stringify(pData))}
				fs.writeFile(pDestination, pData, (err) => {
					if(err) {
						//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileData : Save Data Error")}
						reject(err)
					}else{
						resolve()
					}
				})
			}
		}catch(err){
			//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileData : Save Data Error")}
			reject(err)
		}
	})
}

exports.GetFileData = (pSource, pIsJson = false) => {
	return new Promise((resolve, reject) => {
		try{
			this.FileAccess(pSource).then((pResult)=>{
				fs.readFile(pSource, 'utf8', (err, data) => {
					if(err) {
						//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.GetFileData : Get File Data Error")}
						reject(err)
					}else{
						//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.GetFileData : Get Data "+data.toString())}
						if(pIsJson){
							resolve(JSON.parse(data.toString()))
						}else{
							resolve(data.toString())
						}
					}
				})
			}).catch((pError)=>{
				//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.GetFileData : Get File Data Error")}
				reject(pError)
			})
		}catch(err){
			//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.GetFileData : Get File Data Error")}
			reject(err)
		}
	})
}

exports.SaveFileDataAccumulate = (pDestination, pData, pIsJson=false) => {
	return new Promise((resolve, reject) => {
		try{
			this.GetFileData(pDestination, pIsJson).then((pResult)=>{
				let pDataSource;
				if(pIsJson){
					pResult.push(pData)
					pDataSource=pResult
				}else{
					pDataSource=pResult+pData
				}
				this.SaveFileData(pDestination, pDataSource, pIsJson).then((pResult)=>{
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileDataAccumulate : Save Data Access")}
					resolve(true)
				}).catch((pError)=>{
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileDataAccumulate : Save Data Error")}
					reject(pError)
				})
			}).catch((pError)=>{
				console.log(pError)
				this.SaveFileData(pDestination, [pData], pIsJson).then((pResult)=>{
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileDataAccumulate : Save Data Access")}
					resolve(true)
				}).catch((pError)=>{
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileDataAccumulate : Save Data Error")}
					//if(Config.CONSOLE) {console.log(pError)}
					reject(pError)
				})
			})
		}catch(err){
			//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.SaveFileDataAccumulate : Save Data Error")}
			reject(err)
		}
	})
}

exports.ChangeMode = (pSoruce, pMode)=>{
	if(Config.FILE_CHMOD){
		fs.chmod(pSource, pMode, (err)=>{})
	}
}

exports.FileAccess = (pSource) => {
	return new Promise((resolve, reject) => {
		try{
			fs.stat(pSource, (err, stats)=>{
				if(err){reject(err)}else{
					if(stats.isDirectory() || stats.isFile()){
						resolve(true)
					}else{
						reject(err)
					}
				}
			})
		}catch(err){
			reject(err)
		}
	})
}

exports.GetFileStat = (pSource)=>{
	return new Promise((resolve, reject) => {
		this.FileAccess(pSource).then((pResult)=> {
			fs.stat(pSource, (err, stats) => {
				if(err) {
					reject(err)
				}else{
					resolve(stats)
				}
			})
		}).catch((pError) => {
			reject(pError)
		})
	})
}

exports.RemoveFile = (pSource, pFile='') => {
	return new Promise((resolve, reject) => {
		//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.RemoveFile : Remove File "+pSource+", "+pFile)}
		if(pFile==''){
			try{
			fs.unlink(pSource, (err, stats)=>{})
			}catch(e){}
			fs.stat(pSource+"_ori", (err, stats)=>{
				if(err){
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.RemoveFile : Remove File Error")}
				}else{
					try{
					fs.unlink(pSource+"_ori", (err, stats)=>{})
					}catch(e){}
					
				}
			})
		}else{
			try{
			fs.unlink(pSource+"/"+pFile, (err, stats)=>{})
			}catch(e){}
			fs.stat(pSource+"/"+pFile+"_ori", (err, stats)=>{
				if(err){
					//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.RemoveFile : Remove File Error")}
					fs.stat(pSource+"/ori_"+pFile, (err, stats)=>{
						if(err){
							//if(Config.CONSOLE) {console.log("File.js : line_"+__line+" : exports.RemoveFile : Remove File Error")}
						}else{
							try{
							fs.unlink(pSource+"/ori_"+pFile, (err, stats)=>{})
							}catch(e){}
						}
					})
				}else{
					try{
					fs.unlink(pSource+"/"+pFile+"_ori", (err, stats)=>{})
					}catch(e){}
					
				}
			})
		}
	})
}