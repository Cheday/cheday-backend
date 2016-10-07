var Config = require('parse-server/lib/Config');

Parse.Cloud.afterDelete("Event", function(req) {
	var volonteerRolesWithCountArray = req.object.get("volonteerRoles");
	Parse.Object.destroyAll(volonteerRolesWithCountArray).then(function(){
		},
		function(error){
			console.error("Error deleteing related VolonteerRolesWithCount " + error.code + ": " + error.message);
		}).then(function(){
			const config = new Config(Parse.applicationId);
		    const filesController = config.filesController;
		    return filesController.deleteFile(config, req.object.get("image").name);
		}).then(function(result){
			console.log("Result of deletion file: " + JSON.stringify(result));
		}, function(error){
			console.error("Error deleting event image " + error.code + ": " + error.message);
		});
});
