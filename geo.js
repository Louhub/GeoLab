function geotest(){
	if (navigator.geolocation){
	   alert("Geo available");
	}else{
	  alert("no geo");
	}
}

$(document).ready(function(){
   var myOptions = {
      center: new google.maps.LatLng(53.5, -7),
	  zoom: 6,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   
   map = new google.maps.Map(document.getElementById("map"), myOptions);
   
   $('#go').click(function(){
      //test for geolocation
	  if(navigator && navigator.geolocation){
	    //make requests for the user's position 
		navigator.geolocation.getCurrentPosition(geo_success, geo_error,{timeout:80000});
	  }else{
	     error('Geolocation is not supported');
	  }
	});
}); 

function geo_success(position){
  printLatLong(position.coords.latitude, position.coords.longitude);
  printAddress(position.coords.latitude, position.coords.longitude);
}

//Output lat and long
function printLatLong(lat, lng){
   alert(lat +"   "+ lng);
   $('#lat').html('<p>Latitude:  ' + lat + '</p>');
   $('#lng').html('<p>Longitude:  ' + lng + '</p>');
}

//google maps global map vaiable
var map;

//use Google maps to reverse geocode the location
function printAddress(latitude, longitude){
	//create goolge maps gecoder obj
	var geocode = new google.maps.Geocoder();
	
	//change coordinates to location
	var yourLocation = new google.maps.LatLng(latitude, longitude);
	
	//Setup map and position on map
    	var myOptions = {
        	zoom: 15,
        	mapTypeId: google.maps.MapTypeId.ROADMAP,
        	center: yourLocation
    	}
    	map = new google.maps.Map(document.getElementById("map"), myOptions);

	
	//to add the maker to the map set it up then call setMap();
    var marker = new google.maps.Marker({
    position: yourLocation,
    title:"hello world"
   });

   	 marker.setMap(map);
	
	//use google maps to find out about the area
	geocode.geocode({ 'latLng' : yourLocation }, function (results, status){
	   if(status = google.maps.GeocoderStatus.OK){
	      if(results[0]){
		     $('#local').html('Your Address:<br />' + results[0].formatted_address);
		  }else{
		     error('Google did not return results');
		  }
	   }else{
	   		 error('Reverse Geocoding faild due to: ' + status);
	   }
	 });
}

function geo_error(err){
   if(err.code == 1){
      error('The user denied request for location info')
   }else if(err.code == 2){
      error(' your location info is unavailable ')
   }else if(err.code == 3){
      error('The request to get your location timed out')
   }else{
      error('An unknown error occured')
   } 
}

function error(msg){
   alert(msg);
}






//https://developers.google.com/maps/documentation/javascript/geocoding


