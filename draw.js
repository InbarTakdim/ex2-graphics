var pixel = document.getElementById("myCanvas");
var contx = pixel.getContext("2d");
document.getElementById('fileinput').addEventListener('change', draw, false);
pixel.addEventListener('click', handleClick , false);
var matrix=[];
canvasWidth=700;
canvasHeight=400;
var coordMouse=[];
/*
Line(130,100, 270,10);
Line(270,10, 410,100);
Line(130,100, 410,100);
Line(130,100, 130,300);
Line(410,100, 410,300);
Line(410,100, 410,300);
Line(130,300, 410,300);
Line(140,120, 200,120);
Line(140,120, 140,240);
Line(140,240, 200,240);
Line(200,120, 200,240);
Line(300,130, 390,130);
Line(300,130, 300,180);
Line(300,180, 390,180);
Line(390,130, 390,180);
bezierLine(300,300, 300,150,  250,150,  250,305);
Circle(260,270, 266, 270);
*/

function clean(){
    contx.beginPath();
    contx.clearRect(0, 0,canvasWidth, canvasHeight);
}

function cleanParams(lines){
    //this function is parse the coordinate - remove "(" and ")"
    temp=lines;
    var keys=temp.split(',');
    for(var j = 0; j < keys.length; j++){
        keys[j]=keys[j].trim();
        if(keys[j].charAt(0)==='(') keys[j]=keys[j].substr(1);
        if(keys[j].charAt(keys[j].length-1)===')') keys[j]=keys[j].substr(0,keys[j].length-1);
        keys[j]=parseInt(keys[j]);
                
    }
    //keys is array of real coordinate
    return keys;
}

function draw(){
    clean();
    var f= document.getElementById('fileinput').files[0];
     if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
        var contents = e.target.result;
        //parse file :
        var lines = contents.split('\n');
        for(var i = 0; i < lines.length; i++)
        {
            var keys=cleanParams(lines[i]);

            
            if(i>=1 && i<=14)
            {
                matrix[i-1]=([keys[0],keys[1],keys[2],keys[3]]);
                Line(parseInt( matrix[i-1][0]),parseInt( matrix[i-1][1]),parseInt( matrix[i-1][2]),parseInt( matrix[i-1][3]));
            }

            if(i==17)
            {
                matrix[14]=([keys[0],keys[1],keys[2],keys[3], keys[4],keys[5],keys[6],keys[7]]);
                bezierLine(parseInt(matrix[14][0]),parseInt(matrix[14][1]),parseInt(matrix[14][2]),parseInt(matrix[14][3]),parseInt(matrix[14][4]),parseInt(matrix[14][5]),parseInt(matrix[14][6]),parseInt(matrix[14][7]));
            }
            
            if(i==20)
            {
                matrix[15]=([keys[0],keys[1],keys[2],keys[3]]);
               Circle(parseInt(matrix[15][0]),parseInt(matrix[15][1]),parseInt(matrix[15][2]),parseInt(matrix[15][3]));
            }
        }
    }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
}




function Line(x1,y1,x2,y2)
{
        console.log("Line(" + x1+","+y1+","+x2+","+y2+")" );
        var dx = x2 - x1;
        var dy = y2 - y1;

        // horizontal line:
        if(x1==x2){
            for(var y=y1 ; y<y2 ; y++)
            {
                //fillRect is function that paint one pixel
                contx.fillRect( x1, y, 1, 1 );
            }
        }
       //oblique line:
        else{
            for(var x=x1;x<x2;x++)
            {
                //fillRect is function that paint one pixel
                contx.fillRect( x, y1 + ((dy * (x - x1) )/ (dx)), 1, 1 );
            }
        }
}



