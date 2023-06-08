import './aboutus.css';
import React from 'react';

function About() {
    return (
            <div class="content">
                <div class="about">
                    <p>Rent-a-Car Fast and Easy je tvrtka osnovana 2018. godine. Fokusira se na pružanje visoko kvalitetne usluge iznajmljivanja vozila svojim klijentima.
                        Ova tvrtka ima za cilj svojim klijentima pružiti najbolje iskustvo iznajmljivanja automobila, sa modernim vozilima,
                        fleksibilnim uslovima iznajmljivanja i vrhunskom korisničkom podrškom. Svojim klijentima daje na raspolaganje širok izbor vozila,
                        od gradskih automobila do luksuznih vozila za poslovne potrebe.
                        Tvrtka radi sa ciljem da svoje usluge pruži po najpovoljnijim cijenama na tržištu, kako bi zadovoljila potrebe svih svojih klijenata.
                    </p>
                </div>
                <div class="hours">
                    <h3>Radno vrijeme</h3>
                    <p><b>Ponedjeljak - Petak:</b> 8:00 - 18:00</p>
                    <p><b>Subota - Nedjelja:</b> 9:30 - 16:00</p>
                </div>
                <div class="address">
                    <h3>Adresa</h3>
                    <p>Ruđera Boškovića 33, 21000 Split</p>
                </div>
                <div class="contact">
                    <h3>Kontakt</h3>
                    <p>+021 345-6789</p>
                    <p>rentacar@gmail.com</p>
                </div>
            </div>
        
        
    );
}

export default About;