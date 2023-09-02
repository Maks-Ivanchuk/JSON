document.addEventListener("DOMContentLoaded", () => {
   const tableWrapper = document.querySelector('#table-wrapper');
   
   tableWrapper.insertAdjacentHTML('afterbegin', `
      <table id="tableUsers" width = "100%">
         <tr>
            <th colspan = "9">Users</th>
         </tr>
         <tr>
            <th>Id</th>
            <th>Name</th>
            <th>User name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Action</th>
         </tr>
      </table>
   `);
   
   const tableUsers = document.querySelector('#tableUsers');
   
   fetch('https://jsonplaceholder.typicode.com/users')
   .then((response) => response.json())
   .then((users) => {
      users.forEach(user => {
         tableUsers.insertAdjacentHTML('beforeend', `
            <tr>
               <td>${user.id}</td>
               <td>${user.name}</td>
               <td>${user.username}</td>
               <td>${user.email}</td>
               <td>${user.address.city}</td>
               <td>${user.phone}</td>
               <td>${user.website}</td>
               <td>${user.company.name}</td>
               <td>
                  <button data-user-id="${user.id}" class = "btn-todos button button--danger" style="margin: 5px auto;">Todos</button>
                  <button data-user-id="${user.id}" class = "btn-posts button button--info" style="margin: 5px auto;">Posts</button>
                  <button data-user-id="${user.id}" class = "btn-albums button button--warning" style="margin: 5px auto;">Albums</button>
               </td>
            </tr>
         `);
      });
      const buttonsUsers = document.querySelectorAll('button[data-user-id]');
   
      buttonsUsers.forEach(buttonUser => {
         buttonUser.addEventListener('click', function (event) {
            let target = event.target;
            const userId = target.dataset.userId;

            if (document.querySelector('#result2')) {
               document.querySelector('#result2').remove();
            };

            if (target.classList.contains('btn-todos')) {
               if (!document.querySelector('#result1')) {
                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "4" style="color: red;">Todos user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Completed</th>
                        </tr>
                     </table>
                  `);
               } else { 
                  document.querySelector('#result1').remove();

                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "4" style="color: red;">Todos user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Completed</th>
                        </tr>
                     </table>
                  `);
               };

               let tableResult1 = document.querySelector('#result1');

               fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
               .then((response) => response.json())
               .then((todos) => {
                  todos.forEach(todo => {
                     tableResult1.insertAdjacentHTML('beforeend', `
                        <tr>
                           <td>${todo.userId}</td>
                           <td>${todo.id}</td>
                           <td>${todo.title}</td>
                           <td>${todo.completed}</td>
                        </tr>
                     `);
                  });
               });
            };

            if (target.classList.contains('btn-posts')) {
               if (!document.querySelector('#result1')) {
                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "5" style="color: red;">Posts user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Body</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  `);
               } else { 
                  document.querySelector('#result1').remove();

                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "5" style="color: red;">Posts user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Body</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  `);
               };

               let tableResult1 = document.querySelector('#result1');

               fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
               .then((response) => response.json())
               .then((posts) => {
                  posts.forEach(userPosts => {
                     tableResult1.insertAdjacentHTML('beforeend', `
                        <tr>
                           <td>${userPosts.userId}</td>
                           <td>${userPosts.id}</td>
                           <td>${userPosts.title}</td>
                           <td>${userPosts.body}</td>
                           <td>
                              <button data-posts-id="${userId}" class = "button button--info" style="margin: 5px auto;">Coments</button>
                           </td>
                        </tr>
                     `);
                  });
                  
                  const btnsComments = document.querySelectorAll('button[data-posts-id]');

                  btnsComments.forEach(btnComment => {
                     btnComment.addEventListener('click', function (event) {
                        if (!document.querySelector('#result2')) {
                           tableWrapper.insertAdjacentHTML('beforeend', `
                              <table id = "result2">
                                 <tr>
                                    <th colspan = "5" style="color: red;">Comments user: ${userId}</th>
                                 </tr>
                                 <tr>
                                    <th>Post id</th>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Body</th>
                                 </tr>
                              </table>
                           `);
                        } else { 
                           return;
                        };

                        let tableResult2 = document.querySelector('#result2');

                        fetch(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`)
                        .then((response) => response.json())
                        .then((comments) => {
                           comments.forEach(comment => {
                              tableResult2.insertAdjacentHTML('beforeend', `
                                 <tr>
                                    <td>${comment.postId}</td>
                                    <td>${comment.id}</td>
                                    <td>${comment.name}</td>
                                    <td>${comment.email}</td>
                                    <td>${comment.body}</td>
                                 </tr>
                              `);
                           });
                        });
                     });
                  });
               });
            };

            if (target.classList.contains('btn-albums')) {
               if (!document.querySelector('#result1')) {
                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "4" style="color: red;">Albums user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  `);
               } else { 
                  document.querySelector('#result1').remove();
                  
                  tableWrapper.insertAdjacentHTML('beforeend', `
                     <table id = "result1">
                        <tr>
                           <th colspan = "4" style="color: red;">Albums user: ${userId}</th>
                        </tr>
                        <tr>
                           <th>User id</th>
                           <th>Id</th>
                           <th>Title</th>
                           <th>Action</th>
                        </tr>
                     </table>
                  `);
               };

               let tableResult1 = document.querySelector('#result1');

               fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
               .then((response) => response.json())
               .then((albums) => {
                  albums.forEach(userAlbums => {
                     tableResult1.insertAdjacentHTML('beforeend', `
                        <tr>
                           <td>${userAlbums.userId}</td>
                           <td>${userAlbums.id}</td>
                           <td>${userAlbums.title}</td>
                           <td>
                              <button data-albums-id="${userId}" class = "button button--warning" style="margin: 5px auto;">Photo</button>
                           </td>
                        </tr>
                     `);
                  });

                  const btnsPhotos = document.querySelectorAll('button[data-albums-id]');

                  btnsPhotos.forEach(btnPhoto => {
                     btnPhoto.addEventListener('click', function (event) {
                        if (!document.querySelector('#result2')) {
                           tableWrapper.insertAdjacentHTML('beforeend', `
                              <table id = "result2">
                                 <tr>
                                    <th colspan = "5" style="color: red;">Photo user : ${userId}</th>
                                 </tr>
                                 <tr>
                                    <th>Album id</th>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>ThumbnailUrl</th>
                                 </tr>
                              </table>
                           `);
                        } else { 
                           return;
                        };

                        let tableResult2 = document.querySelector('#result2');

                        fetch(`https://jsonplaceholder.typicode.com/albums/${userId}/photos`)
                        .then((response) => response.json())
                        .then((photos) => {
                           photos.forEach(photo => {
                              tableResult2.insertAdjacentHTML('beforeend', `
                                 <tr>
                                    <td>${photo.albumId}</td>
                                    <td>${photo.id}</td>
                                    <td>${photo.title}</td>
                                    <td>${photo.url}</td>
                                    <td>${photo.thumbnailUrl}</td>
                                 </tr>
                              `);
                           });
                        });
                     });
                  });
               });
            };
         });
      });
   });
});