function Circle(x1,y1, x2, y2)
{
        var rad=((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var radius= Math.sqrt(rad);
        for(var t=0 ; t<360 ; t++)
        {
            //calculate the points on the circle
            var x= radius*Math.cos(t),y=radius*Math.sin(t);
            contx.fillRect( x+x1, y+y1, 1, 1 );
        }
        //console.log(radius);
}


function bezierLine(x1,y1, x2,y2,  x3,y3,  x4,y4)
{
    var numberLines=0.01;
    var p0 = {x: x1, y: y1}; 
    var p1 = {x: x2, y: y2};
    var p2 = {x: x3, y: y3};
    var p3 = {x: x4, y: y4};
    contx.moveTo(p0.x, p0.y);
    //get the point of the curve and draw it
    for (var i=0; i<1; i+=numberLines){
         var point = bezier(i, p0, p1, p2, p3);
         contx.lineTo(point.x, point.y);
    }
      contx.stroke();
}

 function bezier(t, p0, p1, p2, p3)
{
    var cX = 3 * (p1.x - p0.x),bX = 3 * (p2.x - p1.x) - cX,aX = p3.x - p0.x - cX - bX;
    var cY = 3 * (p1.y - p0.y),bY = 3 * (p2.y - p1.y) - cY,aY = p3.y - p0.y - cY - bY;
    var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
    var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
    return {x: x, y: y};
}

function translation()
{
    clean();
    console.log("in movment: "+ coordMouse[0] +" , "+coordMouse[1]);
    console.log("in movment: "+ coordMouse[2] +" , "+coordMouse[3]);
    if(coordMouse[0]!='undefined')
    {
        if(coordMouse.length<2){
            alert("you must choose 2 points!!!")
            return;
        }
        
        //calculate difference:
    if(coordMouse[0] < coordMouse[2])
        var diffX= parseInt(parseInt(coordMouse[2])-parseInt(coordMouse[0]));
    if(coordMouse[0] >= coordMouse[2])
        var diffX= parseInt(parseInt(coordMouse[2])-parseInt(coordMouse[0]));

    if(coordMouse[1] < coordMouse[3])
        var diffY= parseInt(parseInt(coordMouse[3])-parseInt(coordMouse[1]));
    if(coordMouse[1] >= coordMouse[3])
        var diffY= parseInt(parseInt(coordMouse[3])-parseInt(coordMouse[1]));

    console.log("X1 == "+ coordMouse[0]+", Y1=="+ coordMouse[1]);
    console.log("X2 == "+ coordMouse[2]+", Y2=="+ coordMouse[3]);
    console.log("diffX == "+ diffX+", diffY=="+ diffY);
    var f= document.getElementById('fileinput').files[0];
        console.log("texssss"+ f);
    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            //parse file :
            var lines = contents.split('\n');
            for(var i = 0; i < lines.length; i++)
            {
                if(i!=0 && i!=15 && i!=16 &&i!=18 && i!=19)
                {   var keys=cleanParams(lines[i]);
                    console.log("-----i="+i+"keys="+ keys[0]);
                }
                if(i>=1 && i<=14)
                {
                    matrix[i-1]=[parseInt(matrix[i-1][0]+diffX),parseInt(matrix[i-1][1]+diffY),parseInt(matrix[i-1][2]+diffX),parseInt(matrix[i-1][3]+diffY)];
                    console.log("line >> "+parseInt( matrix[i-1][0])+","+parseInt( matrix[i-1][1])+","+parseInt( matrix[i-1][2])+","+parseInt( matrix[i-1][3]));
                    Line(parseInt( matrix[i-1][0]),parseInt( matrix[i-1][1]),parseInt( matrix[i-1][2]),parseInt( matrix[i-1][3]));
                }

                if(i==17)
                {
                    matrix[14]=[parseInt(matrix[14][0]+diffX),parseInt(matrix[14][1]+diffY),parseInt(matrix[14][2]+diffX),parseInt(matrix[14][3]+diffY),parseInt(matrix[14][4]+diffX),parseInt(matrix[14][5]+diffY),parseInt(matrix[14][6]+diffX),parseInt(matrix[14][7]+diffY)];
                    bezierLine(parseInt(matrix[14][0]),parseInt(matrix[14][1]),parseInt(matrix[14][2]),parseInt(matrix[14][3]),parseInt(matrix[14][4]),parseInt(matrix[14][5]),parseInt(matrix[14][6]),parseInt(matrix[14][7]));
                }
                
                if(i==20)
                {
                    matrix[15]=[parseInt(matrix[15][0]+diffX),parseInt(matrix[15][1]+diffY),parseInt(matrix[15][2]+diffX),parseInt(matrix[15][3]+diffY)];
                    Circle(parseInt(matrix[15][0]),parseInt(matrix[15][1]),parseInt(matrix[15][2]),parseInt(matrix[15][3]));
                }
            }
        }
        r.readAsText(f);
        } else { 
            alert("Failed to load file");
        }
    //empty coordmouse array:
    coordMouse=[];
    }
}

  function handleClick(e)
  {
    var mouseX=e.clientX;
    var mouseY=e.clientY;
    contx.fillStyle="red";
    contx.fillRect(mouseX,mouseY, 1, 1 );
    contx.fillRect(mouseX,mouseY+1, 1, 1 );
    contx.fillRect(mouseX+1,mouseY, 1, 1 );
    contx.fillRect(mouseX+1,mouseY+1, 1, 1 );
    coordMouse.push(mouseX);
    coordMouse.push(mouseY);
    contx.fillStyle="black";
}
    