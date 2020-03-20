var firebaseConfig = {
    apiKey: "AIzaSyABvv4dF_DgdgDDQXAQh4SAk0z4Hpgn02Q",
    authDomain: "train-schedule-8ec29.firebaseapp.com",
    databaseURL: "https://train-schedule-8ec29.firebaseio.com",
    projectId: "train-schedule-8ec29",
    storageBucket: "train-schedule-8ec29.appspot.com",
    messagingSenderId: "170223552655",
    appId: "1:170223552655:web:7b788bfbc4c613827348fa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  var database = firebase.database();

$(document).ready(function(){
  var tName=""
  var firstT=""
  var dest=""
  var freq=""

  // Submit Button Click
$("#addtrain").on("click", function(event){
	event.preventDefault(); 
	
	// Code in the logic for storing and retrieving the most recent trains.
	tName = $("#tInput").val().trim();
	dest = $("#destInput").val().trim();
	firstT = $("#firstInput").val().trim();
	freq = $("#freqInput").val().trim();


  console.log("Train name: " + tName);
  console.log("Destination: " + dest);
  console.log("First time: " + firstT);
  console.log("Frequency: " + freq);





  database.ref().push({
		trainname: tName,
		destination: dest,
		firsttime: firstT,
		frequency: freq
  });
  
  $("#tInput").val("");
	$("#destInput").val("");
	$("#firstInput").val("");
	$("#freqInput").val("");


});

// Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      tName = childSnapshot.val().trainname;
      dest = childSnapshot.val().destination
      firstT = childSnapshot.val().firsttime;
      freq = childSnapshot.val().frequency;


      var firsttimeMoment = moment(firstT, "HH:mm");
      // console.log("TIME CONVERTED: " + firsttimeMoment);
      
      // It is Now - moment
      var currenttime = moment();
      // console.log("Now TIME: " + currenttime);

      var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
      var minuteLast = minuteArrival % freq;
      var awayTrain = freq - minuteLast;

      // console.log("Minutes: " + minuteArrival);
      // console.log("Minutes Last: " + minuteLast);
      // console.log("Away Train: " + awayTrain);

      var nextArrival = currenttime.add(awayTrain, 'minutes');
      var arrivaltime = nextArrival.format("LTS");
      // console.log("Away Arrival: " + nextArrival);
      // console.log("Arrival Time: " + arrivaltime);

      
    // full list of items to the well
	$("#trains").append("<tr><td>" + tName + "</td><td>" + dest + "</td><td>" + arrivaltime + "</td><td>" + freq + "</td>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


  });