const msg_confirmation = document.getElementById('msg_confirmation');
const msg_refuse = document.getElementById('msg_refuse');
const full_name = document.getElementById('full_name');
const identificateur = document.getElementById('identificateur');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btn_register = document.getElementById('btn_register');
let tab_utilisateurs = JSON.parse(localStorage.getItem('user')) || [];

function reset_form(){
    full_name.value = '';
    identificateur.value = '';
    email.value = '';
    password.value = '';

}


full_name.addEventListener('keyup', ()=>{
    full_name.style.border = '2px solid green';
    full_name.style.outline = 'none';

});
identificateur.addEventListener('keyup', ()=>{
    identificateur.style.border = '2px solid green';
    identificateur.style.outline = 'none';

});
email.addEventListener('keyup', ()=>{
    email.style.border = '2px solid green';
    email.style.outline = 'none';

});
password.addEventListener('keyup', ()=>{
    password.style.border = '2px solid green';
    password.style.outline = 'none';

});
btn_register.addEventListener('click', ()=>{
    if (full_name.value != '' && identificateur.value != '' &&
        email.value != '' &&
        password.value != ''
    )
    {
        let utilisateur = {
            fName : full_name.value,
            id : identificateur.value,
            email : email.value,
            pass : password.value,

        }
        tab_utilisateurs.push(utilisateur);
        localStorage.setItem('user', JSON.stringify(tab_utilisateurs));
        

        msg_confirmation.style.display = 'block';
        setTimeout(()=>{
            msg_confirmation.style.display = 'none';
        }, 900);
        reset_form();
        setTimeout(()=>{
            window.location.href = 'index.html'
        }, 1500);
    }
    else{
        if(full_name.value === ''){
            full_name.style.border = '2px solid red';
            alert('Enter your full name !!');
            return
        }
        if(identificateur.value === ''){
            full_name.style.border = '2px solid green';
            identificateur.style.border = '2px solid red';
            alert('Enter an ID !!');
            return
        }
        if(email.value === ''){
            full_name.style.border = '2px solid green';
            identificateur.style.border = '2px solid green';
            email.style.border = '2px solid red';
            alert('Enter your email!!');
            return
        }
       if(password.value === ''){
            full_name.style.border = '2px solid green';
            identificateur.style.border = '2px solid green';
            email.style.border = '2px solid green';
            full_name.style.border = '2px solid red';
            alert('Enter a password !!');
            return
        } 
    }
});

localStorage.clear()