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
	//torrent.files[0].appendTo('body')
  })
})

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault() // Prevent page refresh

    var torrentId = document.querySelector('form input[name=torrentId]').value
    //log('Adding ' + torrentId)
    client.add(torrentId, onTorrent)
	
})

function onTorrent (torrent) {
		
		
/*log('Got torrent metadata!')
log(
    'Torrent info hash: ' + torrent.infoHash + ' ' +
    '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
    '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
    )*/
	
	
	// Print out progress every 5 seconds
	var interval = setInterval(function () {
         displayProgress('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
		 move()
    }, 5000)

    torrent.on('done', function () {
		displayProgress("Done")
      //  log('Progress: 100%')
        clearInterval(interval)
    })
      // Render all files into to the page
		
	torrent.on('wire', function () {
		displayPeers("There are " + torrent.numPeers + " peers")
	})
	
		
	var file = torrent.files.find(function(file) {
		
		return file.name.endsWith('.mp4')
    })
	
	
	addVideo(file)
	//file.appendTo('body')
	
	
}
	  
function displayUri(str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.uri').appendChild(p)
}

function displayProgress(str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.progress').appendChild(p)
}

function displayTorrentData(str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.torrentData').appendChild(p)
}

function displayPeers(str) {
	var p = document.createElement('p')
	p.innerHTML = str
	document.querySelector('.peers').appendChild(p)
}


function move() {
            if ((torrent.progress*100).toFixed(1) == 0) {
                //i = 1;
                var elem = document.getElementById("myBar");
                var width = 1;
                var id = setInterval(frame, 10);
                function frame() {
                  if (width >= 100) {
                      clearInterval(id);
                      i = 0;
                  } else {
                      //width++;
                      elem.style.width = width + "%";
                  }
                }
            }
        }
		
var isVideo = false
		
function addVideo(file){
	if(!isVideo){
		displayTorrentData('Now Playing "' + file.name +
		'"')
		displayTorrentData("Refresh page to play new video.")
		file.appendTo('body')
		isVideo = true
		
		
	}
	
}

document.getElementById("inner-switch").onclick = function() {
        var element = document.body;
         element.classList.toggle("dark-mode");
      }
