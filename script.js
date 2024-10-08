const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

function fetchUsers(){

    fetch(USERS_ENDPOINT).then(resp => resp.json())
    .then(users => {
        const UserGroups = UsersGroupByTLD(users);
        for(const tld in UserGroups) {
            renderColumn(tld, UserGroups[tld]);
        }
    })
    .catch(err => console.error('Error in fetching users groups:', err))
}
  
function UsersGroupByTLD(users){
    const usersGroups = {};

    for (const user of users){
        const web_site = user.website;
        const tld = getTLD(web_site);
        
        if (!usersGroups[tld]){
            usersGroups[tld] = [];
        }
        
        usersGroups[tld].push(user);
    };
    
    return usersGroups
  }
  
function getTLD(website){
  const dotIndex = website.lastIndexOf('.');
  return website.substring(dotIndex);
  } 

function renderColumn(title, users) {
 const columnDiv = document.createElement('div');
 columnDiv.classList.add('column');

 const h3 = document.createElement('h3');
 h3.textContent = title;
 columnDiv.appendChild(h3);

 users.forEach((user) => {
 const cardDiv = document.createElement('div');
 cardDiv.classList.add('card');

 const nameP = document.createElement('p');
 nameP.textContent = `Name: ${user.name}`;
 cardDiv.appendChild(nameP);

 const usernameP = document.createElement('p');
 usernameP.textContent = `Username: ${user.username}`;
 cardDiv.appendChild(usernameP);

 const websiteP = document.createElement('p');
 websiteP.textContent = `Website: ${user.website}`;
 cardDiv.appendChild(websiteP);

 columnDiv.appendChild(cardDiv);
 });

 const wrapperDiv = document.getElementById('wrapper');
 wrapperDiv.appendChild(columnDiv);
}

fetchUsers();