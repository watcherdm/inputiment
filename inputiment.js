var g = function(){
	g.x = g.x || 1;
	return g.x++;
}
setInterval(function(){
	Array.prototype.forEach.call(document.getElementsByTagName('input') ,function( item, list ){
		if ( item.__speech__ ) return;
		item.setAttribute('x-webkit-speech', 'x-webkit-speech');
		item.__speech__ = true;
	});
	Array.prototype.forEach.call(document.getElementsByTagName('textarea'), function( item, list ){
		if ( !item.__speech__ ){
			var speech = document.createElement("input");
			speech.setAttribute('x-webkit-speech', 'x-webkit-speech');
			speech.id = 'inputiment' + g();
			speech.setAttribute("style","border : 0px; width : 20px; float : right; color : white;");
			speech.onwebkitspeechchange = function( event ){
				var value = ( event.results[0].confidence > 0.5 ) ? event.results[0].utterance : item.value;
				item.value = value;
				item.focus();
			}

			item.__speech__ = speech;
			item.parentNode.appendChild(speech);
		}
	});
}, 3000);