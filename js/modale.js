const add_worker_btn = document.getElementById('add_worker_btn');
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
let show_members = document.getElementById('show_members'); // Use ID instead of class
let close_users_room = document.getElementById('close_users_room');
let details_btn = document.querySelectorAll('.details_user');
let modifier_user = document.querySelectorAll('.modifier_user');
let tab_users = JSON.parse(localStorage.getItem('staff')) || [];
let modal_btns = document.getElementById('modal_btns');
let update_user = document.getElementById('update_user');
let tableaux_staff_unassigned = [];
let previsualisation = document.getElementById('previsualisation');
let delete_user = document.getElementById('delete_user');
let assign_user = document.querySelectorAll('.assign_user');
let add_member_to_room = document.getElementById('add_member_to_room');
let container_cercle =document.getElementById('container_cercle');
let cercle = document.getElementById('cercle');
let global_container = document.getElementById('global_container');
let assignedStaff = {
    1: [], // Room 1 assigned staff
    2: [], // Room 2 assigned staff  
    3: [], // Room 3 assigned staff
    4: [], // Room 4 assigned staff
    5: [], // Room 5 assigned staff
    6: []  // Room 6 assigned staff
};

cercle.style.left ='1px';

container_cercle.addEventListener('click', ()=>{
    
    console.log(cercle.style.left);
        if(cercle.style.left ==='1px'){
            cercle.style.left ='20px';
    cercle.style.background='#179bff';
    document.body.classList.add('dark');
    global_container.classList.add('dark');
        }
        else{
            cercle.style.left ='1px';
    cercle.style.background='#042137';
    document.body.classList.remove('dark');
    global_container.classList.remove('dark');
        }
 
});

/* Affichage et désaffichage du formulaire de staff :*/
add_worker_btn.addEventListener('click', ()=>{
    modale.classList.add("open");
    
    // Set default image initially
    previsualisation.src = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";
    
    // Reset the form image URL
    worker_img.value = '';
});

// Handle image URL input with default image fallback
worker_img.addEventListener('keyup', function(){
    if(this.value && this.value.trim() !== '') {
        // If user entered a URL, use it
        previsualisation.src = this.value;
    } else {
        // If input is empty, use default image
        previsualisation.src = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";
    }
});

// Also handle when the input loses focus (in case user pastes URL)
worker_img.addEventListener('change', function(){
    if(this.value && this.value.trim() !== '') {
        previsualisation.src = this.value;
    } else {
        previsualisation.src = "imgs/profile.png";
    }
});
remove_btn.addEventListener('click', ()=>{
    modale.classList.remove("open");
    suucces_btn.style.display = 'none';
    resetForm();
});


/* Traitement des expériences :*/
let tableaux_experiences =[];


