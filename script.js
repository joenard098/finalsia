var searchWikipedia = function() {

    var inputText = document.getElementById("search-subject").value;
  
    var resultsDiv = document.getElementById("results");

      if(resultsDiv !== " ") {
        resultsDiv.innerHTML = '<div id="results"></div>';
      }
  
   
    var req = new XMLHttpRequest();
   
    var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=15&srsearch=" + inputText  + "&format=json&prop=revisions&origin=*";
  
   
    req.open("GET", url, true);
    
    req.setRequestHeader("Api-User-Agent", "example/1.0");
    
    req.addEventListener("load", function(response) {
        response = JSON.parse(req.responseText);
        console.log(response);
       
        for(title in response.query.search) {
  
            var titles = response.query.search[title].title;
            var snippets = response.query.search[title].snippet;
  
           
            var div = document.createElement("div");
            div.innerHTML = '<a href="https://en.wikipedia.org/wiki/' + titles + '" target="_blank">' + '<h2 class="h2-results">' + titles + '</h2>' + '<p>' + snippets + ' . . .</p>' + '</a>';
            resultsDiv.appendChild(div);
            div.classList.toggle("div-results");
        }
      });
     
      req.send();
    };
  
  // Invoke searchWikipedia function when the #search-button is clicked
  document.getElementById("search-button").onclick = searchWikipedia;
  
  // Invoke searchWikipedia function when the enter key is released
  document.addEventListener("keyup", function(event) {
    // The enter key is code 13
    if(event.keyCode === 13) {
      searchWikipedia();
    }
  });