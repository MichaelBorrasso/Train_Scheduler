
var config = {
    apiKey: "AIzaSyDxzIKRgko3RcM58FJF3Lt87badLRbN4-Q",
    authDomain: "train-scheduler-46e17.firebaseapp.com",
    databaseURL: "https://train-scheduler-46e17.firebaseio.com",
    projectId: "train-scheduler-46e17",
    storageBucket: "",
    messagingSenderId: "268479552050"
};
firebase.initializeApp(config);

$("#trainAddButton").on("click", function () {
    event.preventDefault();
    // console.log("i've been clicked");
    // Assigning user input to variables
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    //  console.log(firstTrain);
    //  console.log(trainName);
    //  console.log(destination);
    //  console.log(frequency);
    var firstTrainTimeConverted = moment(firstTrain, "HH,mm").subtract(1,"years");
    console.log(firstTrainTimeConverted);

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainTimeConverted),"minutes");
console.log(firstTrainTimeConverted);

    var remainder = diffTime % frequency;
console.log(remainder);

    var minutesTillTrain = frequency - remainder;
console.log(minutesTillTrain);  

    var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
    console.log(nextTrain);
    
    
    firebase.database().ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        nextTrain: nextTrain,
        minutesTillTrain: minutesTillTrain,
    })


});

firebase.database().ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val().name);
    // console.log(trainName);
    $("#addedTrains").append("<tr><th>" + childSnapshot.val().name + "</th><th>" + childSnapshot.val().destination + "</th><th>" + childSnapshot.val().frequency + "</th><th>" + childSnapshot.val().nextTrain + "</th><th>" + childSnapshot.val().minutesTillTrain + "</th></tr>" );
    console.log(childSnapshot);

})

