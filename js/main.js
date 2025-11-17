let full_name = document.getElementById('full_name');
let identificateur = document.getElementById('identificateur');
let email = document.getElementById('email');
let password = document.getElementById('password');
let btn_register = document.getElementById('btn_register');
let tableaux_utilisateur;
let utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
let msg_confirmation = document.getElementById('msg_confirmation');
let msg_refuse = document.getElementById('msg_refuse');
if(localStorage.utilisateur != null){
    tableaux_utilisateur = JSON.parse(localStorage.utilisateur);
}
else{
    tableaux_utilisateur = [];
}


btn_register.addEventListener('click', () => {
    if(full_name.value != '' && identificateur.value != '' && email.value != '' && password.value !=''){
        let utilisateur = {
        fullName : full_name.value,
        id : identificateur.value,
        Email : email.value,
        pass : password.value,
    }

    full_name.style.border = '1px solid green';
    identificateur.style.border = '1px solid green';
    email.style.border = '1px solid green';
    password.style.border = '1px solid green';
    
    tableaux_utilisateur.push(utilisateur);
    localStorage.setItem('utilisateur', JSON.stringify(tableaux_utilisateur));
    msg_confirmation.style.display= 'block';
    }
    else{
        if(full_name.value === ''){
            full_name.style.border = '1px solid red';
        }
        else if(identificateur.value === ''){
            identificateur.style.border = '1px solid red';
            full_name.style.border = '1px solid green';
        }
        else if(email.value === ''){
            email.style.border = '1px solid red';
            identificateur.style.border = '1px solid green';

        }
        else if(password.value === ''){
            password.style.border = '1px solid red';
            email.style.border = '1px solid green';

        }
    }
    full_name.value='';
    identificateur.value = '';
    email.value = '';
    password.value = '';
    
});
