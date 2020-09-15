const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // NodeList

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();



//Movie select eevent
movieSelect.addEventListener('change', e=> {
  ticketPrice = +e.target.value;
  selMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Get data from localstorage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Save selected movie index and price
function selMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update totl and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // copy selected seats into arr, Map through array,return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat =>
  [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectesSeatsCount = selectedSeats.length;
  count.innerText = selectesSeatsCount;
  total.innerText = selectesSeatsCount * ticketPrice;
}

// Seat click event
container.addEventListener('click', e =>{
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// initial count and total
updateSelectedCount();