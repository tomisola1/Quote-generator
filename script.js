const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const nextQuoteBtn = document.getElementById('next-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function showLoading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function hideLoading(){
    loader.hidden = true
    quoteContainer.hidden = false
}

function newQuotes(){
    showLoading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if(quote.text.length > 40){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    hideLoading()
    authorText.textContent = !quote.author ? 'Unknown' : quote.author
}

async function getQuotes (){
    showLoading()
    let apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    try {
        let response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuotes()
    } catch (error) {
        console.log(error)
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

nextQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
