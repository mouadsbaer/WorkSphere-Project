// Traitements pour les buttons assign_user
document.addEventListener('click', function (e) {
    
    if (e.target.classList.contains('assign_user')) {
        e.preventDefault();
        const temp = parseInt(e.target.getAttribute('data_numb'));
        const roomNumber = parseInt(e.target.getAttribute('data-room'));

        // vérifier si la salle est vide avant d'ajouter le staff
        if (isRoomFull(roomNumber)) {
            alert(`Room ${roomNumber} is full! Maximum ${roomMaxStaff[roomNumber]} staff allowed.`);
            return;
        }

        if (temp >= 0 && temp < tableaux_staff_unassigned.length) {
            const staffToAssign = tableaux_staff_unassigned[temp];
            
            
            const isAlreadyAssigned = Object.values(assignedStaff).some(roomStaff => 
                roomStaff.some(staff => 
                    staff.nom === staffToAssign.nom && staff.role === staffToAssign.role
                )
            );
            
            if (isAlreadyAssigned) {
                alert('This staff member is already assigned to a room!');
                return;
            }

            if (!assignedStaff[roomNumber]) {
                assignedStaff[roomNumber] = [];
            }
            assignedStaff[roomNumber].push(staffToAssign);

            assignedStaffToRooms.push(staffToAssign);

            // supprimer de tableaux unasssigned
            tableaux_staff_unassigned = tableaux_staff_unassigned.filter(staff =>
                !(staff.nom === staffToAssign.nom && staff.role === staffToAssign.role)
            );

            const div_member = `<div class="member">
                <div class="member_img"><img src="${staffToAssign.img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt=""></div>
                <p class="p1">${staffToAssign.nom}</p>
                <p class="p2">${staffToAssign.role}</p>
                <button class="remove_member" data-room="${roomNumber}">x</button>
            </div>`;
            add_member_to_room[roomNumber-1].insertAdjacentHTML('beforeend', div_member);

            // misa à jour le compteur de staffs
            if (staff_nbr[roomNumber-1]) {
                let currentCount = parseInt(staff_nbr[roomNumber-1].textContent) || 0;
                currentCount++;
                staff_nbr[roomNumber-1].textContent = currentCount.toString();
                // Vérification si la salle a ateint sa capacité maximale
                if (currentCount >= roomMaxStaff[roomNumber]) {
                    alert(`Room ${roomNumber} has reached maximum capacity (${roomMaxStaff[roomNumber]} staff)!`);
                }
            }

            // mise à jour le bordure de salle(pas vide)
            updateRoomBorder(roomNumber);

            // Supprimer du modal
            const staffElement = e.target.closest('.staff_infos');
            if (staffElement) {
                staffElement.remove();
            }

            // supprimer de unassigned
            removeStaffFromUnassignedDisplay(staffToAssign.nom, staffToAssign.role);
            
            console.log(`Staff ${staffToAssign.nom} assigned to room ${roomNumber}`);
            console.log('Remaining unassigned staff:', tableaux_staff_unassigned.length);
        }
    }

    // Traitement de buttons remove_member
    if (e.target.classList.contains('remove_member')) {
        e.preventDefault();
        const roomNumber = parseInt(e.target.getAttribute('data-room'));
        const memberElement = e.target.closest('.member');
        if (memberElement) {
            const staffName = memberElement.querySelector('.p1').textContent;
            const staffRole = memberElement.querySelector('.p2').textContent;

            // trouvé l'objet staff pour le rajouter encore à unassigned
            let staffToUnassign = null;
            for (let room in assignedStaff) {
                const foundStaff = assignedStaff[room].find(staff => 
                    staff.nom === staffName && staff.role === staffRole
                );
                if (foundStaff) {
                    staffToUnassign = foundStaff;
                    break;
                }
            }

            // mise à jour de compteur (compteur--)
            if (staff_nbr[roomNumber-1]) {
                let currentCount = parseInt(staff_nbr[roomNumber-1].textContent) || 0;
                currentCount = Math.max(0, currentCount - 1);
                staff_nbr[roomNumber-1].textContent = currentCount.toString();
            }

            if (assignedStaff[roomNumber]) {
                assignedStaff[roomNumber] = assignedStaff[roomNumber].filter(staff =>
                    !(staff.nom === staffName && staff.role === staffRole)
                );
            }
            assignedStaffToRooms = assignedStaffToRooms.filter(staff =>
                !(staff.nom === staffName && staff.role === staffRole)
            );
            
            updateRoomBorder(roomNumber);
            
            // Rajouter à la salle unassigned
            if (staffToUnassign) {
                tableaux_staff_unassigned.push(staffToUnassign);
                addStaffToUnassignedDisplay(staffName, staffRole);
            }
            
            memberElement.remove();
            
            console.log(`Staff ${staffName} removed from room ${roomNumber}`);
            console.log('Remaining unassigned staff:', tableaux_staff_unassigned.length);
        }
    }

    // Traitement des buttons delete_user
    if (e.target.classList.contains('delete_user')) {
        e.preventDefault();

        const staffElement = e.target.closest('.staff_infos');
        if (staffElement) {
            const staffName = staffElement.querySelector('h3').textContent;
            const staffRole = staffElement.querySelector('p').textContent;

            // mise à jour du compteur pour toutes les salles
            for (let roomNumber = 1; roomNumber <= 6; roomNumber++) {
                if (assignedStaff[roomNumber]) {
                    const wasInRoom = assignedStaff[roomNumber].some(staff =>
                        staff.nom === staffName && staff.role === staffRole
                    );
                    if (wasInRoom && staff_nbr[roomNumber-1]) {
                        let currentCount = parseInt(staff_nbr[roomNumber-1].textContent) || 0;
                        currentCount = Math.max(0, currentCount - 1);
                        staff_nbr[roomNumber-1].textContent = currentCount.toString();
                        
                        // mise à jour de bordure
                        updateRoomBorder(roomNumber);
                    }
                }
            }
            
            tableaux_staff_unassigned = tableaux_staff_unassigned.filter(staff =>
                !(staff.nom === staffName && staff.role === staffRole)
            );
            tab_users = tab_users.filter(staff =>
                !(staff.nom === staffName && staff.role === staffRole)
            );

            for (let room in assignedStaff) {
                assignedStaff[room] = assignedStaff[room].filter(staff =>
                    !(staff.nom === staffName && staff.role === staffRole)
                );
            }
            assignedStaffToRooms = assignedStaffToRooms.filter(staff =>
                !(staff.nom === staffName && staff.role === staffRole)
            );

            localStorage.setItem('staff', JSON.stringify(tab_users));

            staffElement.remove();
        }
    }
});

