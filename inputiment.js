/**
	inputiment - a speech impediment for input fields
    Copyright (C) 2011 Gabriel Joshua Hernandez <webspinner.gabriel@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

console.warn("Launching inputiment on this page");

var inputiment = {}

inputiment.g = function(){
  inputiment.g.x = inputiment.g.x || 1;
  return inputiment.g.x++;
};
inputiment.grabTheMic = setInterval(function(){
  Array.prototype.forEach.call(document.getElementsByTagName('input') ,function( item, list ){
    if ( item.__speech__ || item.getAttribute('x-webkit-speech') ) return;
    item.setAttribute('x-webkit-speech', 'x-webkit-speech');
    item.__speech__ = true;
  });
 	Array.prototype.forEach.call(document.getElementsByTagName('textarea'), function( item, list ){
    if ( item.__speech__ ) return;
		var speech = document.createElement("input");
		speech.setAttribute('x-webkit-speech', 'x-webkit-speech');
		speech.id = 'inputiment' + inputiment.g();
		speech.setAttribute("style","border : 0px; width : 20px; float : right; color : white;");
		speech.onwebkitspeechchange = function( event ){
			var value = ( event.results[0].confidence > 0.5 ) ? event.results[0].utterance : item.value;
			if (value == "") return;

      if (item.value == "") {
        item.value = value;
      } else {
        item.value = item.value + " " + value;
      }
      item.focus()
		}

		item.__speech__ = speech;
		item.parentNode.appendChild(speech);
 	});
}, 1000);