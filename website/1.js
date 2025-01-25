
let cancel3 = document.getElementById('cancel3')
let last_delete = document.getElementById('last_delete')
let deleting_container = document.getElementById('deleting_container')
let delete_btn = document.getElementById('delete_btn');

function fgf() {
  let post_id_input = JSON.parse(localStorage.getItem('post_id_input'));
  console.log(post_id_input);
  deleting_container.style.display= "flex"
}
cancel3.onclick=function () {
  deleting_container.style.display= "none"
}






rejisting.onclick = function () {
  window.location.href = "singing_window.html";
}


let comments =document.getElementById('comments')
let comments_btn =document.getElementById('comments_btn')






let adding_container =document.getElementById('adding_container')
let add_btn =document.getElementById('add_btn')
let cancel =document.getElementById('cancel')
add_btn.onclick = function () {
  document.body.style.overflow = "hidden";
    adding_container.style.display = 'block';
    adding_container.style.display= 'flex';
    
};

cancel.onclick = function () {
  adding_container.style.display = 'none';
  document.body.style.overflow = "auto";
};



const imageUploadContainer = document.getElementById('imageUploadContainer');
const imageInput = document.getElementById('imageInput');


imageUploadContainer.addEventListener('click', () => {
    imageInput.click();
});


imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (!file) {
        alert('لم يتم اختيار صورة!');
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('يرجى اختيار ملف صورة.');
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {

        imageUploadContainer.style.backgroundImage = `url(${e.target.result})`;
        imageUploadContainer.innerHTML = ''; 
    };

    reader.readAsDataURL(file);
});





let cancel2 =document.getElementById('cancel2')
let editing_container =document.getElementById('editing_container')

function back() {
  window.location.href = "1.html";
};



