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