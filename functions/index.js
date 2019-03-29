const functions = require('firebase-functions');
//import the database, so we can have access
const admin = require ('firebase-admin')
admin.initializeApp()

/**The onCall calls the function on the front-end/client and output the data from the database
   Get a reference which sends the users slug of the alias they want to use to sign up(along with the object) once the function is called from the front end.
 */
exports.checkAlias = functions.https.onCall((data, context) => {

    const ref = admin.firestore().collection('users').doc(data.slug);
    return ref.get().then(doc => {
        return { unique: !doc.exists }
    }).catch(err => {
        throw new functions.https.HttpsError('failed to connect')
    });
})