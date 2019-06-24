
var canvas;
var gl;

var height = 0.95;

//0 is undecided, 8 is win, -1 is lose
var win = 0;

//player movement variables
var move = 0.05
var flag = 0;

var random = 0;

//enemy random movement variables
//bottom row
var randmove = 0.01;
var randmove2 = 0.01;
var randmove3 = 0.01;
var randmove4 = 0.01;
//top row
var randmove5 = 0.01;
var randmove6 = 0.01;
var randmove7 = 0.01;
var randmove8 = 0.01;

var speed = 0.8;

//enemy square vertex variables
//bottom row
var width = 0.05;
var width2 = -0.15;
var width3 = 0.25;
var width4 = 0.45;
//top row
var width5 = -0.15;
var width6 = 0.05;
var width7 = 0.25;
var width8 = 0.45;

//Enemy square draw
var draw = true;
var draw2 = true;
var draw3 = true;
var draw4 = true;
var draw5 = true;
var draw6 = true;
var draw7 = true;
var draw8 = true;

//bullet variables
var bullet_height = height;
var bullet_height2 = height;
//bottom row
var bullet_width = width;
var bullet_width2 = width2;
var bullet_width3 = width3;
var bullet_width4 = width4;

//top row
var bullet_width5 = width5;
var bullet_width6 = width6;
var bullet_width7 = width7;
var bullet_width8 = width8;

var toprowshoot = false;
var first = true;

//player bullet variables
var playerb_width = move;
var playerb_height = -1;
var shot = false;


window.addEventListener("keydown", getKey, false);

var pressed = 0;

function getKey(key) {
  if (key.key == "ArrowLeft"){
    pressed = 1;
  }
  else if (key.key == "ArrowRight"){
    pressed = 2;
  }
  else if (key.key == "r"){//restart
    pressed = 4;
  }
  else if (key.key == "q"){//quit
    pressed = 5;
  }
  else{
    pressed = 0;
  }
}

window.addEventListener("click", function(event){
  pressed = 3
});

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1.0 );

    render();
};

