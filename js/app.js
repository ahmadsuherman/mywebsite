$(document).ready(function(){
	$(window).on('scroll', function(){
		const scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$(".sticky").addClass("stickyadd");
		}else{
			$(".sticky").removeClass("stickyadd");
		}
	})

	typed()

	// Progress Bars
	waypoint()

	$('#btnSearchMovie').on('click', function(e){
	    const search = $('#searchTextMovie').val()
		,page = 1
	    searchMovies(search, page);
	})

	$('#btnSearchBook').on('click', function(e){
		const search = $('#searchTextBook').val()
	    , page = 1
	    searchBooks(search, page);
	})

	$('#btnSearchSong').on('click', function(e){
	    searchSongs();
	})

	// Modals
	// $('#movie-list').modal('show')

	$('#movieList').on('click', '#btnDetailMovie', function(e){
	    $.ajax({
	        url:'https://www.omdbapi.com',
	        type:'GET',
	        dataType:'json',
	        data:{
	            'apikey' : '13415ac3',
	            'i' : $(this).data('id')
	        },
	        success: function(result){
	            if(result.Response === "True"){
	            	$('#titleModal').text("Movie Detail");
	                $('.modal-body').html('');
	                let production = result.Production ? result.Production : '-'
	                $('.modal-body').append(`
	                    <div class="container-fluid">
	                        <div class="row">
	                            <div class="col-md-4 d-flex justify-content-center align-items-center">
	                                <img src="` + result.Poster + `" class="img-fluid" alt="img-movie-detail">
	                            </div>
	                            <div class="col-md-8">
	                                <ul class="list-group">
	                                  <li class="list-group-item"><h4>`+ result.Title +`</h4></li>
	                                  <li class="list-group-item">Release : `+ result.Released +`</li>
	                                  <li class="list-group-item">Genre : `+ result.Genre +`</li>
	                                  <li class="list-group-item">Writer : `+ result.Writer +`</li>
	                                  <li class="list-group-item">Actor : `+ result.Actors +`</li>
	                                  <li class="list-group-item">Production : `+ production +`</li>
	                                  <li class="list-group-item">Storyline : `+ result.Plot +`</li>
	                                </ul>
	                            </div>
	                        </div>
	                    </div>    
	                `);
	            }
	        },
	        error: function (e) {
	          	alert(e)
	        }
	    });
	})

	$('#bookList').on('click', '#btnDetailBooks', function(e){
		const id = $(this).data('id')
	    $.ajax({
	        url:'https://www.googleapis.com/books/v1/volumes/' + id,
	        type:'GET',
	        dataType:'json',
	        success: function(result){
	        	$('#titleModal').text("Book Detail");
                $('.modal-body').html('');
                let title = result.volumeInfo.title ? result.volumeInfo.title : '-',
                	categories = result.volumeInfo.categories ? result.volumeInfo.categories.join(', ') : '-',
                	authors = result.volumeInfo.authors ? result.volumeInfo.authors.join(', ') : '-',
                	description = result.volumeInfo.description ? result.volumeInfo.description : '-',
                	pageCount = result.volumeInfo.pageCount ? result.volumeInfo.pageCount : '-',
                	thumbnail = result.volumeInfo.imageLinks ? result.volumeInfo.imageLinks.thumbnail : '-',
                	publisher = result.volumeInfo.publisher ? result.volumeInfo.publisher : '-',
                	publishedDate = result.volumeInfo.publishedDate ? result.volumeInfo.publishedDate : '-'

                $('.modal-body').append(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 d-flex justify-content-center align-items-center">
                                <img src="` + thumbnail + `" class="img-fluid" alt="img-book-detail">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                  <li class="list-group-item"><h4>`+ title +`</h4></li>
                                  <li class="list-group-item">Category : `+  categories +`</li>
                                  <li class="list-group-item">Author : `+  authors +`</li>
                                  <li class="list-group-item">Publisher : `+ publisher +`</li>
                                  <li class="list-group-item">Date Publisher : `+ publishedDate +`</li>
                                  <li class="list-group-item">Number of Page : `+ pageCount +`</li>
                                  <li class="list-group-item">Description : `+ description +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>    
                `);
	        },
	        error: function (e) {
	          alert(e)
	        }
	    });
	})

	$('#songList').on('click', '#btnDetailSongs', function(e){
		const id = $(this).data('id')
	    $.ajax({
	        url:'https://song-lyrics-api-o0m8tth8t-azharimm.vercel.app/lyrics/' + id,
	        type:'GET',
	        dataType:'json',
	        success: function(result){
	        	$('#titleModal').text("Song Lyrics Detail");
                $('.modal-body').html('');
                
                $('.modal-body').append(`
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-md-12">
                                <ul class="list-group">
                                  <li class="list-group-item"><h4>`+ result.data.songTitle +`</h4></li>
                                  <li class="list-group-item">Artist: `+  result.data.artist +`</li>
                                  <li class="list-group-item">Lyrics: <br> `+  result.data.songLyricsArr.join('<br>') +`</li>
      
                                </ul>
                            </div>
                        </div>
                    </div>    
                `);
	        },
	        error: function (e) {
	          	alert(e)
	        }
	    });
	})
	
})

function typed()
{
	const typed = new Typed('.element', {
		strings: ['Ahmad Suherman', 'a Developer', 'a Designer', 'a Businessman'],
		smartBackspace: true,
		typeSpeed: 100,
		backSpeed: 100,
		loop: true,
		loopCount: Infinity,
		startDelay: 1000
	});
}

