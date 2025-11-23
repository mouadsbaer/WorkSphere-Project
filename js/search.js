search_input.addEventListener('keyup', () => {
    const searchValue = search_input.value.trim().toLowerCase();
    
    // Vider la zone de recherche
    search_zone.innerHTML = '';
    
    // cacher la zone de recherche s'elle est vide
    if (searchValue === '') {
        search_zone.style.display = "none";
        return;
    }
    
    let trouve = false;
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
            trouve = true;
        }
    }
    
    search_zone.style.display = trouve ? "block" : "none";
    
    // si l'utilisateur n'a pas été trouvé
    if (!trouve) {
        search_zone.innerHTML = '<p class="no-results">No users found</p>';
        search_zone.style.display = "block";
    }
});