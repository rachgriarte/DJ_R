// Initialize Firebase
var config = {
  apiKey: "AIzaSyDj8Z0cqYw9HXuXsLZterps0D7Lo9p-aXg",
  authDomain: "better-blackjack.firebaseapp.com",
  databaseURL: "https://better-blackjack.firebaseio.com",
  projectId: "better-blackjack",
  storageBucket: "better-blackjack.appspot.com",
  messagingSenderId: "312842559303"
};
firebase.initializeApp(config);

// Constants
const btnLogout = document.getElementById('btnLogout');

// Logs the current user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      console.log(user.email + " is logged in.");
      console.log("User unique ID: " + user.uid);
  } else {
    // Prints no user is logged in
    console.log("No user is logged in.");
  }
});

// Function to log out user
btnLogout.addEventListener("click", () => {
  // Execute signout function
  firebase.auth().signOut();
  console.log("User is signed out");
});