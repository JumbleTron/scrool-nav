# README #

Skrypt wspomagajacy tworzenie stron typy one page, za jego pomocą programista nie musis się martwić o działanie menu.

Sposób użycia:

$(function() {
   $('header').scrolnav();
});

Opcje:

scrollSpeed: 2000 //prędkość przewijania strony
selector: ".scrol-page" //sekcje na stronie, do który ma nawigować, 
activeClass: 'active' //klasa elementu menu aktywnego
ignoreClass: 'scroolnav-ignore' //klasa elementu menu, który jest pomijany
itemClass: 'scroolnav-item' //dodawana klasa do elementów menu
autoScroll: true //pozwala na automatyczne scroolowanie strony
offset: $(this).height()+$(this).offset().top //wysokość menu
menuFixed: true //czy menu ma być przyklejone do góry przeglądarki
oneScrean: false //każda sekcja ma ustawioną wysokość okna przeglądarki
responsiveMenu: true //dodaje przycisk menu na telefonach i tabletach
hideMenu: true //ukrywa menu na tabletach i telefonach po kliknięciu w element menu

Metody:
disable() //wyłącza scrool-nav dla elementu
enable() //włącza scrool-nav dla elementu

