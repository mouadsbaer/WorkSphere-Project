let tab_utilisateurs = JSON.parse(localStorage.getItem('user')) || [];
const email_login = document.getElementById('email_login');
const Password_login = document.getElementById('Password_login');
const loginbtn = document.getElementById('loginbtn');
const msg_confirmation2 = document.getElementById('msg_confirmation2');

email_login.addEventListener('keyup', ()=>{
    email_login.style.border = '2px solid green';
    email_login.style.outline = 'none';
})
Password_login.addEventListener('keyup', ()=>{
    Password_login.style.border = '2px solid green';
    Password_login.style.outline = 'none';

})
let exist = false;
loginbtn.addEventListener('click', ()=>{
    if(email_login.value != '' && Password_login.value != ''){
        for(let i=0 ; i<tab_utilisateurs.length; i++){
    if(tab_utilisateurs[i].email === email_login.value && tab_utilisateurs[i].pass === Password_login.value){
        exist = true;
    
    }
    
}
if(exist === true){
    msg_confirmation2.style.display = 'block';
    setTimeout(()=>{
            window.location.href = 'salles.html';
        }, 800)
}
    
        else{
            alert('no user with this email or password');
        }
    }
    else{
        if(email_login.value === ''){
            email_login.style.border = '2px solid red';
            alert('Enter your email !')
            return
        }
        if(Password_login.value === ''){
            Password_login.style.border = '2px solid red';
            alert('Enter your password !')

            return
        }
    }
    
})