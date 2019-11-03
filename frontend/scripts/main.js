import anime from '/node_modules/animejs/lib/anime.es.js';

anime({
    targets: '.hero-body .logo',
    scale: function(el, i, l) {
        return (l-i)+1;
    },
    baseFrequency: 0,
    duration: function() { return anime.random(2200, 3800); },
    direction: 'alternate',
    loop: true
});