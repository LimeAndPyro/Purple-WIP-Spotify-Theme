// The async modifier allows for the user of await, which converts a promise into an object, when not using await, async is not necessary.
(async function extension() {
    // The following code segment waits for platform to load before running the code, this is important to avoid errors. When using things such as Player or URI, it is necessary to add those as well.
    const { Platform } = Spicetify; 
    if (!Platform) {
      setTimeout(extension, 300);
      return;
    }
    const user = await Spicetify.Platform.UserAPI.getUser();
    const date = new Date();

    if (!Spicetify.Player.isPlaying())
    {
      Spicetify.Player.play();
      Spicetify.showNotification('AutoPlaying');
      GETAlbumImage();
      
    }
    
    Spicetify.showNotification(`Logged In As ` + user.displayName + ' @' + date.getHours() + ':' + date.getMinutes());
    addElements();

    
  })();

   function addElements()
  {

    
    const innerdot = document.createElement("div");
    const outerDot = document.createElement("div");
    const BGContain = document.createElement("div");
    const BigBg = document.createElement("div");


    const Main = document.getElementById("main");

    const Root = Main.getElementsByClassName("Root__main-view")[0];

    const container = Main.getElementsByClassName("main-coverSlotExpanded-container")[0];
    const shitBar = Main.getElementsByClassName("main-topBar-background")[0];
    const Pad = Root.getElementsByClassName("os-padding")[0];
    
    
    

    outerDot.className = "Dot2";
    innerdot.className = "Dot";
    innerdot.id = "122dot";
    outerDot.id = "112dot";
    BigBg.id = "112BG";
    BigBg.className = "BIGBG";
    shitBar.id = "Shit";
    BGContain.id = "BGContainer";

    if (!container || !Main || !Root) setTimeout(addElements, 300);
    try
    {
      const button = new Spicetify.Topbar.Button("YTVideo", "YTSearch", () => {
        GETyoutubeResult();
        
    });
      container.appendChild(outerDot);
      container.appendChild(innerdot);
      Pad.appendChild(BigBg);
      LoopOp();      
    }
    catch{}
    
    
  }
  async function GETAlbumImage() {
// //credit https://github.com/harbassan/spicetify-galaxy/blob/main/galaxy.js REWORKED
    const data = Spicetify.Player.data.track.metadata;
    const procData = await Spicetify.CosmosAsync.get(`https://api.deezer.com/search/album?q=artist:"${data.album_artist_name}" album:"${data.album_title}"`);
    let album = procData.data.find(e => e.title)
    try{
      
      setBg(album.cover_xl);
    }
    catch{}
     
  }
  async function GETyoutubeResult()
  {
    const curruri = Spicetify.Player.data.track.uri;
    const procuri = curruri.split(":")[2]
    

    const procURIResp = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/tracks/` + procuri);
    const curSongName = procURIResp.name;
    Spicetify.showNotification(curSongName);
    navigator.clipboard.writeText(procURIResp.artists.name);

    const Url = `https://www.youtube.com/results?search_query=${curSongName}`;

    window.open(Url);

    
  }


  function LoopOp()
  {
    while (true)
    {
      document.getElementById("Shit").style.opacity = 0;
      return;
    }
  }
  function setBg(imageData)
  {
    document.getElementById("112BG").style.content = "url(" + imageData + ")";
  }
  Spicetify.Player.addEventListener("songchange", () => {
      GETAlbumImage();
      
      
  });
