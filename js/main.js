cercle.style.left = '1px';

container_cercle.addEventListener('click', () => {
    if (cercle.style.left === '1px') {
        cercle.style.left = '20px';
        cercle.style.background = '#179bff';
        document.body.classList.add('dark');
        global_container.classList.add('dark');
        search_zone.classList.add('dark');
    }
    else {
        cercle.style.left = '1px';
        cercle.style.background = '#042137';
        document.body.classList.remove('dark');
        global_container.classList.remove('dark');
    }
});

/* °°°°°°°°°°°°°°°°°°°°°°°°°°°° Affichage du formulaire d'ajout de staffs : °°°°°°°°°°°°°°°°°°°°°°°°°°°° */
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

/* Désaffichage de modale d'ajout de staffs  */
remove_btn.addEventListener('click', () => {
    modale.classList.remove("open");
    suucces_btn.style.display = 'none';
    resetForm();
});

/*°°°°°°°°°°°°°°°°°°°°°°°°°°°° Traitement des expériences :°°°°°°°°°°°°°°°°°°°°°°°°°°°°*/
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



/* °°°°°°°°°°°°°°°°°°°°°°°°°°°°Affichage et désaffichage de menu : °°°°°°°°°°°°°°°°°°°°°°°°°°°°*/
show_menu.addEventListener('click', () => {
    left_side.classList.add('afficher');
});
hide_menu.addEventListener('click', () => {
    left_side.classList.remove('afficher');
});


/* °°°°°°°°°°°°°°°°°°°°°°°°°°°° Ajout d'un staff à une salle °°°°°°°°°°°°°°°°°°°°°°°°°°°° */
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

/* °°°°°°°°°°°°°°°°°°°°°°°° Mise à jour des informations de staffs : °°°°°°°°°°°°°°°°°°°°°°°°°°° */
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

