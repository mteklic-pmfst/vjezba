import React from 'react';
import "./slideshow.css";

function Slideshow() {

    return ( 

            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://www.driveteam.hr/wp-content/uploads/Toyota-Aygo-X-Lauba-002.jpg" alt="Toyota Aygo"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://www.vecernji.hr/media/img/d3/b5/3976bf971d62bd63c3a9.jpeg" alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/GLA/7269/1621948227508/front-left-side-47.jpg" alt="Third slide"/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

      



    )

}

export default Slideshow;