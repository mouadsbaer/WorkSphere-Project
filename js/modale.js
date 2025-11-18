let add_worker_btn = document.getElementById('add_worker_btn');
let modale = document.getElementById('modale');
let remove_btn = document.getElementById('remove_btn');
let add_experience = document.getElementById('add_experience');
let exps = document.getElementById('exps');
let rmv_experience = document.getElementById('rmv_experience');
let add_btn = document.getElementById('add_btn');
let f_name = document.getElementById('f_name');
let worker_img = document.getElementById('worker_img');
let role = document.getElementById('role');
let worker_email = document.getElementById('worker_email');
let worker_phone = document.getElementById('worker_phone');
let experi = document.getElementById('experi');
let s_date = document.getElementById('s_date');
let end_date = document.getElementById('end_date');
let suucces_btn = document.getElementById('suucces_btn');
let show_menu = document.getElementById('show_menu');
let left_side = document.getElementById('left_side');
let hide_menu = document.getElementById('hide_menu');
let worker_local = document.getElementById('worker_local');
let modale_infos_user = document.getElementById('modale_infos_user');
let hide_modale_user = document.getElementById('hide_modale_user');
let part_right = document.getElementById('part_right');
let tableaux_exp =document.getElementById('tableaux_exp');
let member_to_room = document.querySelectorAll('.add_member');
let show_members = document.querySelectorAll('.show_members');
let close_users_room = document.getElementById('close_users_room');

console.log(show_members)
/* Affichage et désaffichage du formulaire de staff :*/
add_worker_btn.addEventListener('click', ()=>{
    modale.classList.add("open");
    
});
remove_btn.addEventListener('click', ()=>{
    modale.classList.remove("open");
    suucces_btn.style.display = 'none';
});


/* Traitement des expériences :*/
let tableaux_experiences =[];


add_experience.addEventListener('click', (event)=>{
    event.preventDefault();
    if(experi.value === '' || s_date.value === '' || end_date.value === ''){
        alert('all fields are required !')
    }
    else{
        let experiences_user = {
            experience : experi.value,
            start_date : s_date.value,
            end_date : end_date.value,
        }
        tableaux_experiences.push(experiences_user);
        alert('experience added !');
        experi.value= '';
        s_date.value= '';
        end_date.value= '';
    }
});


rmv_experience.addEventListener('click', ()=>{
    experi.value = '';
    s_date.value = '';
    end_date.value = '';
});

let tab_users;

if(localStorage.staff != null){
    tab_users = JSON.parse(localStorage.staff);
}
else{
    tab_users = [];
}


/* Ajouter un staff depuis le formulaire : */
add_btn.addEventListener('click', ()=>{
    // const f_name_v = f_name.value;
    // const worker_img_v = worker_img.value;
    // const role_v = role.value;
    // const worker_email_v = worker_email.value;
    // const worker_phone_v = worker_phone.value;


  
    //         do{
    //             f_name.style.border = '1px solid red';  
    //         }while((f_name_v === ''));
    //         do{
    //              worker_img.style.border = '1px solid red';
    //             alert('Enter your image url !');
    //         }while(worker_img_v === '');

    //         do{
    //              role.style.border = '1px solid red';
    //             alert('Choose your role !');
    //         }while((role_v === ''));
    //         do {
    //              worker_email.style.border = '1px solid red';
    //             alert('Enter your Email !');
    //         }while(worker_email_v.value === '');
    //          do{
    //              worker_phone.style.border = '1px solid red';
    //             alert('Enter your Phone number !');
    //         }while(worker_phone_v === '');


   
            let staff = {
            nom : f_name.value,
            img : worker_img.value,
            role : role.value,
            email : worker_email.value,
            phone : worker_phone.value,
            experience : tableaux_experiences,
            location : worker_local.value,
            
        }
        
        tab_users.push(staff);
        localStorage.setItem('staff' , JSON.stringify(tab_users));
        

        suucces_btn.style.display = 'block';
        part_right.innerHTML += `<div class="part_users_added">
                    <div class="user_photo">
                        <img src="imgs/profile.png" alt="">
                    </div>
                    <h3>${staff.nom}</h3>
                    <p>${staff.role}</p>
                    <button class="details_user">Details</button>
                </div>`
        const details_user = document.querySelectorAll('.details_user');
        

/* Traitement d'affichage des infos de chaque staff :*/
        details_user.forEach(button => {
        button.addEventListener('click', ()=>{
        modale_infos_user.classList.add('open');
        modale_infos_user.innerHTML = `<button class="hide_modale_user" id="hide_modale_user">x</button>
        <div class="head_cv">
            <div class="left_side_cv">
            <img src="${staff.img}" alt="">
            </div>
        <div class="right_side_cv">
            <div class="first_side">
            <div><span>Nom : </span>${staff.nom}</div>
            <div><span>Role : </span>${staff.role}</div>
            <div><span>Email : </span>${staff.email}</div>
            </div>
            <div class="second_side">
                <div><span>Phone : </span>${staff.phone}</div>
                <div><span>Location : </span>${staff.location}</div>
            </div>
        </div>
        </div>
        <div class="table_exp">
            <h2>Experiences :</h2>
            <table id="tableaux_exp">
                <tr>
                    <th>Experience</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                <tr>
                    <td>${staff.experience[0].experience}</td>
                    <td>${staff.experience[0].start_date}</td>
                    <td>${staff.experience[0].end_date}</td>
                </tr>
            </table>
        </div>`
    });
              hide_modale_user.addEventListener('click', ()=>{
        modale_infos_user.classList.remove('open');
});
});
        f_name.value ='';
        worker_img.value = '';
        role.value= '';
        worker_email.value= '';
        worker_phone.value= '';
        experi.value= '';
        s_date.value= '';
        end_date.value= '';
});

/* Affichage et désaffichage de menu :*/
show_menu.addEventListener('click', ()=>{
    left_side.classList.add('afficher');
});
hide_menu.addEventListener('click' , ()=>{
    left_side.classList.remove('afficher');
});

member_to_room.forEach(button =>{
    button.addEventListener('click', ()=>{
        show_members.classList.add('affiche');
    });
});
close_users_room.addEventListener('click', ()=>{
    show_members.classList.remove('affiche');
});