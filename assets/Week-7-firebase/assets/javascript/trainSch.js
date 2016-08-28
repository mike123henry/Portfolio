// Link to Firebase
var clickData = new Firebase("https://mike123-trainsch.firebaseio.com/");
var startTime;
//https://mike123-trainsch.firebaseio.com/#-KJILw2nVxsIdwx0k8F5|0075578bd0f4386061993efbbd5edacd

//var clickData = new Firebase("https://flickering-heat-7798.firebaseio.com/");

$(document).on("click", '#adminInput', function() {
	var trainNameEntered = $('#trainName').val().trim();
	var destinationEntered = $('#destination').val().trim();
	var frequencyEntered = $('#frequency').val().trim();
	var firstTrainDpartEntered = $('#firstTrainDpartTime').val().trim();
	console.log("List of things: " + trainNameEntered+ " " + destinationEntered+ " "  + frequencyEntered+ " "  + firstTrainDpartEntered);

startTime = new moment(firstTrainDpartEntered,'hh:mm');
console.log('startTime = '+ startTime);
//  var startTime = moment() + firstTrainDpartEntered;
//    console.log(startTime);

	clickData.push({
		"trainNameFB": trainNameEntered,
		"destinationFB": destinationEntered,
		"frequencyFB": frequencyEntered,
		"firstTrainDpartFB": firstTrainDpartEntered
	})
//"firstTrainDpartFB": startTime

  //clear the entry form
	trainNameEntered = $('#trainName').val("");
	destinationEntered = $('#destination').val("");
	frequencyEntered = $('#frequency').val("");
	firstTrainDpartEntered = $('#firstTrainDpartTime').val("");
	return false;
});

clickData.on("child_added", function(childSnapshot){
	var trainNameAppend = childSnapshot.val().trainNameFB;
	var destinationAppend = childSnapshot.val().destinationFB;
	var frequencyAppend = childSnapshot.val().frequencyFB;
	var firstDepart = childSnapshot.val().firstTrainDpartFB;
	var firstTrainMath = moment(firstDepart,"hh:mm");
	var currentTime = moment();
	var howManyMinutes = currentTime.diff(firstTrainMath, "minutes");
	var minToNextTrain = firstTrainMath % frequencyAppend;
	var nextTime =  currentTime.add(minToNextTrain, "minutes");
	nextTime = moment(nextTime).format("hh:mm")

	console.log("trainNameAppend = "+trainNameAppend);
	console.log("destinationAppend = "+destinationAppend);
	console.log("frequencyAppend = "+frequencyAppend);
	console.log("firstDepart = "+firstDepart);
	console.log("firstTrainMath = "+firstTrainMath);
	console.log("currentTime = "+currentTime);
	console.log("howManyMinutes = "+howManyMinutes);
	console.log("minToNextTrain = "+minToNextTrain);
	console.log("nextTime = "+nextTime);


  //var currentMoment = moment();
  //var startMoment = moment(new firstTrainDpartEntered);var currentTime = moment();
	//var nextArrivalAppend = childSnapshot.val().nextArrivalFB;

	/*var momentMonths = moment(new Date(appendDate));
	var currentMoment = moment();
	var howManyMonths = moment().diff(startTime, "minutes");
	var howMuchPaid = howManyMonths * childSnapshot.val().rateGivenFB;
	console.log(howManyMonths + " This is the months");
	console.log(appendName);*/
	$('#trainSchTable').prepend("<tr><td>" + trainNameAppend + "</td><td>" + destinationAppend + "</td><td>" +  frequencyAppend + "</td><td>" +  nextTime + "</td><td>" +  minToNextTrain + "</td></tr>");

});


///dateAdded: Firebase.ServerValue.TIMESTAMP
//.on('child_added', function() {});

