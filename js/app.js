var participants = [
  {"number":  1,  "name": "XXXXX XXXXXXX XXXXXX"},
  {"number":  2,  "name": "Maddie Waldman Rojas Amud"},
  {"number":  3,  "name": "Jacqueline Castañeda Bautista"},
  {"number":  4,  "name": "XXXXX XXXXXXX XXXXXX"},
  {"number":  5,  "name": "German Peralta Bernal"},
  {"number":  6,  "name": "Nairo Samir Boom Varga"},
  {"number":  7,  "name": "Lizeth Nathalia Delgadillo Ramirez"},
  {"number":  8,  "name": "Faber Duvan Herrera Martinez"},
  {"number":  9,  "name": "Edna Rocio Ducuara Capera"},
  {"number":  10, "name": "Fernanda Aya Vasquez"},
  {"number":  11, "name": "Paola Camila Caro Garzon"},
  {"number":  12, "name": "Julio Cesar Hernandez"},
  {"number":  13, "name": "Valentina Murillo Martinez"},
  {"number":  14, "name": "Jhonatan Mejia"},
  {"number":  15, "name": "Jeison Castiblanco"},
  {"number":  16, "name": "XXXXX XXXXXXX XXXXXX"},
  {"number":  17, "name": "Tatiana Castiblanco Moreno"},
  {"number":  18, "name": "Clao Cortes"},
  {"number":  19, "name": "Julio Cesar Canizales"},
  {"number":  20, "name": "Erika Faisuly Florez Garzon"}
];

var view = document.querySelector("#win");

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
var tl = new TimelineLite({ onUpdate: update, onComplete: complete });
var randomnumber = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
var ap = alphabetPosition(participants[randomnumber - 1].name);
var word = [];

for (var i = 0; i < ap.length; i++) {
  word.push(0);
  tl.to(word, 10 + (i * 0.1), { [i]: 27 * 3 + ap[i] }, 0);
}

update();

function complete() {
  document.querySelector("#number").innerHTML = participants[randomnumber - 1].number;
  animateSnow(20, document.getElementById("container"), window.innerWidth , window.innerHeight);
}

function update() {
  var html = "";
  for (var i = 0; i < word.length; i++) {    
    html += letters[Math.round(word[i]) % 27];
  }
  view.innerHTML = html;
}

function alphabetPosition(text) {
  const result = [];
  for (var i = 0; i < text.length; i++) {
    var code = text.toUpperCase().charCodeAt(i);
    if (code == 32 ) { result.push(26); continue; } 
    if (code > 64 && code < 91) result.push((code - 64) - 1);
  }
  return result
}

function animateSnow(total, container, w, h) {
  var R = function(min,max) {return min+Math.random()*(max-min)},
      tl = new TimelineLite(),
      i, Div;
  TweenLite.set(container,{perspective:500});
  for (i=0; i<total; i++){ 
   Div = document.createElement('div');
   TweenLite.set(Div,{attr:{class:'snow'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
   container.appendChild(Div);
   tl.to(Div,R(6,15),{y:h+100,ease:Linear.easeNone,repeat:-1}, 0)
     .to(Div,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut}, 0)
     .to(Div,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut}, 0);
 }
 return tl;
}