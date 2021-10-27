$(document).ready(function(){
	$(window).on('scroll', function(){
		var scroll = $(window).scrollTop();
		if (scroll >= 50) {
			$(".sticky").addClass("stickyadd");
		}else{
			$(".sticky").removeClass("stickyadd");
		}
	})

	var typed = new Typed('.element', {
		strings: ['Ahmad Suherman', 'a Developer', 'a Designer', 'a Businessman'],
		smartBackspace: true,
		typeSpeed: 100,
		backSpeed: 100,
		loop: true,
		loopCount: Infinity,
		startDelay: 1000
	});

	// Progress Bars

	var waypoint = new Waypoint({
	  element: document.getElementById('exp-id'),
	  handler: function() {
		var p = document.querySelectorAll('.progress-bar');
		p[0].setAttribute('style', 'width: 100%; transition: 1s all');
		p[1].setAttribute('style', 'width: 95%; transition: 1.5s all');
		p[2].setAttribute('style', 'width: 85%; transition: 1.7s all');
		p[3].setAttribute('style', 'width: 99%; transition: 2s all');
		p[4].setAttribute('style', 'width: 85%; transition: 2.3s all');
		p[5].setAttribute('style', 'width: 95%; transition: 2.5s all');
	  },
	  offset: '90%'
	})


	$('#btn-search').on('click', function(e){
	    searchMovies();
	})

	$('#btn-search-book').on('click', function(e){
	    searchBooks();
	})

	$('#btn-search-song').on('click', function(e){
	    searchSongs();
	})

	// Modals
	$('#movie-list').on('click', '#btn-details', function(e){
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
	            	$('#titleModal').html("Movie Detail");
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
	        }
	    });
	})

	$('#book-list').on('click', '#btn-detail-books', function(e){
		var id = $(this).data('id')
	    $.ajax({
	        url:'https://www.googleapis.com/books/v1/volumes/' + id,
	        type:'GET',
	        dataType:'json',
	        success: function(result){
	        	$('#titleModal').html("Book Detail");
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
	        }
	    });
	})

	$('#song-list').on('click', '#btn-detail-songs', function(e){
		var id = $(this).data('id')
	    $.ajax({
	        url:'https://api-song-lyrics.herokuapp.com/lyrics/' + id,
	        type:'GET',
	        dataType:'json',
	        success: function(result){
	        	$('#titleModal').html("Song Lyrics Detail");
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
	        }
	    });
	})
	
})

