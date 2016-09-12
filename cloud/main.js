
Parse.Cloud.afterDelete("Event", function(req) {
	var volonteerRolesWithCountArray = req.object.get("volonteerRoles");
	Parse.Object.destroyAll(volonteerRolesWithCountArray).then(function(){
		},
		function(error){
			console.error("Error deleteing related VolonteerRolesWithCount " + error.code + ": " + error.message);
		});
});
