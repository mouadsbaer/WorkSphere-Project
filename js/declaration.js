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