function searchMovies(){
	var search = $('#search-text').val()
    $.ajax({
        url:'https://www.omdbapi.com',
        type:'GET',
        dataType:'json',
        data:{
            'apikey' : '13415ac3', 
            's' : search,
        },
        success: function(result){
            let movies = result.Search;
            $('#movie-list').html('');
            if(result.Response == "True"){
            	// console.log(result.totalResults)
                $.each(movies, function(i, data){
                    $('#movie-list').append(`<div class="col-lg-4 mb-4 card-movie">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ data.Poster +`" alt="img-movie" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ data.Title +`</h5>
								<p class="card-text">Year: `+ data.Year +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-details" data-id="`+ data.imdbID +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                var items = $('#movie-list .card-movie');
                // console.log(items.length)
	            var numItems = result.totalResults;
	            var perPage = 10;

	            items.slice(perPage).hide();

	            $('#pagination-container').pagination({
	                items: numItems,
	                itemsOnPage: perPage,
	                prevText:"<",
	                nextText:">",
	                onPageClick: function(pageNumber){
	                    showDataMovieAfterPagination(pageNumber, search)
	                }
	            }).show()

            }else{
                $('#movie-list').append(`
                    <div class="col-sm-12 text-center">
                        <h1>`+ result.Error +`</h1>
                    </div>
                `);

                $('#pagination-container').hide()
            }
        }
    });
}


function searchBooks(){
	var search = $('#search-text-book').val()
	// console.log(search)
    $.ajax({
        url:'https://www.googleapis.com/books/v1/volumes',
        type:'GET',
        dataType:'json',
        data:{
            'q' : search,
        },
        success: function(result){
            $('#book-list').html('');
            if(result.items){
            	let books = result.items;
                $.each(books, function(i, data){
                	let thumbnail = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '-',
                		title = data.volumeInfo.title ? data.volumeInfo.title : '-'
                    $('#book-list').append(`<div class="col-lg-4 mb-4 card-book">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ thumbnail +`" alt="img-book" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ title +`</h5>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-detail-books" data-id="`+ data.id +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                var items = $('#book-list .card-book');
	            var numItems = result.totalItems;
	            var perPage = 10;
	            items.slice(perPage).hide();

	            $('#pagination-container-book').pagination({
	                items: numItems,
	                itemsOnPage: perPage,
	                prevText:"<",
	                nextText:">",
	                onPageClick: function(pageNumber){
	                    showDataBookAfterPagination(pageNumber, search)
	                }
	            }).show()

            }else{
                $('#book-list').append(`
                    <div class="col-sm-12 text-center">
                        <h1> Buku not found! </h1>
                    </div>
                `);

                $('#pagination-container-book').hide()
            }
        }
    });
}

function searchSongs(){
	var search = $('#search-text-song').val()
	// console.log(search)
    $.ajax({
        url:'https://api-song-lyrics.herokuapp.com/search',
        type:'GET',
        dataType:'json',
        data:{
            'q' : search,
        },
        success: function(result){
            $('#song-list').html('');
            if(result.data.length !== 0){
            	let song = result.data;
                $.each(song, function(i, data){
                	// let thumbnail = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '-',
                	// 	title = data.volumeInfo.title ? data.volumeInfo.title : '-'
                    $('#song-list').append(`<div class="col-lg-4 mb-4 card-song">
		                <div class="card h-100">
							<div class="card-body">
								<h5 class="card-title">`+ data.songTitle +`</h5>
								<p class="card-text">Artist: `+ data.artist +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-detail-songs" data-id="`+ data.songId +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                var items = $('#song-list .card-song');
	            var numItems = result.data.length;
	            var perPage = 10;
	            items.slice(perPage).hide();

	            $('#pagination-container-song').pagination({
	                items: numItems,
	                itemsOnPage: perPage,
	                prevText:"<",
	                nextText:">",
	                onPageClick: function(pageNumber){
	                	var showFrom = perPage *(pageNumber - 1);
                    	var showTo = showFrom + perPage;
                    	items.hide().slice(showFrom, showTo).show();
	                }
	            }).show()

            }else{
                $('#song-list').append(`
                    <div class="col-sm-12 text-center">
                        <h1> Song Lyrics not found! </h1>
                    </div>
                `);

                $('#pagination-container-song').hide()
            }
        }
    });
}

function showDataMovieAfterPagination(page, search){
    $.ajax({
        url:'https://www.omdbapi.com',
        type:'GET',
        dataType:'json',
        data:{
        	'apikey' : '13415ac3', 
            's' : search,
            'page': page
        },
        success: function(result){
            let movies = result.Search;
            $('#movie-list').html('');
            	$.each(movies, function(i, data){
                    $('#movie-list').append(`<div class="col-lg-4 mb-4 card-movie">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ data.Poster +`" alt="img-movie" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ data.Title +`</h5>
								<p class="card-text">Year: `+ data.Year +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-details" data-id="`+ data.imdbID +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })
        	}
    });
}

function showDataBookAfterPagination(page, search){
    $.ajax({
        url:'https://www.googleapis.com/books/v1/volumes?q='+ search +'?page=' + page,
        type:'GET',
        dataType:'json',

        success: function(result){
            let books = result.items;
            $('#book-list').html('');
            $.each(books, function(i, data){
                let thumbnail = data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : '-',
                		title = data.volumeInfo.title ? data.volumeInfo.title : '-'
                		
                    $('#book-list').append(`<div class="col-lg-4 mb-4 card-book">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ thumbnail +`" alt="img-book" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ title +`</h5>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-detail-books" data-id="`+ data.id +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                `);
            })
        }
    });
}