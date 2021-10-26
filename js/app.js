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
	
	// $('#search-text').on('keyup', function(e){
	//     if(e.keyCode == 13) //tombol enter
	//     { 
	//         searchMovies();
	//     }
	// })

	$('#btn-search').on('click', function(e){
	    searchMovies();
	})

	// $('#search-text-book').on('keyup', function(e){
	//     if(e.keyCode == 13) //tombol enter
	//     { 
	//         searchBooks();
	//     }
	// })

	$('#btn-search-book').on('click', function(e){
		console.log("ahmad")
	    searchBooks();
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
	                $('.modal-body').html('');
	                $('.modal-body').append(`
	                    <div class="container-fluid">
	                        <div class="row">
	                            <div class="col-md-4 d-flex justify-content-center align-items-center">
	                                <img src="` + result.Poster + `" class="img-fluid" alt="img-movie-detail">
	                            </div>
	                            <div class="col-md-8">
	                                <ul class="list-group">
	                                  <li class="list-group-item"><h4>`+ result.Title +`</h4></li>
	                                  <li class="list-group-item">Dirilis : `+ result.Released +`</li>
	                                  <li class="list-group-item">Aliran : `+ result.Genre +`</li>
	                                  <li class="list-group-item">Penulis : `+ result.Writer +`</li>
	                                  <li class="list-group-item">Aktor : `+ result.Actors +`</li>
	                                  <li class="list-group-item">Produksi : `+ result.Production +`</li>
	                                  <li class="list-group-item">Alur Cerita : `+ result.Plot +`</li>
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
		console.log(id)
	    $.ajax({
	        url:'https://www.googleapis.com/books/v1/volumes/' + id,
	        type:'GET',
	        dataType:'json',
	        success: function(result){
	        	console.log(result)
                $('.modal-body').html('');
                $('.modal-body').append(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 d-flex justify-content-center align-items-center">
                                <img src="` + result.volumeInfo.imageLinks.thumbnail + `" class="img-fluid" alt="img-movie-detail">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                  <li class="list-group-item"><h4>`+ result.volumeInfo.title +`</h4></li>
                                  <li class="list-group-item">Penulis : `+  result.volumeInfo.categories.join(', ') +`</li>
                                  <li class="list-group-item">Penulis : `+  result.volumeInfo.authors.join(', ') +`</li>
                                  <li class="list-group-item">Penerbit : `+ result.volumeInfo.publisher +`</li>
                                  <li class="list-group-item">Tanggal Terbit : `+ result.volumeInfo.publishedDate +`</li>
                                  <li class="list-group-item">Jumlah Halaman : `+ result.volumeInfo.pageCount +`</li>
                                  <li class="list-group-item">Deskripsi : `+ result.volumeInfo.description +`</li>
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
								<p class="card-text">Tahun: `+ data.Year +` </p>
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

    $('#search-text').val("");
}


function searchBooks(){
	var search = $('#search-text-book').val()
	console.log(search)
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
                    $('#book-list').append(`<div class="col-lg-4 mb-4 card-book">
		                <div class="card h-100">
							<div class="card-header">
								<img src="`+ data.volumeInfo.imageLinks.thumbnail +`" alt="img-book" class="card-img-top img-movie" height="300px">
							</div>

							<div class="card-body">
								<h5 class="card-title">`+ data.volumeInfo.title +`</h5>
								<p class="card-text">Jumlah Halaman: `+ data.volumeInfo.pageCount +` </p>
	                        	<a href="#" class="btn btn-primary btn-sm" id="btn-detail-books" data-id="`+ data.id +`" 
                    			data-toggle="modal" data-target="#exampleModal"> Detail</a>
							</div>
						</div>
	                </div>
                    `);
                })

                var items = $('#book-list .card-book');
	            var numItems = result.totalItems;
	            console.log(numItems)
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
  				console.log("error")
                $('#book-list').append(`
                    <div class="col-sm-12 text-center">
                        <h1> Buku not found! </h1>
                    </div>
                `);

                $('#pagination-container-book').hide()
            }
        }
    });

    $('#search-text').val("");
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
								<p class="card-text">Tahun: `+ data.Year +` </p>
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
                $('#book-list').append(`<div class="col-lg-4 mb-4 card-book">
	                <div class="card h-100">
						<div class="card-header">
							<img src="`+ data.volumeInfo.imageLinks.thumbnail +`" alt="img-book" class="card-img-top img-movie" height="300px">
						</div>

						<div class="card-body">
							<h5 class="card-title">`+ data.volumeInfo.title +`</h5>
							<p class="card-text">Jumlah Halaman: `+ data.volumeInfo.pageCount +` </p>
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