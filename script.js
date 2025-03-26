var btn1 = document.querySelector('#green');
var btn2 = document.querySelector('#red');
let likeCount = 0;
let dislikeCount = 0;
let userHasVoted = false;

btn1.addEventListener('click', function() {
  
    if (btn2.classList.contains('red')||!userHasVoted) {
      btn2.classList.remove('red');
      likeCount++;
      document.getElementById('likeCount').textContent = likeCount;
      userHasVoted = true;
    } 
    else {
        alert('You have already voted.');
    }
  this.classList.toggle('green');
  
});

btn2.addEventListener('click', function() {
  
    if (btn1.classList.contains('green')||!userHasVoted) {
      btn1.classList.remove('green');
      dislikeCount++;
      document.getElementById('dislikeCount').textContent = dislikeCount;
      userHasVoted = true;
    } 
    else {
        alert('You have already voted.');
    }
  this.classList.toggle('red');
  
});

