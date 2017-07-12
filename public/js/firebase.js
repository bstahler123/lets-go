 var config = {
    apiKey: "AIzaSyCYpC37q83m3w-nGyapTIq7r06FuCxEusg",
    authDomain: "lets-go-5195d.firebaseapp.com",
    databaseURL: "https://lets-go-5195d.firebaseio.com",
    projectId: "lets-go-5195d",
    storageBucket: "lets-go-5195d.appspot.com",
    messagingSenderId: "983259327133"
  };
firebase.initializeApp(config);
var database = firebase.database();
/**
 * Function called when there is a change in Facebook auth state.
 */
// [START facebookcallback]
function checkLoginState(event) {
    if (event.authResponse) {
        // User is signed-in Facebook.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(event.authResponse, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                // [START facebookcredential]
                var credential = firebase.auth.FacebookAuthProvider.credential(
                    event.authResponse.accessToken);
                // [END facebookcredential]
                // Sign in with the credential from the Facebook user.
                // [START authwithcred]
                firebase.auth().signInWithCredential(credential).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                    } else {
                        console.error(error);
                    }
                    // [END_EXCLUDE]
                });
                // [END authwithcred]
            } else {
                // User is already signed-in Firebase with the correct user.
            }
        });
    } else {
        // User is signed-out of Facebook.
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
}
// [END facebookcallback]
/**
 * Check that the given Facebook user is equals to the  given Firebase user
 */
// [START checksameuser]
function isUserEqual(facebookAuthResponse, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === facebookAuthResponse.userID) {
                // We don't need to re-auth the Firebase connection.
                return true;
            }
            else {
                firebase.auth().signOut();
            }
        }
    }
    return false;
}
// [END checksameuser]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var currentLocation = $("body").attr("scene");
            firebase.database().ref('users/' + uid).update({
                username: displayName,
                profile_picture: photoURL,
                
            });
            // [START_EXCLUDE]
            $("#user-picture").html('<img src="' + photoURL + '">');
            $("#save").show();
            $("#load").show();
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in.';
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            $("#user-picture").empty();
            $("#save").hide();
            $("#load").hide();
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out.';
            // [END_EXCLUDE]
        }
    });
    // [END authstatelistener]
}
initApp();

// Facebook Login Init
FB.init({
    /**********************************************************************
     * TODO(Developer): Change the value below with your Facebook app ID. *
     **********************************************************************/
    appId: '1737224106292372',
    status: true,
    xfbml: true,
    version: 'v2.6'
});
// [START_EXCLUDE silent]
// Observe the change in Facebook login status
// [START facebookauthlistener]
FB.Event.subscribe('auth.authResponseChange', checkLoginState);
// [END facebookauthlistener]
// [END_EXCLUDE]
