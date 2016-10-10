var Config = require('parse-server/lib/Config');

Parse.Cloud.afterDelete("Event", function(req) {
	var volonteerRolesWithCountArray = req.object.get("volonteerRoles");
	Parse.Object.destroyAll(volonteerRolesWithCountArray).then(function(){
		},
		function(error){
			console.error("Error deleteing related VolonteerRolesWithCount " + error.code + ": " + error.message);
		}).then(function(){
			return Parse.Cloud.httpRequest({
	        	method: 'DELETE',
	        	url: Parse.serverURL + "/files/" + req.object.get("image").name(),
	        	headers: {
		            "X-Parse-Application-Id": Parse.applicationId,
	            	"X-Parse-Master-Key" : Parse.masterKey
	        	}
	    	});
		}).then(function(result){
		}, function(error){
			console.error("Error deleting event image: " + JSON.stringify(error));
		});
});
