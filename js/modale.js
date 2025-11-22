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
let tableaux_exp = document.getElementById('tableaux_exp');
let member_to_room = document.querySelectorAll('.add_member');
let show_members = document.getElementById('show_members');
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
let add_member_to_room = document.querySelectorAll('.add_member_to_room');
let container_cercle = document.getElementById('container_cercle');
let cercle = document.getElementById('cercle');
let global_container = document.getElementById('global_container');
let assignedStaff = {
    1: [],
    2: [],
    3: [],
    4: [], 
    5: [],
    6: []  
};
let currentRoomNumber = null;
let assignedStaffToRooms = [];
let staff_nbr = document.querySelectorAll('.staff_nbr');
let staff_max = document.querySelectorAll('.staff_max');


const roomMaxStaff = {
    1: 4,
    2: 3,
    3: 3,
    4: 2,
    5: 6,
    6: 5
};

cercle.style.left = '1px';

container_cercle.addEventListener('click', () => {
    console.log(cercle.style.left);
    if (cercle.style.left === '1px') {
        cercle.style.left = '20px';
        cercle.style.background = '#179bff';
        document.body.classList.add('dark');
        global_container.classList.add('dark');
    }
    else {
        cercle.style.left = '1px';
        cercle.style.background = '#042137';
        document.body.classList.remove('dark');
        global_container.classList.remove('dark');
        search_zone.classList.add('dark');
    }
});

/* Affichage et désaffichage du formulaire de staff :*/
add_worker_btn.addEventListener('click', () => {
    modale.classList.add("open");
    previsualisation.src = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";
    worker_img.value = '';
});

worker_img.addEventListener('keyup', function () {
    if (this.value && this.value.trim() !== '') {
        previsualisation.src = this.value;
    } else {
        previsualisation.src = "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";
    }
});

/* Désaffichage de modale d'ajouter un staff  */
remove_btn.addEventListener('click', () => {
    modale.classList.remove("open");
    suucces_btn.style.display = 'none';
    resetForm();
});

/*============================================= Traitement des expériences :===========================================*/
let tableaux_experiences = [];

add_experience.addEventListener('click', (event) => {
    event.preventDefault();
    if (experi.value === '' || s_date.value === '' || end_date.value === '' || s_date.value > end_date.value) {
        if (experi.value === '' || s_date.value === '' || end_date.value === '') {
            alert('all fields are required');
        }
        else if (s_date.value > end_date.value) {
            alert('verify the start date and the end date !');
        }
    }
    else {
        let experiences_user = {
            experience: experi.value,
            start_date: s_date.value,
            end_date: end_date.value,
        }
        tableaux_experiences.push(experiences_user);
        alert('experience added !');
        experi.value = '';
        s_date.value = '';
        end_date.value = '';
    }
});

rmv_experience.addEventListener('click', (e) => {
    e.preventDefault();
    experi.value = '';
    s_date.value = '';
    end_date.value = '';
});



/* ===================================================== Affichage et désaffichage de menu : ========================================================*/
show_menu.addEventListener('click', () => {
    left_side.classList.add('afficher');
});
hide_menu.addEventListener('click', () => {
    left_side.classList.remove('afficher');
});

