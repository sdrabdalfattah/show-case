let urlparams = new URLSearchParams(window.location.search);
let postID = urlparams.get("post");
localStorage.setItem('postID', JSON.stringify(postID));

function postshow(postID) {
  window.location = `post_rev.html?post=${postId}`;
}


function getPost() {
  if (!postID) {
    console.error("لم يتم العثور على postID في الرابط.");
    return;
  }

  axios.get(`https://tarmeezacademy.com/api/v1/posts/${postID}`)
    .then(function (response) {
      let post = response.data.data;

      let commentsContent = "";
      for (let comment of post.comments) {
        commentsContent += `
           <img src="${comment.author.profile_image}" alt="">
           <h3>${comment.author.username} <i style="color:green;" class="fa-solid fa-arrow-right"></i> ${comment.body}</h3>
              <hr style="margin-top: 10px; border:1px grey solid;">
        `;
      }

      if (post.comments.length === 0) {
        commentsContent = "<p>No comments yet.</p>";
      }

      let post_rev_content = `

         



        <img src="${post.image}" alt="" class="background_img">

        <div class="post_rev">
          <div class="post_rev_header">
            <img onclick="show_user_pf()" src="${post.author.profile_image}" alt="" class="post_rev_header_img">
            <h1 onclick="show_user_pf()">${post.author.name} <i style="color:green;" class="fa-solid fa-arrow-right"></i> ${post.body}</h1>
          </div>
          <div class="comment_section">
            <h1>Comments : ${post.comments_count}</h1>
            <div class="add_comment">
              <input id="comment_field" placeholder="Add comment here" type="text">
              <span onclick="add_comment()">Add</span>
            </div>
            ${commentsContent}
          </div>
        </div>
        <img src="${post.image}" class="post_rev_body_img" alt="">
</div>
</div>


      `;

      document.getElementById('post_rev_body').innerHTML = post_rev_content;
    })
    .catch(function (error) {
      console.error("حدث خطأ أثناء جلب بيانات المنشور:", error);
    });
}

getPost();

function add_comment() {
  let comment_field = document.getElementById('comment_field').value;
  let authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.error("لم يتم العثور على رمز المصادقة. تأكد من تسجيل الدخول.");
    return;
  }


  const loginData = {
    "body": comment_field,
  };


  axios.post(`https://tarmeezacademy.com/api/v1/posts/${postID}/comments`, loginData, {
    headers: {
      "Authorization": `Bearer ${authToken}`
    }
  })
  .then(function (response) {

    getPost();
  })
  .catch(function (error) {
    console.error(error);
  });
}

