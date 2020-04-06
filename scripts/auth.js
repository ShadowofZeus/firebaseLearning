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
            console.log(cred);
        //clearing out form and modal
        signupForm.requestFullscreen();
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        })
 });

 //logging out from the App
 const logout = document.querySelector('#logout');
 logout.addEventListener('click',(e) => {
     e.preventDefault();
     //Async method
     auth.signOut()
        .then(() => {
            console.log('User has signed out from App')
        });
 });