member_to_room.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const usersContainer = show_members.querySelector('.users_container');
        usersContainer.innerHTML = '';
        show_members.classList.add('affiche');
        const j = parseInt(button.getAttribute('data-numero'));

        usersContainer.setAttribute('data-current-room', j);

        const roomAssignedStaff = assignedStaff[j] || [];

        if (j === 1) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) {
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
        if (j === 2) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) { 
                if (tableaux_staff_unassigned[k].role === 'Réceptionnist(e)' || tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Nettoyage' ) {
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
        if (j === 3) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) {
                if (tableaux_staff_unassigned[k].role === 'Technicien IT'|| tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Nettoyage' ) {
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
        if (j === 4) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) {
                if (tableaux_staff_unassigned[k].role === 'Agent de sécurité' || tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Nettoyage' ) {
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
        if (j === 5) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) {
                if (tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Réceptionnist(e)' || tableaux_staff_unassigned[k].role === 'Technicien IT' || tableaux_staff_unassigned[k].role === 'Agent de sécurité' || tableaux_staff_unassigned[k].role === 'Développeur Back-end' || tableaux_staff_unassigned[k].role === 'Développeur Front-end' || tableaux_staff_unassigned[k].role === 'Nettoyage') {
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
        if (j === 6) {
            for (let k = 0; k < tableaux_staff_unassigned.length; k++) {
                if (tableaux_staff_unassigned[k].role === 'Manager' || tableaux_staff_unassigned[k].role === 'Réceptionnist(e)' || tableaux_staff_unassigned[k].role === 'Technicien IT' || tableaux_staff_unassigned[k].role === 'Agent de sécurité' || tableaux_staff_unassigned[k].role === 'Développeur Back-end' || tableaux_staff_unassigned[k].role === 'Développeur Front-end' || tableaux_staff_unassigned[k].role === 'Nettoyage' ) {
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

close_users_room.addEventListener('click', () => {
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

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modifier_user')) {
        const index = e.target.getAttribute('data-index');
        const staff = tab_users[index];
        modale.classList.add('open');
        f_name.value = staff.nom;

        worker_img.value = staff.img;
        role.value = staff.role;
        worker_email.value = staff.email;
        worker_phone.value = staff.phone;
        worker_local.value = staff.location;
        tableaux_experiences = staff.experience || [];
        add_btn.style.display = 'none';

        
        const existingUpdateBtn = document.getElementById('update_user');
        if (existingUpdateBtn) {
            existingUpdateBtn.remove();
        }

        // Ajouter update button
        const temp = `<button id="update_user">Update</button>`;
        modal_btns.insertAdjacentHTML('beforeend', temp);

        // ajouter événement à update button
        const update_user = document.getElementById('update_user');
        update_user.addEventListener('click', function () {
            
            const oldStaff = tab_users[index];
            
            
            let updatedStaff = {
                nom: f_name.value,
                img: worker_img.value && worker_img.value.trim() !== '' ? worker_img.value : "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
                role: role.value,
                email: worker_email.value,
                phone: worker_phone.value,
                experience: tableaux_experiences,
                location: worker_local.value,
            };

            // mise à jour les informations de staff dans le tableaux
            tab_users[index] = updatedStaff;
            localStorage.setItem('staff', JSON.stringify(tab_users));

            
            updateStaffInPartRight(index, updatedStaff);
            const unassignedIndex = tableaux_staff_unassigned.findIndex(staff => 
                staff.nom === oldStaff.nom && staff.role === oldStaff.role
            );
            if (unassignedIndex !== -1) {
                tableaux_staff_unassigned[unassignedIndex] = updatedStaff;
            }

            // mise à jour dans le tableaux assignedStaff
            for (let roomNumber = 1; roomNumber <= 6; roomNumber++) {
                if (assignedStaff[roomNumber]) {
                    const assignedIndex = assignedStaff[roomNumber].findIndex(staff => 
                        staff.nom === oldStaff.nom && staff.role === oldStaff.role
                    );
                    if (assignedIndex !== -1) {
                        assignedStaff[roomNumber][assignedIndex] = updatedStaff;
                        
                        // mettre à jour l'affichage de staffs dans la salle
                        updateRoomMemberDisplay(roomNumber, oldStaff, updatedStaff);
                    }
                }
            }

            
            suucces_btn.style.display = 'block';
            suucces_btn.textContent = "Staff updated successfully!";

            
            resetForm();
            setTimeout(() => {
                modale.classList.remove("open");
                suucces_btn.style.display = 'none';
            }, 500);
        });
    }
});

/* Fonction pour mettre à jour l'affichage des membres  */
function updateRoomMemberDisplay(roomNumber, oldStaff, updatedStaff) {
    const roomContainer = document.querySelector(`.room[data-room="${roomNumber}"] .add_member_to_room`);
    if (roomContainer) {
        const members = roomContainer.querySelectorAll('.member');
        members.forEach(member => {
            const nameElement = member.querySelector('.p1');
            const roleElement = member.querySelector('.p2');
            const imgElement = member.querySelector('.member_img img');
            
            if (nameElement && roleElement && 
                nameElement.textContent === oldStaff.nom && 
                roleElement.textContent === oldStaff.role) {
                
                // // mise à jour de l'affichage de staff
                nameElement.textContent = updatedStaff.nom;
                roleElement.textContent = updatedStaff.role;
                if (imgElement) {
                    imgElement.src = updatedStaff.img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80';
                }
            }
        });
    }
}

// fonction de mise à jour de staffs dans la partie unassigned
function updateStaffInPartRight(index, staff) {
    const staffElements = document.querySelectorAll('.part_users_added');
    if (staffElements[index]) {
        const staffElement = staffElements[index];
        
        // mettre à jour l'image
        const imgElement = staffElement.querySelector('.user_photo img');
        if (imgElement) {
            imgElement.src = staff.img || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
        }
        
        // mettre à jour le nom
        const nameElement = staffElement.querySelector('h3');
        if (nameElement) {
            nameElement.textContent = staff.nom;
        }
        
        // mettre à jour le role
        const roleElement = staffElement.querySelector('p');
        if (roleElement) {
            roleElement.textContent = staff.role;
        }
    } else {
        // Alternative method: Try to find by data-index attribute
        const staffByDataIndex = document.querySelector(`.part_users_added[data-index="${index}"]`);
        if (staffByDataIndex) {
            const imgElement = staffByDataIndex.querySelector('.user_photo img');
            const nameElement = staffByDataIndex.querySelector('h3');
            const roleElement = staffByDataIndex.querySelector('p');
            
            if (imgElement) imgElement.src = staff.img || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
            if (nameElement) nameElement.textContent = staff.nom;
            if (roleElement) roleElement.textContent = staff.role;
        }
    }
}



