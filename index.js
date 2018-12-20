var wrapper = document.getElementsByClassName('wrapper')[0]
var result =  document.getElementsByClassName('searchResult')[0]
var search = document.getElementById('search')
var submit = document.getElementById('submit')

submit.addEventListener('click', function() {
  // var newSearch = document.createElement('button')
  if (wrapper.innerHTML != ("")) {
    wrapper.innerHTML = ""
  }
  $.ajax({url:"https://www.omdbapi.com/?apikey=d1101178&",
  data: {s: search.value},
  // data: {t: search.value},
  success: function(response) {
    search.value = ''
      // if (search.value == 'undefined') {
      //   console.log('naw');
      // }
    var allTheMovies = response.Search
    wrapper.style.backgroundColor = 'rgba(76, 175, 80, 0.3)'
    // wrapper.borderRadius
    console.log(allTheMovies);

    for (var i = 0; i < allTheMovies.length; i++) {
      let movieTitle  = allTheMovies[i].Title;
      let moviePoster =  allTheMovies[i].Poster;
      let movieID = allTheMovies[i].imdbID
      // console.log(movieTitle);
      // console.log(moviePoster);
      // console.log(movieID);
      // console.log('');

      var movieSearch = document.createElement('div')
      movieSearch.className = "movieSearch"
      movieSearch.innerHTML = movieTitle
      // wrapper.appendChild(movieSearch)

      var img = document.createElement('img')
      img.className = "images_for_search"
      img.src = moviePoster
      // img.style.border = "2px solid red"
      if (moviePoster == 'N/A') {
        img.src = "https://target.scene7.com/is/image/Target/GUEST_2233bb5e-de0e-4669-a05e-455421d9ac47?wid=488&hei=488&fmt=pjpeg"
        img.style.height = "200px"
        img.style.width =  "150px"
      }
      movieSearch.appendChild(img)

      var details = document.createElement('div')
      details.id = movieID
      details.className = "detailsLink"
      details.innerHTML = "Movie details"

      details.addEventListener('click', function() {
        getDetails(response)
        // console.log('');
        // console.log("clicked");
        // console.log(event.target.id);
        // console.log(a[i].imdbID);
      })

        function getDetails() {
        $.ajax({url:"https://www.omdbapi.com/?apikey=d1101178&",
        data: {i: event.target.id},
          success: function(response) {
            // console.log(response);
            makeModal(response)
        }})
      }

      function makeModal(selectedMovie) {
        // console.log('MOOOOOODAAALL');
        var selectedMovieTitle = selectedMovie.Title
        var selectedMoviePoster = selectedMovie.Poster
        var selectedMovieActors = selectedMovie.Actors
        var selectedMoviePlot = selectedMovie.Plot
        var selectedMovieRating = selectedMovie.imdbRating
        var selectedMovieRated = selectedMovie.Rated
        var selectedMovieYear = selectedMovie.Year

        var mod = document.createElement('div');
        mod.className = "modal"

        var invisible = document.createElement('div')
        invisible.className = 'invisible'

        var close = document.createElement("div");
        close.innerHTML = "X"
        close.className = 'close'


        var movieWrapper = document.createElement('div')
        movieWrapper.className = 'movieWrapper'


        var movieImg = document.createElement('img')
        movieImg.src = selectedMoviePoster
        if (selectedMoviePoster == 'N/A') {
          movieImg.src = "https://target.scene7.com/is/image/Target/GUEST_2233bb5e-de0e-4669-a05e-455421d9ac47?wid=488&hei=488&fmt=pjpeg"
          // movieImg.style.height = "50em"
          // movieImg.style.width =  "19em"
        }
        movieImg.className = "movieImg"

        var movieDetails = document.createElement('div')
        movieDetails.className = "movieDetails"

        var theTitle = document.createElement('h1')
        // theTitle.className = "theTitle"

        var theActors = document.createElement('p')
        var thePlot = document.createElement('h3')
        var theRating = document.createElement('p')
        var theRated = document.createElement('p')
        var theYear = document.createElement('p')

        theTitle.innerHTML = selectedMovieTitle
        thePlot.innerHTML = selectedMoviePlot
        theActors.innerHTML = selectedMovieActors
        theRating.innerHTML = selectedMovieRating
        if (selectedMovieRated == "N/A") {
          theRated.innerHTML= "This film is not yet rated"
        }else {
          theRated.innerHTML = selectedMovieRated
        }

        theYear.innerHTML = selectedMovieYear

        movieDetails.appendChild(theTitle)
        movieDetails.appendChild(theActors)
        movieDetails.appendChild(thePlot)
        movieDetails.appendChild(theRating)
        movieDetails.appendChild(theRated)
        movieDetails.appendChild(theYear)

        movieWrapper.appendChild(movieImg)
        movieWrapper.appendChild(movieDetails)

        mod.appendChild(close)
        mod.appendChild(movieWrapper)

        wrapper.appendChild(invisible)
        wrapper.appendChild(mod)
        // invisible.appendChild(mod)

        close.addEventListener('click',function () {
          mod.style.display = "none";
          invisible.style.display = "none"
        })

        invisible.addEventListener('click', function() {
          invisible.style.display = "none"
          mod.style.display = "none";
        })
      }

      movieSearch.appendChild(details)
      wrapper.appendChild(movieSearch)
    }


  }
})
})
