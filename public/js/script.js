const WEBSITEROOT = window.location.origin
console.log(WEBSITEROOT)
$( document ).ready(function() {
    $('.search').keyup(function() {
       let value = $('.search').val();
        console.log(value);
       if(value == ""){
           $( ".resultsreach" ).hide()
           $(".rand-product").show()
           $(".productOfTheDay").show()
           $(".newProduct").show()
       }
       else{
           $( ".resultsreach" ).show()
           $(".rand-product").hide()
           $(".productOfTheDay").hide()
           $(".newProduct").hide()
       }
        $.ajax({
            type:'POST',
            url:'/',
            data:{'value': value },
            dataType: "json",
            success:function(data){
                // the next thing you want to do
                $.map( data, function( val ) {

                    $( ".resultsreach" ).addClass("skin")
                    $( ".resultsreach h1" ).html('Resultat de la recherche :');
                    $( ".resultsreach h5" ).html(val.name);
                    $( ".resultsreach h6" ).html('<strong>Description</strong> </br></br>'+val.description);

                        $.map( val.characteristicProducts, function( val1 ) {
                            $( ".resultsreach p" ).html('Prix : ' +val1.price);
                        });

                    $( ".resultsreach a" ).html('En s\'avoir plus')
                    $( ".resultsreach a" ).attr("href", window.location.origin + '/product/' + val.id)
                });
            }
        });
    });
});