add_experience.addEventListener('click', (event)=>{
    event.preventDefault();
    if(experi.value === '' || s_date.value === '' || end_date.value === ''){
        alert('all fields are required !');
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


rmv_experience.addEventListener('click', (e)=>{
    e.preventDefault();
    experi.value = '';
    s_date.value = '';
    end_date.value = '';
});


/* Ajouter un staff depuis le formulaire : */
add_btn.addEventListener('click', ()=>{
    const staffImage = worker_img.value && worker_img.value.trim() !== '' 
            ? worker_img.value 
            : "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";
        
        
    
    if(f_name.value != '' && worker_email.value != '' && worker_phone.value !='' && worker_local !=''){
        let staff = {
            nom : f_name.value,
            img : staffImage,  // Use the determined image
            role : role.value,
            email : worker_email.value,
            phone : worker_phone.value,
            experience : tableaux_experiences,
            location : worker_local.value,
        }
    
    tab_users.push(staff);
    tableaux_staff_unassigned.push(staff);
    localStorage.setItem('staff' , JSON.stringify(tab_users));
    
    suucces_btn.style.display = 'block';
    
// Store the current staff index for correct details display
    const staffIndex = tab_users.length - 1;
    
    const staffHTML = `<div class="part_users_added">
                <div class="user_photo">
                    <img src="${staff.img || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}" alt="">
                </div>
                <h3>${staff.nom}</h3>
                <p>${staff.role}</p>
                <button class="details_user" data-index="${staffIndex}">Details</button>
                <button class="modifier_user" data-index="${staffIndex}">1</button>
            </div>`;
    part_right.insertAdjacentHTML('beforeend', staffHTML);
    
            
    let details_user = document.querySelectorAll('.details_user');
    
    /* Traitement d'affichage des infos de chaque staff :*/
    details_user.forEach(details_btn => {
        details_btn.addEventListener('click', function(){
            // Get the correct staff index from data attribute
            const index = this.getAttribute('data-index');
            const currentStaff = tab_users[index];
            
            modale_infos_user.classList.add('open');
            modale_infos_user.innerHTML = `<button class="hide_modale_user" id="hide_modale_user">x</button>
            <div class="head_cv">
                <div class="left_side_cv">
                <img src="${currentStaff.img}" alt="">
                </div>
            <div class="right_side_cv">
                <div class="first_side">
                <div><span>Nom : </span>${currentStaff.nom}</div>
                <div><span>Role : </span>${currentStaff.role}</div>
                <div><span>Email : </span>${currentStaff.email}</div>
                </div>
                <div class="second_side">
                    <div><span>Phone : </span>${currentStaff.phone}</div>
                    <div><span>Location : </span>${currentStaff.location}</div>
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
                    ${currentStaff.experience.map(exp => `
                        <tr>
                            <td>${exp.experience}</td>
                            <td>${exp.start_date}</td>
                            <td>${exp.end_date}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>`;
 
            
            // Add event listener for the newly created hide button
            document.getElementById('hide_modale_user').addEventListener('click', ()=>{
                modale_infos_user.classList.remove('open');
            });
        });
    });
    

    
    
      
    }
    else{
        if(f_name.value === ''){
            f_name.style.border = '1px solid red';
            alert('all field are required');
            return;
        }
        if(role.value === ''){
            role.style.border = '1px solid red';
            f_name.style.border = '1px solid green';
            alert('all field are required');
            return;

        }
        
        if(worker_email.value === ''){
            worker_email.style.border = '1px solid red';
            f_name.style.border = '1px solid green';
            role.style.border = '1px solid green';

            alert('all field are required');
            return;

        }
        if(worker_phone.value === ''){
            worker_email.style.border = '1px solid green';
            f_name.style.border = '1px solid green';
            worker_phone.style.border = '1px solid red';
            alert('all field are required');
            return;

        }
        if(worker_local.value === ''){
            worker_email.style.border = '1px solid green';
            f_name.style.border = '1px solid green';
            worker_phone.style.border = '1px solid green';
            worker_local.style.border = '1px solid red';
            alert('all field are required');
            

        }
        
    }
        // réinisialisation des données :
    f_name.value ='';
    worker_img.value = '';
    role.value= '';
    worker_email.value= '';
    worker_phone.value= '';
    experi.value= '';
    s_date.value= '';
    end_date.value= '';
    worker_local.value = ''; 
    
    // Réinisialiser le tableaux d'expériences :
    tableaux_experiences = [];
setTimeout(() => {
        modale.classList.remove("open");
        suucces_btn.style.display = 'none'; // Also hide the success message
    }, 100);
    if(!img_is_added){
        worker_img.src = 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'
    }
    
});

/* Affichage et désaffichage de menu :*/
show_menu.addEventListener('click', ()=>{
    left_side.classList.add('afficher');
});
hide_menu.addEventListener('click' , ()=>{
    left_side.classList.remove('afficher');
});

member_to_room.forEach(button =>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        const usersContainer = show_members.querySelector('.users_container');
        usersContainer.innerHTML = '';
        show_members.classList.add('affiche');
        const j = parseInt(button.getAttribute('data-numero'));
        
        // Store current room number for later use
        usersContainer.setAttribute('data-current-room', j);
        
        // Get staff already assigned to this room
        const roomAssignedStaff = assignedStaff[j] || [];
        
        if(j === 1){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                // Check if staff is NOT already assigned to this room
                const isAssigned = roomAssignedStaff.some(assigned => 
                    assigned.nom === tableaux_staff_unassigned[k].nom && 
                    assigned.role === tableaux_staff_unassigned[k].role
                );
                
                if (!isAssigned) {
                    const users_acc = `<div class="staff_infos">
                                    <div class="staff_infos1">
                                    <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                    </div>
                                    <div class="staff_infos2">
                                    <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                    <p>${tableaux_staff_unassigned[k].role}</p>
                                    <button class="delete_user">x</button>
                                    <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                    </div>
                                </div>`;
                    usersContainer.insertAdjacentHTML('beforeend', users_acc);
                }
            }
        }
        if(j === 2){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                if(tableaux_staff_unassigned[k].role === 'Réceptionnist(e)'){
                    const isAssigned = roomAssignedStaff.some(assigned => 
                        assigned.nom === tableaux_staff_unassigned[k].nom && 
                        assigned.role === tableaux_staff_unassigned[k].role
                    );
                    
                    if (!isAssigned) {
                        const users_acc = `<div class="staff_infos">
                                        <div class="staff_infos1">
                                        <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                        </div>
                                        <div class="staff_infos2">
                                        <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                        <p>${tableaux_staff_unassigned[k].role}</p>
                                        <button class="delete_user">x</button>
                                        <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                        </div>
                                    </div>`;
                        usersContainer.insertAdjacentHTML('beforeend', users_acc);
                    }
                }
            }
        }  
        // Repeat the same pattern for rooms 3, 4, 5, 6...
        if(j === 3){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                if(tableaux_staff_unassigned[k].role === 'Technicien IT'){
                    const isAssigned = roomAssignedStaff.some(assigned => 
                        assigned.nom === tableaux_staff_unassigned[k].nom && 
                        assigned.role === tableaux_staff_unassigned[k].role
                    );
                    
                    if (!isAssigned) {
                        const users_acc = `<div class="staff_infos">
                                        <div class="staff_infos1">
                                        <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                        </div>
                                        <div class="staff_infos2">
                                        <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                        <p>${tableaux_staff_unassigned[k].role}</p>
                                        <button class="delete_user">x</button>
                                        <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                        </div>
                                    </div>`;
                        usersContainer.insertAdjacentHTML('beforeend', users_acc);
                    }
                }
            }
        }    
        if(j === 4){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                if(tableaux_staff_unassigned[k].role === 'Agent de sécurité'){
                    const isAssigned = roomAssignedStaff.some(assigned => 
                        assigned.nom === tableaux_staff_unassigned[k].nom && 
                        assigned.role === tableaux_staff_unassigned[k].role
                    );
                    
                    if (!isAssigned) {
                        const users_acc = `<div class="staff_infos">
                                        <div class="staff_infos1">
                                        <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                        </div>
                                        <div class="staff_infos2">
                                        <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                        <p>${tableaux_staff_unassigned[k].role}</p>
                                        <button class="delete_user">x</button>
                                        <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                        </div>
                                    </div>`;
                        usersContainer.insertAdjacentHTML('beforeend', users_acc);
                    }
                }
            }
        }    
        if(j === 5){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                if(tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Réceptionnist(e)' || tableaux_staff_unassigned[k].role === 'Technicien IT' || tableaux_staff_unassigned[k].role === 'Agent de sécurité' || tableaux_staff_unassigned[k].role === 'Développeur Back-end' || tableaux_staff_unassigned[k].role === 'Développeur Front-end' || tableaux_staff_unassigned[k].role === 'Nettoyage'){
                    const isAssigned = roomAssignedStaff.some(assigned => 
                        assigned.nom === tableaux_staff_unassigned[k].nom && 
                        assigned.role === tableaux_staff_unassigned[k].role
                    );
                    
                    if (!isAssigned) {
                        const users_acc = `<div class="staff_infos">
                                        <div class="staff_infos1">
                                        <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                        </div>
                                        <div class="staff_infos2">
                                        <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                        <p>${tableaux_staff_unassigned[k].role}</p>
                                        <button class="delete_user">x</button>
                                        <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                        </div>
                                    </div>`;
                        usersContainer.insertAdjacentHTML('beforeend', users_acc);
                    }
                }
            }
        }    
        if(j === 6){
            for(let k = 0 ; k<tableaux_staff_unassigned.length; k++){
                if(tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Réceptionnist(e)' || tableaux_staff_unassigned[k].role === 'Technicien IT' || tableaux_staff_unassigned[k].role === 'Agent de sécurité' || tableaux_staff_unassigned[k].role === 'Développeur Back-end' || tableaux_staff_unassigned[k].role === 'Développeur Front-end'){
                    const isAssigned = roomAssignedStaff.some(assigned => 
                        assigned.nom === tableaux_staff_unassigned[k].nom && 
                        assigned.role === tableaux_staff_unassigned[k].role
                    );
                    
                    if (!isAssigned) {
                        const users_acc = `<div class="staff_infos">
                                        <div class="staff_infos1">
                                        <img src="${tableaux_staff_unassigned[k].img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                                        </div>
                                        <div class="staff_infos2">
                                        <h3>${tableaux_staff_unassigned[k].nom}</h3>
                                        <p>${tableaux_staff_unassigned[k].role}</p>
                                        <button class="delete_user">x</button>
                                        <button class="assign_user" data_numb = "${k}" data-room="${j}">+</button>
                                        </div>
                                    </div>`;
                        usersContainer.insertAdjacentHTML('beforeend', users_acc);
                    }
                }
            }
        }
    });
});
close_users_room.addEventListener('click', ()=>{
    show_members.classList.remove('affiche');
});

function resetForm() {
    f_name.value = '';
    worker_img.value = '';
    role.value = '';
    worker_email.value = '';
    worker_phone.value = '';
    experi.value = '';
    s_date.value = '';
    end_date.value = '';
    worker_local.value = ''; 
    tableaux_experiences = [];
    
    // Show add button and hide update button
    add_btn.style.display = 'block';
    const update_user = document.getElementById('update_user');
    if (update_user) {
        update_user.remove();
    }
}

function updateStaffInUI(index, staff) {
    const staffElements = document.querySelectorAll('.part_users_added');
    if (staffElements[index]) {
        const nameElement = staffElements[index].querySelector('h3');
        const roleElement = staffElements[index].querySelector('p');
        const imgElement = staffElements[index].querySelector('img');
        
        if (nameElement) nameElement.textContent = staff.nom;
        if (roleElement) roleElement.textContent = staff.role;
        if (imgElement) imgElement.src = staff.img;
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modifier_user')) {
        const index = e.target.getAttribute('data-index');
        const staff = tab_users[index];
        modale.classList.add('open');
        // Fill the form with existing data
        f_name.value = staff.nom;
        worker_img.value = staff.img;
        role.value = staff.role;
        worker_email.value = staff.email;
        worker_phone.value = staff.phone;
        worker_local.value = staff.location;
        
        // Load experiences
        tableaux_experiences = staff.experience || [];

        add_btn.style.display = 'none';

        

      // Create update button if it doesn't exist
            const temp = `<button id="update_user">Update</button>`;
            modal_btns.insertAdjacentHTML('beforeend', temp);

        
        // Add event listener to update button
        const update_user = document.getElementById('update_user');
        update_user.addEventListener('click', function() {
            // Create updated staff object
            let updatedStaff = {
                nom: f_name.value,
                img: worker_img.value,
                role: role.value,
                email: worker_email.value,
                phone: worker_phone.value,
                experience: tableaux_experiences,
                location: worker_local.value,
            };
            
            // Update the staff in the array
            tab_users[index] = updatedStaff;
            localStorage.setItem('staff', JSON.stringify(tab_users));
            
            // Update the UI
            updateStaffInUI(index, updatedStaff);
            
            // Show success message
            suucces_btn.style.display = 'block';
            suucces_btn.textContent = "Staff updated successfully!";
            
            // Reset form and close modal
            resetForm();
            setTimeout(() => {
                modale.classList.remove("open");
                suucces_btn.style.display = 'none';
            }, 500);
        });
        add_btn.setAttribute('data-updating-index', index);
    }
});

// Event delegation for assign_user buttons - ADD THIS AT THE END
document.addEventListener('click', function(e) {
    // Handle assign_user buttons
    if (e.target.classList.contains('assign_user')) {
        e.preventDefault();
        const temp = parseInt(e.target.getAttribute('data_numb'));
        const roomNumber = parseInt(e.target.getAttribute('data-room'));
        
        if (temp >= 0 && temp < tableaux_staff_unassigned.length) {
            const staffToAssign = tableaux_staff_unassigned[temp];
            
            // Add to assigned staff for this room
            if (!assignedStaff[roomNumber]) {
                assignedStaff[roomNumber] = [];
            }
            assignedStaff[roomNumber].push(staffToAssign);
            
            // Create and add the member to the room
            const div_member = `<div class="member">
                <div class="member_img"><img src="${staffToAssign.img}" alt=""></div>
                <p class="p1">${staffToAssign.nom}</p>
                <p class="p2">${staffToAssign.role}</p>
                <button class="remove_member" data-room="${roomNumber}">x</button>
            </div>`;
            add_member_to_room.insertAdjacentHTML('beforeend', div_member);
            
            // Remove from current view
            const staffElement = e.target.closest('.staff_infos');
            if (staffElement) {
                staffElement.remove();
            }
        }
    }
    
    // Handle remove_member buttons
    if (e.target.classList.contains('remove_member')) {
        e.preventDefault();
        const roomNumber = parseInt(e.target.getAttribute('data-room'));
        const memberElement = e.target.closest('.member');
        if (memberElement) {
            const staffName = memberElement.querySelector('.p1').textContent;
            const staffRole = memberElement.querySelector('.p2').textContent;
            
            // Remove from assigned staff for this room
            if (assignedStaff[roomNumber]) {
                assignedStaff[roomNumber] = assignedStaff[roomNumber].filter(staff => 
                    !(staff.nom === staffName && staff.role === staffRole)
                );
            }
            
            memberElement.remove();
        }
    }
    
    // Handle delete_user buttons (keep your existing code)
    if (e.target.classList.contains('delete_user')) {
        e.preventDefault();
        
        // Find the parent staff_infos element
        const staffElement = e.target.closest('.staff_infos');
        if (staffElement) {
            // Get the staff name to find in the array
            const staffName = staffElement.querySelector('h3').textContent;
            const staffRole = staffElement.querySelector('p').textContent;
            
            // Remove from tableaux_staff_unassigned array
            tableaux_staff_unassigned = tableaux_staff_unassigned.filter(staff => 
                !(staff.nom === staffName && staff.role === staffRole)
            );
            
            // Also remove from main tab_users array
            tab_users = tab_users.filter(staff => 
                !(staff.nom === staffName && staff.role === staffRole)
            );
            
            // Remove from all assigned rooms
            for (let room in assignedStaff) {
                assignedStaff[room] = assignedStaff[room].filter(staff => 
                    !(staff.nom === staffName && staff.role === staffRole)
                );
            }
            
            // Update localStorage
            localStorage.setItem('staff', JSON.stringify(tab_users));
            
            // Remove the element from DOM
            staffElement.remove();
        }
    }
});