function user_pf() {
    document.getElementById('profile_cantainer').innerHTML =""

    let urlparams = new URLSearchParams(window.location.search);
    let user_ID = urlparams.get("userid");

    axios.get(`https://tarmeezacademy.com/api/v1/users/${user_ID}`)
    .then(function (response) {
        let response_content =response.data.data
      let pf_content =`
     <div class="profile_cantainer_header" id="profile_cantainer_header">
<img src="${response_content.profile_image}" alt="">
<h1>${response_content.name}<h4 style="color: grey;">(${response_content.username})</h4></h1>
</div>

<div class="comments_posts" id="comments_posts">
    <h3 onclick="get_pf_comments()">comments : ${response_content.comments_count}</h3>
    <h3 onclick="get_pf_posts()">posts : ${response_content.posts_count}</h3>
</div>
`
    document.getElementById('profile_cantainer').innerHTML =pf_content



    })
    .catch(function (error) {
        console.error('Error fetching user data:', error);
        document.getElementById('profile_body').innerHTML = '<p>حدث خطأ أثناء تحميل الملف الشخصي. حاول مرة أخرى لاحقًا.</p>';
    });





    document.getElementById('posts_container2').innerHTML =''
    axios.get(`https://tarmeezacademy.com/api/v1/users/${user_ID}/posts`)
    .then(function (response) {
        let response_content_pf = response.data.data; 
        console.log(response_content_pf);


        let posts_container = document.getElementById('posts_container2');
        if (!posts_container) {
            console.error('Element with ID "posts_container2" not found.');
            return;
        }


        let posts_content = '';
        for (let post of response_content_pf) {
            posts_content += `
                <div class="post_container2" id="post_container">
                    <div id="post_body" onclick="postshow(${post.id})">
                        <h2>${post.body}</h2>
                        <img class="post_img" src="${post.image}" onclick="show_user_pf(${post.author.id})">
                         <button id="comments_btn" class="comments_btn">comments <i class="fa-solid fa-comment"></i> (<span>${post.comments_count}</span>)</button>
                    </div>
                </div>
            `;
        }


        posts_container.innerHTML += posts_content;
    })
    .catch(function (error) {
        console.error('Error fetching data:', error);
    });

}


user_pf();





