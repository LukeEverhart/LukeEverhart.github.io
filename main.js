const dragDrop = require('drag-drop')
const WebTorrent = require('webtorrent')


// Check if browser has WebRTC support. WebTorrent won't work without it.
// Most browsers have this.
if (WebTorrent.WEBRTC_SUPPORT) {
  console.log("WebRTC Supported")
} else {
  console.log("WebRTC Not Supported")
}


var client = new WebTorrent() // WebTorrent instance


// Quick error check
client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})


// When user drops files on the browser, create a new torrent and start seeding it
dragDrop(document.getElementById("drop_zone"), function (files) {
	// webtorrent method to seed new torrent
  client.seed(files, function (torrent) {

	displayUri(torrent.magnetURI) // display magnetURI
	
	addVideo(torrent.files[0]) // append video to html body
  })
})

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault() // Prevent page refresh
	
    var torrentId = document.querySelector('form input[name=torrentId]').value // Input magnet link with html form
    
    client.add(torrentId, onTorrent) // WebTorrent method to download torrent
	
})

var scrolled = false

const data = document.querySelector('.data')



function onTorrent (torrent) {
	
	
	// Torrent data displayed in a readable manner using WebTorrent's torrent API
	var dataInterval = setInterval(function () {
         updateData('<b>Download Progress: </b>' + (torrent.progress * 100).toFixed(1) + '%<br>' + 
		 "There are " + torrent.numPeers + " peers<br>" +
		 prettyBytes(torrent.uploaded) + " have been uploaded to peers<br>" +
		 prettyBytes(torrent.downloaded) + " have been received from peers<br>" +
		 "<b>Upload speed: </b>" + prettyBytes(torrent.uploadSpeed) + 
		 "<br><b>Download speed: </b>" + prettyBytes(torrent.downloadSpeed) + "/s" + 
		 "<br><b>Seed ratio (uploaded/downloaded): </b>" + (torrent.ratio*100).toFixed(1)
		 )
    }, 500) // update twice a second
	
	
	
	// on download starting, page scrolls to bottom
	torrent.on('download', function () {
		if(!scrolled){window.scrollBy(0, 1920)
	scrolled = true}})


    torrent.on('done', function () {
		displayProgress("Done")

        clearInterval(interval)
    })
	
	
	
    // Render mp4 into to the page
	var file = torrent.files.find(function(file) {
		
		return file.name.endsWith('.mp4')
    })
	
	
	addVideo(file) //append video to page
	
	
}
	  
	  
// Functions to append data to different html nodes  
function displayUri(str) {
	var p = document.createElement('p')
	p.innerHTML = "<b>Copy URI and send to a potential peer:</b><br>" + str
	document.querySelector('.uri').appendChild(p)
}


function displayTorrentData(str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.torrentData').appendChild(p)
}

function updateData(str) {
	data.innerHTML = str
}


// addVideo appends video to body. Won't append if there's already a video up
var isVideo = false
		
function addVideo(file){
	if(!isVideo){
		displayTorrentData('Now Playing "' + file.name +
		'"')
		displayTorrentData("Refresh page to download or upload new video.")
		file.appendTo('body')
		isVideo = true
		
		
	}
	
}


// dark mode
document.getElementById("inner-switch").onclick = function() {
        var element = document.body;
         element.classList.toggle("dark-mode");
      }

// function to beautify the torrent API calls. 234534 -> 23KB	  
function prettyBytes(num) {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
      }
