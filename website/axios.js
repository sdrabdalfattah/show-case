function show_edit_post(post_obj) {
  let post = JSON.parse(decodeURIComponent(post_obj));
  let post_id_input = post.id;
  let post_author_id =post.author.id
  console.log(post_author_id)
  localStorage.setItem('post_author_id', JSON.stringify(post_author_id));
  localStorage.setItem('post_id_input', JSON.stringify(post_id_input));
  document.getElementById('text_eria_edit').value = post.body;

  editing_container.style.display = 'flex';
  editing_container.style.flexDirection = 'column';
  document.body.style.overflow = "hidden";
}


cancel2.onclick = function () {
  document.body.style.overflow = "auto";
  editing_container.style.display = 'none';
};




let authToken = localStorage.getItem('authToken');
let logged_in_youser = document.getElementById('logged_in_youser');
let userdata_obj = JSON.parse(localStorage.getItem('userdata'));

if (authToken == null) {
  logged_in_youser.style.display = 'none';
  rejisting.style.display = 'block';
} else {
  logged_in_youser.style.display = 'flex';
  rejisting.style.display = 'none';
}


let log_out_btn =document.getElementById('log_out_btn')
log_out_btn.onclick = function () {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userdata');
  window.location.reload()
}


axios.get('https://tarmeezacademy.com/api/v1/posts')
  .then(function (response) {
    let response_content = response.data.data;
    let posts_container = document.getElementById('posts_container');
    localStorage.setItem('postData', JSON.stringify(response_content)); // تخزين البيانات المهمة فقط
    posts_container.innerHTML = '';

    for (let post of response_content) {
      // تحديد ما إذا كان المنشور للمستخدم الحالي
      let is_my_post = userdata_obj && userdata_obj.id === post.author.id;

      let post_content = `
        <div class="post_container" id="post_container">
          <div class="post_header">
          <div style="display: flex;align-items: center;    justify-content: center;">
            <img src="${post.author.profile_image}" id="user_img" onclick="show_user_pf(${post.author.id})" alt="">

            <h1 id="text_name" onclick="show_user_pf(${post.author.id})">${post.author.name}</h1>

            </div>
            <div class="post_header_btns" style="display: ${is_my_post ? 'flex' : 'none'};">
              <h5 style="font-weight: 300; color: rgb(163, 163, 163);">(your post)</h5>
              <button onclick="show_edit_post('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
                     <button id="delete_btn" onclick="fgf()">delete</button>
            </div>
          </div>
          <div class="post_body" onclick="postshow(${post.id})">
            <h2>${post.body}</h2>
            <img class="post_img" src="${post.image}" alt="">
            <button id="comments_btn" class="comments_btn">comments <i class="fa-solid fa-comment"></i> (<span>${post.comments_count}</span>)</button>
          </div>
        </div>`;

      posts_container.innerHTML += post_content;
    }
  })
  .catch(function (error) {
    posts_container.innerHTML = '<h3 style="margin-top: 50px;">Something went wrong</h3>';
    console.log('Error:', error);
  });

function postshow(postId) {
  window.location = `post_rev.html?post=${postId}`;
}

// إضافة منشور جديد
let add = document.getElementById('add');
add.onclick = function () {
  let text_eria = document.getElementById('text_eria').value;
  let img = document.getElementById('imageInput').files[0];

  let formData = new FormData();
  formData.append('body', text_eria);

  if (img) {
    formData.append('image', img);
  }

  let headers = {
    "Authorization": `Bearer ${authToken}`
  };

  axios.post('https://tarmeezacademy.com/api/v1/posts', formData, { headers: headers })
    .then(function () {
      adding_container.style.display = 'none';
      document.body.style.overflow = 'auto';
      location.reload();
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
};

// تعديل منشور
let last_edit = document.getElementById('last_edit');
last_edit.onclick = function () {
  let post_id_input = JSON.parse(localStorage.getItem('post_id_input'));
  let text_eria_edit = document.getElementById('text_eria_edit').value;
  let formData = new FormData();
  formData.append('body', text_eria_edit);

  let headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${authToken}`,
  };

  axios.put(`https://tarmeezacademy.com/api/v1/posts/${post_id_input}`, formData, { headers: headers })
    .then(function (response) {
      console.log('Post updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(function (error) {
      console.error('Error updating post:', error);
    });
};






last_delete.onclick=function () {

  let post_id_input = JSON.parse(localStorage.getItem('post_id_input'));

  let headers = {
    "Authorization": `Bearer ${authToken}`
  };

  axios.delete(`https://tarmeezacademy.com/api/v1/posts/${post_id_input}`, { headers: headers })
  .then(function (response) {
    console.log(response);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  })
  .catch(function (error) {
    console.error('Error updating post:', error);
  });
}



function show_user_pf(user_id) {
window.location =`profile.html?userid=${user_id}`
}



function user_pf_img() {

  let userdata_obj = JSON.parse(localStorage.getItem('userdata'));
  let current_user_img =userdata_obj.profile_image
  document.getElementById('header_pfp_img').src =current_user_img
}user_pf_img()


function  go_user_pf() {
  let userdata_obj = JSON.parse(localStorage.getItem('userdata'));
  let current_user_id =userdata_obj.id
window.location =`profile.html?userid=${current_user_id}`
}