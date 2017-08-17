function resizeHero() {
  var hero = document.getElementById('hero');
  var headerHeight = document.getElementById('header').clientHeight;
  var height = window.innerHeight;
  hero.style.height = (height - headerHeight) + "px";
};

resizeHero();

window.onresize = resizeHero;
