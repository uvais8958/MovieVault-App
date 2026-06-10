const searchForm =document.querySelector('form');
const movieContainer=document.querySelector(".movie-container");
const inputBox=document.querySelector('.inputBox');



//function to fetch movie details using OMDB API
const getMovieInfo= async(movie)=>{
try{
    const myApiKey="5e52e973";
  const url=`http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

  const response= await fetch(url);
  if(!response.ok){
    throw new Error("unable to fetch movie data..");
  }

  const data= await response.json();

  showMovieData(data);
}catch(error){
   showErrorMessage("No movie found!");
}
}


//Function show move data on screen
const showMovieData=(data)=>{
  movieContainer.innerHTML='';
  movieContainer.classList.remove('noBackground');
    //Use Datastructuring assignment to exetract properties from data object
  const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;        
                  const movieElement=document.createElement('div');
                   movieElement.classList.add('movie-info');
                  movieElement.innerHTML=`
                  <h2>${Title}</h2>
                  <p><strong>Rating: &#11088;</strong>${imdbRating}</p>
                  
                  `;
                  const movieGenereElemnt=document.createElement('div');
                  movieGenereElemnt.classList.add('movie-genre');
                    Genre.split(",").forEach(elemnt=>{
                      const p=document.createElement('p');
                      p.innerText=elemnt;
                      movieGenereElemnt.appendChild(p);
                    });
                  movieElement.appendChild(movieGenereElemnt);

                  movieElement.innerHTML+=`<p><strong> Released Date:</strong>${Released}</p>
                                          <p><strong> Duration:</strong>${Runtime}</p>
                                           <p><strong> Actors:</strong>${Actors}</p>
                                         <p><strong> Plot:</strong>${Plot}</p> `
                 

                    // Creating for movie Poster
                    const moviePosterElement=document.createElement('div');
                     moviePosterElement.classList.add('movie-poster');
                     moviePosterElement.innerHTML=`<img src="${Poster}"/>
                     `;
                     movieContainer.appendChild(moviePosterElement);


                movieContainer.appendChild(movieElement);

}
    
//function to display error message
const showErrorMessage=(meesage)=>{
 movieContainer.innerHTML=`<h2>${meesage}</h2>`
      movieContainer.classList.add('noBackground');
}

//function to handle submission form
const handleFormSumission=(e)=>{
    e.preventDefault();
    
    const movieName=inputBox.value.trim();
    if(movieName!== ''){
      showErrorMessage("fetching movie information.. ")
          getMovieInfo(movieName);
    }
    else{
     showErrorMessage("Enter movie name to gat movie information..");
    }


}

//Adding event lisntener to search form
searchForm.addEventListener('submit',handleFormSumission);

