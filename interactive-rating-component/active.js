let selectedState = 1
let prevSelectedScore = null

const card  = document.getElementById('card')
const submit = document.getElementById('submit')
const scores = document.getElementById('scores')

scores.addEventListener('click', (e) => {
  const score = e.target.textContent
  if (!score || !scores.contains(e.target)) return

  if (prevSelectedScore) {
    prevSelectedScore.setAttribute('data-selected', 'false')
  }
  
  e.target.setAttribute('data-selected', 'true')

  prevSelectedScore = e.target  
  selectedState = score.textContent
})

submit.addEventListener('click', (e) => {
  card.innerHTML = thankyou
})

const thankyou = `<header class="thankyou-header">
      <div class="thankyou-image-container"><img src="./images/illustration-thank-you.svg"></div>
      <p class="result-text">You selected ${selectedState} out of 5</p>
    </header>
    <main class="thankyou-main">
      <h1 class="thankyou-title">Thank you!</h1>
      <p>We appreciate you taking the time to give a rating. If you ever need more support, 
  don’t hesitate to get in touch!</p>
    </main>`