function waypoint()
{
	const waypoint = new Waypoint({
	  element: document.getElementById('expId'),
	  handler: function() {
		const p = document.querySelectorAll('.progress-bar');
		p[0].setAttribute('style', 'width: 100%; transition: 1s all');
		p[1].setAttribute('style', 'width: 95%; transition: 1.5s all');
		p[2].setAttribute('style', 'width: 85%; transition: 1.7s all');
		p[3].setAttribute('style', 'width: 99%; transition: 2s all');
		p[4].setAttribute('style', 'width: 85%; transition: 2.3s all');
		p[5].setAttribute('style', 'width: 95%; transition: 2.5s all');
	  },
	  offset: '90%'
	})
}

function searchMovies(search, page){
    $.ajax({
        url:'https://www.omdbapi.com',
        type:'GET',
        dataType:'json',
        data:{
            'apikey' : '13415ac3', 
            's' : search,
            'page' : page
        },
        success: function(result){
            let movies = result.Search;
            $('#movieList').html('');
            if(result.Response == "True"){
            	// console.log(result.totalResults)
                $.each(movies, function(i, data){
                    $('#movieList').append(`<div class="col-lg-4 mb-4 card-movie">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ data.Poster +`" alt="img-movie" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ data.Title +`</h5>
								<p class="card-text">Year: `+ data.Year +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm btn-movie" id="btnDetailMovie" data-id="`+ data.imdbID +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                if (page === 1) {
                	const items = $('#movieList .card-movie')
		            , numItems = result.totalResults
		            , perPage = 10

		            $('#paginationContainerMovie').pagination({
		                items: numItems,
		                itemsOnPage: perPage,
		                prevText:"&lt;",
		                nextText:"&gt;",
		                onPageClick: function(pageNumber){
		                    searchMovies(search, pageNumber)
		                }
		            }).show()
                }

            }else{
                $('#movieList').append(`
                    <div class="col-sm-12 text-center">
                        <h1>`+ result.Error +`</h1>
                    </div>
                `);
                $('#paginationContainerMovie').hide()
            }
        },
        error: function (e) {
          alert(e)
        }
    });
}


function searchBooks(search, page){
    $.ajax({
        url:'https://www.googleapis.com/books/v1/volumes',
        type:'GET',
        dataType:'json',
        data:{
            'q' : search,
            'page' : page
        },
        success: function(result){
            $('#bookList').html('');
            if(result.items){
            	let books = result.items;
                $.each(books, function(i, data){
                	let thumbnail = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '-',
                		title = data.volumeInfo.title ? data.volumeInfo.title : '-'
                    $('#bookList').append(`<div class="col-lg-4 mb-4 card-book">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ thumbnail +`" alt="img-book" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ title +`</h5>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btnDetailBooks" data-id="`+ data.id +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

               if (page === 1) {
               	 	const items = $('#bookList .card-book')
		            , numItems = result.totalItems
		            , perPage = 10

		            $('#paginationContainerBook').pagination({
		                items: numItems,
		                itemsOnPage: perPage,
		                prevText:"&lt;",
		                nextText:"&gt;",
		                onPageClick: function(pageNumber){
		                    searchBooks(pageNumber, search)
		                }
		            })
               }

            }else{
                $('#bookList').append(`
                    <div class="col-sm-12 text-center">
                        <h1> Buku not found! </h1>
                    </div>
                `);

                $('#paginationContainerBook').hide()
            }
        },
        error: function (e) {
        	$('#bookList').html('');
           	$('#bookList').append(`
                <div class="col-sm-12 text-center">
                    <h1> `+ e.responseJSON.error.message +` </h1>
                </div>
            `);

            $('#paginationContainerBook').hide()
        }
    });
}

function searchSongs(){
	const search = $('#searchTextSong').val()
    $.ajax({
        url:'https://song-lyrics-api-o0m8tth8t-azharimm.vercel.app/search',
        type:'GET',
        dataType:'json',
        data:{
            'q' : search,
        },
        success: function(result){
            $('#songList').html('');
            if(result.data.length !== 0){
            	let song = result.data;
                $.each(song, function(i, data){
                    $('#songList').append(`<div class="col-lg-4 mb-4 card-song">
		                <div class="card h-100">
							<div class="card-body">
								<h5 class="card-title">`+ data.songTitle +`</h5>
								<p class="card-text">Artist: `+ data.artist +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btnDetailSongs" data-id="`+ data.songId +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                const items = $('#songList .card-song')
	            , numItems = result.data.length
	            , perPage = 10
	            items.slice(perPage).hide();

	            $('#paginationContainerSong').pagination({
	                items: numItems,
	                itemsOnPage: perPage,
	                prevText:"&lt;",
		            nextText:"&gt;",
	                onPageClick: function(pageNumber){
	                	const showFrom = perPage *(pageNumber - 1)
                    	, showTo = showFrom + perPage
                    	items.hide().slice(showFrom, showTo).show();
	                }
	            })

            }else{
                $('#songList').append(`
                    <div class="col-sm-12 text-center">
                        <h1> Song Lyrics not found! </h1>
                    </div>
                `);

                $('#paginationContainerSong').hide()
            }
        },
        error: function (e) {
        	$('#songList').html('');
          	$('#songList').append(`
	            <div class="col-sm-12 text-center">
	                <h1> Something went wrong: Please fill in the search query! </h1>
	            </div>
	        `);

	        $('#paginationContainerSong').hide()
        }
    });
}