function render() {
    var enemy = [
      //enemy 1 (2nd bot)
      vec2 (width-0.1, height-0.2),
      vec2 (width, height-0.2),
      vec2 (width, height-0.3),
      vec2 (width-0.1, height-0.2),
      vec2 (width, height-0.3),
      vec2 (width-0.1, height-0.3),

      //enemy 2 (bot left)
      vec2 (width2-0.1, height-0.2),
      vec2 (width2, height-0.2),
      vec2 (width2, height-0.3),
      vec2 (width2-0.1, height-0.2),
      vec2 (width2, height-0.3),
      vec2 (width2-0.1, height-0.3),

      //enemy 3 (3rd bot)
      vec2 (width3-0.1, height-0.2),
      vec2 (width3, height-0.2),
      vec2 (width3, height-0.3),
      vec2 (width3-0.1, height-0.2),
      vec2 (width3, height-0.3),
      vec2 (width3-0.1, height-0.3),

      //enemy 4 (bot right)
      vec2 (width4-0.1, height-0.2),
      vec2 (width4, height-0.2),
      vec2 (width4, height-0.3),
      vec2 (width4-0.1, height-0.2),
      vec2 (width4, height-0.3),
      vec2 (width4-0.1, height-0.3),

      //enemy 5 (top left)
      vec2 (width5-0.1, height),
      vec2 (width5, height),
      vec2 (width5, height-0.1),
      vec2 (width5-0.1, height),
      vec2 (width5, height-0.1),
      vec2 (width5-0.1, height-0.1),

      //enemy 6
      vec2 (width6-0.1, height),
      vec2 (width6, height),
      vec2 (width6, height-0.1),
      vec2 (width6-0.1, height),
      vec2 (width6, height-0.1),
      vec2 (width6-0.1, height-0.1),

      //enemy 7
      vec2 (width7-0.1, height),
      vec2 (width7, height),
      vec2 (width7, height-0.1),
      vec2 (width7-0.1, height),
      vec2 (width7, height-0.1),
      vec2 (width7-0.1, height-0.1),

      //enemy 8 (top right)
      vec2 (width8-0.1, height),
      vec2 (width8, height),
      vec2 (width8, height-0.1),
      vec2 (width8-0.1, height),
      vec2 (width8, height-0.1),
      vec2 (width8-0.1, height-0.1)
    ];

    var player = [
      vec2 (move-0.1, -0.9),
      vec2 (move, -0.9),
      vec2 (move, -1),
      vec2 (move-0.1, -0.9),
      vec2 (move, -1),
      vec2 (move-0.1, -1)
    ];

    var enemy_bullet = [
      //bullet for enemy 1
      vec2 (bullet_width-0.08, bullet_height-0.3),
      vec2 (bullet_width-0.02, bullet_height-0.3),
      vec2 (bullet_width-0.05, bullet_height-0.35),

      //bullet for enemy 2
      vec2 (bullet_width2-0.08, bullet_height-0.3),
      vec2 (bullet_width2-0.02, bullet_height-0.3),
      vec2 (bullet_width2-0.05, bullet_height-0.35),

      //bullet for enemy 3
      vec2 (bullet_width3-0.08, bullet_height-0.3),
      vec2 (bullet_width3-0.02, bullet_height-0.3),
      vec2 (bullet_width3-0.05, bullet_height-0.35),

      //bullet for enemy 4
      vec2 (bullet_width4-0.08, bullet_height-0.3),
      vec2 (bullet_width4-0.02, bullet_height-0.3),
      vec2 (bullet_width4-0.05, bullet_height-0.35),

      //bullet for enemy 5
      vec2 (bullet_width5-0.08, bullet_height2-0.1),
      vec2 (bullet_width5-0.02, bullet_height2-0.1),
      vec2 (bullet_width5-0.05, bullet_height2-0.15),

      //bullet for enemy 6
      vec2 (bullet_width6-0.08, bullet_height2-0.1),
      vec2 (bullet_width6-0.02, bullet_height2-0.1),
      vec2 (bullet_width6-0.05, bullet_height2-0.15),

      //bullet for enemy 7
      vec2 (bullet_width7-0.08, bullet_height2-0.1),
      vec2 (bullet_width7-0.02, bullet_height2-0.1),
      vec2 (bullet_width7-0.05, bullet_height2-0.15),

      //bullet for enemy 8
      vec2 (bullet_width8-0.08, bullet_height2-0.1),
      vec2 (bullet_width8-0.02, bullet_height2-0.1),
      vec2 (bullet_width8-0.05, bullet_height2-0.15)
    ];

    var player_bullet = [
      vec2 (playerb_width-0.08, playerb_height),
      vec2 (playerb_width-0.02, playerb_height),
      vec2 (playerb_width-0.05, playerb_height+0.05)
    ];

    //Win Condition
    if (win == 8){
      alert("You Win!");
      win++;
    }
    if (win == 9){
      document.location.reload();
    }

    //Restart button
    if (pressed == 4){
      document.location.reload();
    }

    //Quit button
    if (pressed == 5){
      open(location, '_self').close();
    }

//drops 0.1 every 250 cycles also increase speed of enemy squares
    if (flag == 250){
      height = height - 0.1;
      flag = 0;
      speed = speed + 0.1;
    }
    flag++;

//random movement for each enemy square
    random = Math.random();
    if (random > 0.98){ //direction switch percentage
      randmove = randmove * -1;
    }
    width = width + (randmove * speed);

    random = Math.random();
    if (random > 0.98){
      randmove2 = randmove2 * -1;
    }
    width2 = width2 + (randmove2 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove3 = randmove3 * -1;
    }
    width3 = width3 + (randmove3 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove4 = randmove4 * -1;
    }
    width4 = width4 + (randmove4 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove5 = randmove5 * -1;
    }
    width5 = width5 + (randmove5 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove6 = randmove6 * -1;
    }
    width6 = width6 + (randmove6 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove7 = randmove7 * -1;
    }
    width7 = width7 + (randmove7 * speed);

    random = Math.random();
    if (random > 0.98){
      randmove8 = randmove8 * -1;
    }
    width8 = width8 + (randmove8 * speed);

//collision with outside edges
    if (width > 1){
      randmove = -0.01;
    }
    if (width < -0.9){
      randmove = 0.01;
    }

    if (width2 > 1){
      randmove2 = -0.01;
    }
    if (width2 < -0.9){
      randmove2 = 0.01;
    }

    if (width3 > 1){
      randmove3 = -0.01;
    }
    if (width3 < -0.9){
      randmove3 = 0.01;
    }

    if (width4 > 1){
      randmove4 = -0.01;
    }
    if (width4 < -0.9){
      randmove4 = 0.01;
    }

    if (width5 > 1){
      randmove5 = -0.01;
    }
    if (width5 < -0.9){
      randmove5 = 0.01;
    }

    if (width6 > 1){
      randmove6 = -0.01;
    }
    if (width6 < -0.9){
      randmove6 = 0.01;
    }

    if (width7 > 1){
      randmove7 = -0.01;
    }
    if (width7 < -0.9){
      randmove7 = 0.01;
    }

    if (width8 > 1){
      randmove8 = -0.01;
    }
    if (width8 < -0.9){
      randmove8 = 0.01;
    }

//Collision with other enemies
    //bot row
    if (width > width3-0.15){
      randmove = -0.01;
      randmove3 = 0.01;
    }
    if (width2 > width-0.15){
      randmove2 = -0.01
      randmove = 0.01
    }
    if(width3 > width4-0.15){
      randmove3 = -0.01;
      randmove4 = 0.01;
    }
    //top row
    if (width5 > width6-0.15){
      randmove5 = -0.01;
      randmove6 = 0.01;
    }
    if (width6 > width7-0.15){
      randmove6 = -0.01
      randmove7 = 0.01
    }
    if(width7 > width8-0.15){
      randmove7 = -0.01;
      randmove8 = 0.01;
    }

//if reached bottom go back to top
    if (height <= -0.6){
      if (win != -1){
        alert("You Lose! The Aliens got too close");
        win = -1;
      }
      document.location.reload();
    }

//Enemy Bullet Logic
    //bottom row
    if (draw || draw2 || draw3 || draw4){
      bullet_height = bullet_height - 0.03;//bullet speed
      if (bullet_height < -1){
        bullet_height = height;
        bullet_width = width;
        bullet_width2 = width2;
        bullet_width3 = width3;
        bullet_width4 = width4;
      }
    }
    //top row doesnt fire until all bottom row squares are destroyed
    else{
      toprowshoot = true;
      if (first){
        bullet_height2 = height;
        bullet_width5 = width5;
        bullet_width6 = width6;
        bullet_width7 = width7;
        bullet_width8 = width8;
        first = false;
      }
      bullet_height2 = bullet_height2 - 0.03;//bullet speed
      if (bullet_height2 < -1){
        bullet_height2 = height;
        bullet_width5 = width5;
        bullet_width6 = width6;
        bullet_width7 = width7;
        bullet_width8 = width8;
      }
    }

//bullet collision detection with player
    //bottom row bullets
    if(bullet_height < -0.65 && bullet_height > -0.75){
      if(draw){
        if(bullet_width-0.05 < move && bullet_width-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw2){
        if(bullet_width2-0.05 < move && bullet_width2-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw3){
        if(bullet_width3-0.05 < move && bullet_width3-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw4){
        if(bullet_width4-0.05 < move && bullet_width4-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
    }
    //top row bullets
    if(bullet_height2 < -0.6){
      if(draw5){
        if(bullet_width5-0.05 < move && bullet_width5-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw6){
        if(bullet_width6-0.05 < move && bullet_width6-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw7){
        if(bullet_width7-0.05 < move && bullet_width7-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
      if(draw8){
        if(bullet_width8-0.05 < move && bullet_width8-0.05 > move-0.1){
          if (win != -1){
            alert("You Lose!");
            win = -1;
          }
          document.location.reload();
        }
      }
    }

//Player Square Movement
    if(pressed == 1){
      move = move - 0.05;
      if (move <= -1){
        move = move + 2;
      }
      pressed = 0;
    }
    if(pressed == 2){
      move = move + 0.05;
      if (move >= 1){
        move = move - 2;
      }
      pressed = 0;
    }

//Player bullet Logic
    if (pressed == 3){
      shot = true;
      pressed = 0;
    }
    if (!shot){
      playerb_width = move;
    }
    else{
      playerb_height = playerb_height + 0.05;
    }
    if (playerb_height > 1){
      shot = false;
      playerb_width = move;
      playerb_height = -1;
    }

//Player bullet and enemy square collision detection
    if ((playerb_height < height-0.2) && (playerb_height > height-0.3)){
      if (draw && playerb_width-0.05 < width && playerb_width-0.05 > width-0.1){
        win++;
        draw = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw2 && playerb_width-0.05 < width2 && playerb_width-0.05 > width2-0.1){
        win++;
        draw2 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw3 && playerb_width-0.05 < width3 && playerb_width-0.05 > width3-0.1){
        win++;
        draw3 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw4 && playerb_width-0.05 < width4 && playerb_width-0.05 > width4-0.1){
        win++;
        draw4 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
    }
    if ((playerb_height < height) && (playerb_height > height-0.1)){
      if (draw5 && playerb_width-0.05 < width5 && playerb_width-0.05 > width5-0.1){
        win++;
        draw5 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw6 && playerb_width-0.05 < width6 && playerb_width-0.05 > width6-0.1){
        win++;
        draw6 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw7 && playerb_width-0.05 < width7 && playerb_width-0.05 > width7-0.1){
        win++;
        draw7 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
      if (draw8 && playerb_width-0.05 < width8 && playerb_width-0.05 > width8-0.1){
        win++;
        draw8 = false;
        playerb_height = -1;
        shot = false;
        playerb_width = move;
      }
    }

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    var fColorLocation = gl.getUniformLocation(program, "fColor");

//Drawing Enemy Squares
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(enemy), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(fColorLocation, 1.0, 0.0, 0.0, 1.0);

    gl.clear( gl.COLOR_BUFFER_BIT );
    if(draw){
      gl.drawArrays( gl.TRIANGLES, 0, 6 );
    }
    if(draw2){
      gl.drawArrays( gl.TRIANGLES, 6, 6 );
    }
    if(draw3){
      gl.drawArrays( gl.TRIANGLES, 12, 6 );
    }
    if(draw4){
      gl.drawArrays( gl.TRIANGLES, 18, 6 );
    }
    if(draw5){
      gl.drawArrays( gl.TRIANGLES, 24, 6 );
    }
    if(draw6){
      gl.drawArrays( gl.TRIANGLES, 30, 6 );
    }
    if(draw7){
      gl.drawArrays( gl.TRIANGLES, 36, 6 );
    }
    if(draw8){
      gl.drawArrays( gl.TRIANGLES, 42, 6 );
    }

//Drawing Enemy Bullets
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(enemy_bullet), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(fColorLocation, 1.0, 0.0, 0.0, 1.0);//red

    if(draw){
      gl.drawArrays( gl.TRIANGLES, 0, 3);
    }
    if(draw2){
      gl.drawArrays( gl.TRIANGLES, 3, 3);
    }
    if(draw3){
      gl.drawArrays( gl.TRIANGLES, 6, 3);
    }
    if(draw4){
      gl.drawArrays( gl.TRIANGLES, 9, 3);
    }
    if(toprowshoot && draw5){
      gl.drawArrays( gl.TRIANGLES, 12, 3);
    }
    if(toprowshoot && draw6){
      gl.drawArrays( gl.TRIANGLES, 15, 3);
    }
    if(toprowshoot && draw7){
      gl.drawArrays( gl.TRIANGLES, 18, 3);
    }
    if(toprowshoot && draw8){
      gl.drawArrays( gl.TRIANGLES, 21, 3);
    }

//Drawing Player Square
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(player), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(fColorLocation, 0.0, 1.0, 0.0, 1.0);//green

    gl.drawArrays( gl.TRIANGLES, 0, 6 );

//Drawing Player Bullets
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(player_bullet), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    gl.uniform4f(fColorLocation, 0.0, 1.0, 0.0, 1.0);//green

    gl.drawArrays( gl.TRIANGLES, 0, 3);

    requestAnimationFrame(render);
}
