//Page for show/Movie
function pullShow(id) {
	var title = $('#title');
    var iURL = "http://www.omdbapi.com/?i=" + id + "&apikey=9af0ac15"
    $.ajax({
        method: 'GET',
		async: false,
        url: iURL,
        dataType: 'json',
        // Get Number of Seasons
        success: (function (result) {
            //console.log(result)
            // Loop through each season
            for (var i = 0; i < result.totalSeasons; i++) {
                var seasonURL = "http://www.omdbapi.com/?i=" + id + "&season=" + (i + 1) + "&apikey=9af0ac15"
                $.ajax({
                    method: 'GET',
					async: false,
                    url: seasonURL,
                    dataType: 'json',
                    //Get each episode
                    success: (function (seasonResult) {
                        console.log(seasonResult)
                        for (var j = 0; j < seasonResult.Episodes.length; j++) {
                            var epID = seasonResult.Episodes[j].imdbID
                            var epURL = "http://www.omdbapi.com/?i=" + epID + "&plot=long&apikey=9af0ac15"
                            $.ajax({
                                method: 'GET',
								async: false,
                                url: epURL,
                                dataType: 'json',
                                //Get each episode
                                success: (function (epResult) {
								
									var episodeText = "Season: " + epResult.Season + " Episode " + epResult.Episode + "</br>Title: " + epResult.Title + " " + epResult.Released + "</br></br>" 
                                   // console.log(epResult);
									title.append(episodeText)

                                }),
                                error: function (error) {
                                    console.error('@ERROR', error);
                                }
                            });
                        }

                    }),
                    error: function (error) {
                        console.error('@ERROR', error);
                    }
                });
            }

        }),
        error: function (error) {
            console.error('@ERROR', error);
        }
    });


}
var id = window.location.hash.substring(1)
pullShow(id)


