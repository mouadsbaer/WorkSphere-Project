let search_input = document.getElementById('search_input');
let search_zone = document.getElementById('search_zone');
/*============================================================================ Ajouter un staff depuis le formulaire :================================================================== */
add_btn.addEventListener('click', () => {
    const staffImage = worker_img.value && worker_img.value.trim() !== ''
        ? worker_img.value
        : "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80";

    if (f_name.value != '' && worker_email.value != '' && worker_phone.value != '' && worker_local != '') {
        let staff = {
            nom: f_name.value,
            img: staffImage,
            role: role.value,
            email: worker_email.value,
            phone: worker_phone.value,
            experience: tableaux_experiences,
            location: worker_local.value,
        }

        tab_users.push(staff);
        tableaux_staff_unassigned.push(staff);
        localStorage.setItem('staff', JSON.stringify(tab_users));

        suucces_btn.style.display = 'block';

        const staffIndex = tab_users.length - 1;

        const staffHTML = `<div class="part_users_added" data-index="${staffIndex}">
                <div class="user_photo">
                    <img src="${staff.img || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}" alt="">
                </div>
                <h3>${staff.nom}</h3>
                <p>${staff.role}</p>
                <button class="details_user" data-index="${staffIndex}">Details</button>
                <button class="modifier_user" data-index="${staffIndex}"><i class='bxr  bx-pencil'  style='color:#000000'  ></i> </button>
            </div>`;
        part_right.insertAdjacentHTML('beforeend', staffHTML);

        let details_user = document.querySelectorAll('.details_user');

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
    else {
        if (f_name.value === '') {
            f_name.style.border = '1px solid red';
            alert('all field are required');
            return;
        }
        if (role.value === '') {
            role.style.border = '1px solid red';
            f_name.style.border = '1px solid green';
            alert('all field are required');
            return;
        }

        if (worker_email.value === '') {
            worker_email.style.border = '1px solid red';
            f_name.style.border = '1px solid green';
            role.style.border = '1px solid green';
            alert('all field are required');
            return;

        }
        if (worker_phone.value === '') {
            worker_email.style.border = '1px solid green';
            f_name.style.border = '1px solid green';
            worker_phone.style.border = '1px solid red';
            alert('all field are required');
            return;
        }
        if (worker_local.value === '') {
            worker_email.style.border = '1px solid green';
            f_name.style.border = '1px solid green';
            worker_phone.style.border = '1px solid green';
            worker_local.style.border = '1px solid red';
            alert('all field are required');
        }
    }
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
    setTimeout(() => {
        modale.classList.remove("open");
        suucces_btn.style.display = 'none';
    }, 100);
    if (!img_is_added) {
        worker_img.src = 'https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg?semt=ais_hybrid&w=740&q=80'
    }
});


document.addEventListener('click', function(e) {
    // cacher la zone de recherche si l'utilisateur a cliqué
    if (!search_zone.contains(e.target) && e.target !== search_input) {
        search_zone.style.display = 'none';
    }
});

search_input.addEventListener('keyup', () => {
    const searchValue = search_input.value.trim().toLowerCase();
    
    // Vider la zone de recherche
    search_zone.innerHTML = '';
    
    // cacher la zone de recherche s'elle est vide
    if (searchValue === '') {
        search_zone.style.display = "none";
        return;
    }
    
    let foundAny = false;
    for(let i = 0; i < tab_users.length; i++) {
        const userName = tab_users[i].nom.toLowerCase();
        const role_staff = tab_users[i].role.toLowerCase(); 
        
        if(userName.includes(searchValue) || role_staff.includes(searchValue)) {
            const founded = `<div class="results">
                    <div class="img_founded"><img src="${tab_users[i].img}" alt=""></div>
                    <p class="n">${tab_users[i].nom}</p>
                    <p class="r">${tab_users[i].role}</p>
                </div>`;
            search_zone.insertAdjacentHTML('beforeend', founded);
            foundAny = true;
        }
    }
    
    search_zone.style.display = foundAny ? "block" : "none";
    
    // si l'utilisateur n'a pas été trouvé
    if (!foundAny) {
        search_zone.innerHTML = '<p class="no-results">No users found</p>';
        search_zone.style.display = "block";
    }
});
localStorage.clear()