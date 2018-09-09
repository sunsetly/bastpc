function checkNotifs() {
	var perms = window.localStorage.getItem("notifs");
	if (perms == "granted") {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("get", "https://api.stibarc.gq/getnotifs.sjs", false);
		xmlHttp.send();
		var tmp = xmlHttp.responseText.split("\n");
		var lastID = window.localStorage.getItem("lastNotifID");
		if (lastID == "" || lastID == undefined || lastID == null) {lastID = -1;}
		if (tmp[0] != lastID) {
			var text = "";
			for (var i = 1; i < tmp.length-3; i++) {
				text = text.concat(tmp[i]+"\n");
			}
			text = text.concat(tmp[tmp.length-3]);
			if (text !== undefined && tmp[1] !== undefined) {
				window.localStorage.setItem("lastNotifID", tmp[0]);
				var notification = new Notification("STiBaRC", {body: text,requireInteraction:true,icon:'icon.png'});
				notification.onclick = function(evt) {
					notification.close();
					window.parent.parent.focus();
					var postID = tmp[tmp.length-2];
					window.location.assign("post.html?id="+postID);
				}
			}
		}
	}
}
