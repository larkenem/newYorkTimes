// Same thing as $(document).ready(function(){})
$(() =>{
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var searchParm = '';
    var resultNum;
    var beginDate = '';
    var endDate = '';
    var userMaxChoice;

    var titles = [];
    var descs = [];
    var about;
    // add 'hl': true to highlight the searched texjt
    
    var mainFunctions = {
        getArticles: function(){
            url += '?' + $.param({
                'api-key': "f6558cc2c6e74a30b177c52640915d6e",
                'q': searchParm,
                'begin_date': beginDate + '0101', // Must be in YYYYMMDD format
                'end_date': endDate + '0101', // Must be in YYYMMDD format
            });
           $.ajax({
                url: url,
                method: 'GET'
            }).then(function(results){
                article = results.response.docs;
                for (var j = 0; j < article.length; j++){
                    titles.push(article[j].headline.main);
                    descs.push(article[j].snippet);
                }
                console.log(article)
                mainFunctions.updateDom();
            }) 
        },
        updateDom: function(){
            for (var i = 0; i < titles.length; i++){
                var articleCont = $('<div>');
                var artHeading = $('<div>');
                var artTitle = $("<div>");
                var artBody = $('<div>');
                articleCont.addClass('panel panel-default loopThrough');
                artHeading.addClass('panel-heading');
                artTitle.addClass('panel-title myTitle');
                artBody.addClass('panel-body myBody');

                artTitle.html(titles[i]);
                artBody.html(descs[i]);

                articleCont.html(artHeading);
                artHeading.html(artTitle);
                articleCont.append(artBody);
                
                $('#choose_this').append(articleCont)
            }
        }
    }


    


    
    
    $('#searchBtn').click(()=>{
        searchParm = $('#searchTerm').val();
        beginDate = $('#startYear').val();
        endDate = $('#endYear').val();
        userMaxChoice = $('')
        mainFunctions.getArticles();
    })
    
    
})



// BEGIN API SHORTCUTS
// =======================================================

// .snippet = short paragraph description
// .web_url = link to active page
// .pub_date = date of article publication
// .headline.main = article headline

// END API SHORTCUTS
// =======================================================