function attachEventListenersToNewStaff() {
    const details_user = document.querySelectorAll('.details_user');
    details_user.forEach(details_btn => {
        details_btn.addEventListener('click', function () {
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

            document.getElementById('hide_modale_user').addEventListener('click', () => {
                modale_infos_user.classList.remove('open');
            });
        });
    });
}

function removeStaffFromUnassignedDisplay(staffName, staffRole) {
    const staffElements = document.querySelectorAll('.part_users_added');

    staffElements.forEach(element => {
        const nameElement = element.querySelector('h3');
        const roleElement = element.querySelector('p');

        if (nameElement && roleElement &&
            nameElement.textContent === staffName &&
            roleElement.textContent === staffRole) {
            element.remove();
        }
    });
}

function addStaffToUnassignedDisplay(staffName, staffRole) {
    const staff = tableaux_staff_unassigned.find(staff =>
        staff.nom === staffName && staff.role === staffRole
    );
    if (staff) {
        const staffIndex = tab_users.findIndex(s =>
            s.nom === staffName && s.role === staffRole
        );
        if (staffIndex !== -1) {
            const staffHTML = `<div class="part_users_added" data-index="${staffIndex}">
                <div class="user_photo">
                    <img src="${staff.img || 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'}" alt="">
                </div>
                <h3>${staff.nom}</h3>
                <p>${staff.role}</p>
                <button class="details_user" data-index="${staffIndex}">Details</button>
                <button class="modifier_user" data-index="${staffIndex}"><i class='bxr  bx-pencil'  style='color:#000000'  ></i> </button>
            </div>`;

            part_right.insertAdjacentHTML('beforeend', staffHTML);
            attachEventListenersToNewStaff();
        }
    }
}

// Inisialiser le compteur de staffs et le bordure quand la page a actualisé
document.addEventListener('DOMContentLoaded', function() {
    for (let roomNumber = 1; roomNumber <= 6; roomNumber++) {
        const count = assignedStaff[roomNumber] ? assignedStaff[roomNumber].length : 0;
        if (staff_nbr[roomNumber-1]) {
            staff_nbr[roomNumber-1].textContent = count.toString();
        }
        if (staff_max[roomNumber-1]) {
            staff_max[roomNumber-1].textContent = roomMaxStaff[roomNumber].toString();
        }
    }
    // Inisialisation de bordure de salles
    updateAllRoomBorders();
});
// Vérification si la salle atteind sa capacité
function isRoomFull(roomNumber) {
    const currentCount = assignedStaff[roomNumber] ? assignedStaff[roomNumber].length : 0;
    const maxCapacity = roomMaxStaff[roomNumber];
    return currentCount >= maxCapacity;
}

//  Changer la bordure d'une salle 
function updateRoomBorder(roomNumber) {
    const roomElement = document.querySelector(`.room[data-room="${roomNumber}"]`);
    if (roomElement) {
        const staffCount = assignedStaff[roomNumber] ? assignedStaff[roomNumber].length : 0;
        
        if (staffCount === 0 && roomNumber != 1 && roomNumber != 6) {
            // si la salle est vide
            roomElement.classList.add('empty-room');
            roomElement.classList.remove('occupied-room');
        } else {
            // sinon
            roomElement.classList.remove('empty-room');
            roomElement.classList.add('occupied-room');
        }
    }
}

// initialiser la bordure de salles obligatoires
function updateAllRoomBorders() {
    for (let roomNumber = 1; roomNumber <= 6; roomNumber++) {
        updateRoomBorder(roomNumber);
    }
}