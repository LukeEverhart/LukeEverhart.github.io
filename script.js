<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Webtorrent Video Player</title>
    </head>
    <body>
        <h1>Download files using the WebTorrent protocol (BitTorrent over WebRTC).</h1>
		
	<div class="switch">Dark mode:
            <button id="inner-switch">Toggle Dark</span>
        </div>

    <form>
      <label for="torrentId">Download from a magnet link: </label>
      <input name="torrentId" type="text" placeholder="magnet:" value="magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent">
      <button type="submit">Download</button>
	  
    </form>
	<div id="drop_zone" >
        <center>
            <p style="inline-size: 50%;">Submit File to Seed</p>
            <img id="image" src="submit.png">
        </center>
      </div>
	
	
	<hl>Copy the MagnetURI to share this video.</h1>
	<div class="uri"></div>
	
	<h2>Download Progress</h2>
	<div class="progress"></div>
	
	<div id="myProgress">
        <div id="myBar"></div>
    </div>
	
	<h3>Torrent Data</h3>
	<div class="torrentData"></div>
	
	<div class="peers"></div>
	
			
		
    </body>
    <script src="bundle.js">

    </script>
	
	<style>
	
	button {
    color: #444444;
    background: #F3F3F3;
    border: 1px #DADADA solid;
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 2px;
    font-weight: bold;
    font-size: 9pt;
    outline: none;
	}

	button:hover {
    border: 1px #C6C6C6 solid;
    box-shadow: 1px 1px 1px #EAEAEA;
    color: #333333;
    background: #F7F7F7;
	}

	button:active {
    box-shadow: inset 1px 1px 1px #DFDFDF;
	}

	input[type=text] {
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid red;
    border-radius: 4px;
	}
	
	#myProgress {
    width: 100%;
    background-color: grey;
	}

	#myBar {
    width: 1%;
    height: 30px;
    background-color: green;
	}
	
	body {
    padding: 25px;
    background-color: white;
    color: black;
    font-size: 25px;
  }

  .dark-mode {
    background-color: #223838;
    color: #DCDCDC;
  }

  #drop_zone {
    border: 1px solid #223838;
    width:  600px;
    height: 400px;
  }
  #image{
    width: 20%;
    height: 20%;
    opacity: 0.25;
  }
	</style>
  
</html>
