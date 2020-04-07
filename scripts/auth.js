 //add admin cloud function
 const adminForm = document.querySelector('.admin-actions');
 adminForm.addEventListener('submit',(e) => {
     e.preventDefault();
     const adminEmail = document.querySelector('#admin-email').value;
     const addAdminRole = functions.httpsCallable('addAdminRole');
     addAdminRole({email: adminForm})
        .then((result) => {
            console.log(result);
        })
 })

 //listen for Auth status changes
 auth.onAuthStateChanged((user) => {
    //  console.log(user)
    if(user)
    {
        //Get Token + claim
        user.getIdTokenResult().then(getIdTokenResult => {
            // console.log(getIdTokenResult.claims);
            user.admin = getIdTokenResult.claims.admin;
            setupUI(user);
        }) 
        //Getting the Data
        db.collection('guides')
        .onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message)
        });
    }
    else
    {
        setupGuides([]);
        setupUI(user);
    }
 });

 //Creating a New guide
 const createForm = document.querySelector('#create-form');
 createForm.addEventListener('submit',(e) => {
     e.preventDefault();
     db.collection('guides').add({
         title: createForm['title'].value,
         content: createForm['content'].value
     }).then(() =>{
         //close the modal and reset the form
        createForm.reset();
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
     }).catch((err) => {
         console.log(err);
     })
 });
 
 //signing UP
 const signupForm = document.querySelector('#signup-form');

 signupForm.addEventListener('submit',(e) => {
     e.preventDefault();

     //get user information
     //within the signup form we queried, lets grab the element with the ID of signup-email and signup password
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;

    //  console.log(email,password);

    //signUP the user with firebase authentication
    //its an ASYNC function
    auth.createUserWithEmailAndPassword(email,password)
        .then((cred) => {
            // console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
        
        }).then(() => {
            //clearing out form and modal
            signupForm.reset();
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
        });
 });

 //logging out from the App
 const logout = document.querySelector('#logout');
 logout.addEventListener('click',(e) => {
     e.preventDefault();
     //Async method
     auth.signOut()
        // .then(() => {
        //     // console.log('User has signed out from App')
        // });
 });

//login section
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //firebase Auth
    auth.signInWithEmailAndPassword(email,password)
        .then((cred) => {
            loginForm.reset();
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
        });
});



















