const dragDrop = require('drag-drop')
const WebTorrent = require('webtorrent')



if (WebTorrent.WEBRTC_SUPPORT) {
  console.log("WebRTC Supported")
} else {
  console.log("WebRTC Not Supported")
}


var client = new WebTorrent()

client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})


// When user drops files on the browser, create a new torrent and start seeding it!
dragDrop(document.getElementById("drop_zone"), function (files) {
  client.seed(files, function (torrent) {
    console.log('Client is seeding ' + torrent.magnetURI)

	displayUri(torrent.magnetURI)
	
	addVideo(torrent.files[0])
  })
})

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault() // Prevent page refresh
	
    var torrentId = document.querySelector('form input[name=torrentId]').value
    
    client.add(torrentId, onTorrent)
	
})

var scrolled = false

const data = document.querySelector('.data')

function updateData(str) {
	data.innerHTML = str
}

function onTorrent (torrent) {
		
	var dataInterval = setInterval(function () {
         updateData('<b>Download Progress: </b>' + (torrent.progress * 100).toFixed(1) + '%<br>' + 
		 "There are " + torrent.numPeers + " peers<br>" +
		 prettyBytes(torrent.uploaded) + " have been uploaded to peers<br>" +
		 prettyBytes(torrent.downloaded) + " have been received from peers<br>" +
		 "<b>Upload speed: </b>" + prettyBytes(torrent.uploadSpeed) + 
		 "<br><b>Download speed: </b>" + prettyBytes(torrent.downloadSpeed) + "/s" + 
		 "<br><b>Seed ratio (uploaded/downloaded): </b>" + (torrent.ratio*100).toFixed(1)
		 )
    }, 500)
	
	
	torrent.on('download', function () {
		if(!scrolled){window.scrollBy(0, 1920)
	scrolled = true}})


    torrent.on('done', function () {
		displayProgress("Done")

        clearInterval(interval)
    })
      // Render all files into to the page
		
	
		
	var file = torrent.files.find(function(file) {
		
		return file.name.endsWith('.mp4')
    })
	
	
	addVideo(file)
	
	
}
	  
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

document.getElementById("inner-switch").onclick = function() {
        var element = document.body;
         element.classList.toggle("dark-mode");
      }
	  
function prettyBytes(num) {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
      }