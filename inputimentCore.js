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
console.warn("Booting up inputiment");
chrome.tabs.getAllInWindow(null, function(tabs) {
  tabs.forEach(function(tab){
    if(tab.url.indexOf('chrome') !== 0) { // avoid configuration pages
      chrome.tabs.executeScript(tab.id, { file : "inputiment.js" } );
    }
  });
});

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
  if(changeInfo.status == "loading") {
    if(tab.url.indexOf('chrome') !== 0) { // avoid configuration pages
      chrome.tabs.executeScript(tabId, { file : "inputiment.js" } );
    }
  }
});