let span_switcher  =document.getElementById('span_switcher')
let span_new_switcher  =document.getElementById('span_new_switcher')
let signing_container_new =document.getElementById('signing_container_new')
let signing_container =document.getElementById('signing_container')


window.onload =function () {
      signing_container.style.display='none'
}
span_new_switcher.onclick =function () {
  signing_container_new.style.display ='none'
  signing_container.style.display='block'
} 

span_switcher.onclick =function () {
  signing_container_new.style.display ='block'
    signing_container_new.style.display ='flex'
    signing_container.style.display='none'
  } 

console.log(span_switcher)
let submit = document.getElementById('submit');
let knower = document.getElementById('knower');

submit.onclick = function () {
  let email_input = document.getElementById('email_input').value;
  let password_input = document.getElementById('password_input').value;

  const loginData = {
    username: email_input,
    password: password_input
  };

  axios.post('https://tarmeezacademy.com/api/v1/login', loginData)
    .then(function (response) {
      let user =response.data.user
      let token = response.data.token;
      window.location = '1.html';
      localStorage.setItem('authToken', token);
       localStorage.setItem('userdata', JSON.stringify(user));
    })
    .catch(function (error) {
      knower.innerHTML = '<h3 style="color: rgb(255, 43, 43);">Wrong username or password</h3>';
    });
};







let submit_new = document.getElementById('submit_new');
submit_new.onclick = function () {
    let email_input = document.getElementById('name_input').value;
    let passworrd_input = document.getElementById('passworrd_input').value;
    let youser_name_input =document.getElementById('username_input').value;
    let imageInput_new =document.getElementById('imageInput_new').files[0];
        console.log(passworrd_input)
    let new_user_data = new FormData();
    new_user_data.append('username', email_input);
    new_user_data.append('password', passworrd_input);
    new_user_data.append('name', youser_name_input);
    new_user_data.append('image', imageInput_new);





    axios.post('https://tarmeezacademy.com/api/v1/register',  new_user_data )
        .then(function (response) {
            window.location = '1.html';
            let user =response.data.user
      let token = response.data.token;
      window.location = '1.html';
      localStorage.setItem('authToken', token);
       localStorage.setItem('userdata', JSON.stringify(user));
        })
        .catch(function (error) {
            console.error("حدث خطأ في الإرسال:", error);
            document.getElementById('knower_new').innerHTML ='<h3 style="color: rgb(255, 43, 43);">this youser name is already taken</h3>'
        });
};   



document.getElementById('back').onclick = function() {
  window.location.href = "1.html";
};


const imageInputNew = document.getElementById('imageInput_new');
const previewImageNew = document.getElementById('previewImage_new');

imageInputNew.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    // التحقق من أن الملف صورة
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      // تحديث الصورة بعد تحميل الملف
      reader.onload = (e) => {
        previewImageNew.src = e.target.result; // تعيين الصورة المختارة
      };

      reader.readAsDataURL(file);
    } else {
      alert('الرجاء اختيار ملف صورة فقط!');
      imageInputNew.value = ''; // إعادة تعيين الإدخال
    }
  }
});