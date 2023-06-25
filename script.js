




//get quote from api
/*async function getQuote(){
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data)
  } catch (error) {
      console.log("erro viado " + error);
  }
}

getQuote();*/

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');

//show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}


//hide loading
function complete(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}


 

/*async function getQuote(){
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl);

  try {
    const response = await fetch(proxyUrl);
    const data = await response.text();
    const json = JSON.parse(data.contents);
    console.log(json);
    //authorText.innerText = json.quoteAuthor;
    //quoteText.innerText = json.quoteText;
  } catch (error) {
      console.log("Erro: " + error);
  }
}

getQuote();*/


async function getQuote(){
  loading();
  //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&rand=' + Math.random();
 
  const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl);

  try {
    const response = await axios.get(proxyUrl);
    const data = await response.data.contents;
    //console.log(data.contents);
    const dataParsead = JSON.parse(data);
    console.log(dataParsead);

    if(dataParsead.quoteAuthor === ''){
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = dataParsead.quoteAuthor;
    }

    if(dataParsead.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    }

    //authorText.innerText = dataParsead.quoteAuthor;
    quoteText.innerText = dataParsead.quoteText;

    //stop loader and show quote
    complete();
  } catch (error) {

      getQuote();
      console.log("Erro: " + error);
  }
}

function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

//event liste
newQuoteBtn.addEventListener('click',  getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
//loading();


