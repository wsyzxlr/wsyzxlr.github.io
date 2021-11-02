var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '   gl_Position = u_ModelMatrix * a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '   v_Color = a_Color;\n' +
    '}\n';

var FSHADER_SOURCE =
    "precision mediump float;\n" +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '   gl_FragColor = v_Color;\n' +
    '}\n';

var gl;
var canvas;
var points = [];
var colors = [];
function main() {
    points = [];
    colors = [];
    var vertices = new Float32Array([
        -0.3, -0.3, 0.3,
        -0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, -0.3, 0.3,
        -0.3, -0.3, -0.3,
        -0.3, 0.3, -0.3,
        0.3, 0.3, -0.3,
        0.3, -0.3, -0.3,
    ]);

    var vertexColors = new Float32Array([
        0.0, 0.0, 0.0,
		0.0, 0.0, 1.0,
	    0.0, 1.0, 0.0,
        0.0, 1.0, 1.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 1.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 1.0,
    ]);
    var faces = [
        1, 0, 3, 1, 3, 2, //正
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左
    ];
    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]*3], vertices[faces[i]*3+1], vertices[faces[i]*3+2]);

        colors.push(vertexColors[Math.floor(i / 6)*3], vertexColors[Math.floor(i / 6)*3+1], vertexColors[Math.floor(i / 6)*3+2]);
    }


    var canvas = document.getElementById("gl");
    gl = getWebGLContext(canvas);
    if(!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shader.");
        return;
    }
    gl.enable(gl.DEPTH_TEST);
    // console.log(points);
    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(faces), gl.STATIC_DRAW );

    var bufferId = gl.createBuffer();
    // 将缓冲区对象绑定到目标
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // 向缓冲区对象写入数据
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array( colors ), gl.STATIC_DRAW);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);
    // console.log(points);
    // gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);

    render();
}
var vis2 = 0;
var vis = 0;
var xyz = 0;
function XX() {
    xyz = 1;
    if(vis == 0) {
        vis = 1;
        main();
    }
}
function YY() {
    xyz = 2;
    if(vis == 0) {
        vis = 1;
        main();
    }
}
function ZZ() {
    xyz = 3;
    if(vis == 0) {
        vis = 1;
        main();
    }
}
var ss = 0;
var anglex = 0;
var angley = 0;
var anglez = 0;
var disx = 0,disy = 0,disz = 0;
var sizex = 1,sizey = 1,sizez = 1;
function render() {
    // console.log(xyz);
    var modelMatrix = new Matrix4();
    if(vis == 1) {
        if(xyz == 1) {
            anglex += 2;
            anglex %= 360;
        }
        if(xyz == 2) {
            angley += 2;
            angley %= 360;
        }
        if(xyz == 3) {
            anglez += 2;
            anglez %= 360;
        }
    }
    modelMatrix.setTranslate(disx,disy,disz);
    modelMatrix.rotate(anglex,1,0,0);
    modelMatrix.rotate(angley,0,1,0);
    modelMatrix.rotate(anglez,0,0,1);
    modelMatrix.scale(sizex,sizey,sizez);
    // modelMatrix.translate(0,0,0.5);
    var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);

    gl.clearColor(0.3,0.3,0.3,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,points.length/3);
    // console.log(vis);
    if(vis == 1) {
        ss = requestAnimFrame(render);
    }
}
function stop() {
    vis = 0;
    cancelAnimationFrame(ss);
}
function start() {
    if(vis == 0) {
        ss = requestAnimFrame(render);
    }
    vis = 1;
}
function XL() {
    disx += 0.1;
    if(vis == 0) {
        main();
    }
}
function XR() {
    disx -= 0.1;
    if(vis == 0) {
        main();
    }
}
function YO() {
    disy += 0.1;
    if(vis == 0) {
        main();
    }
}
function YD() {
    disy -= 0.1;
    if(vis == 0) {
        main();
    }
}
function ZG() {
    disz += 0.1;
    if(vis == 0) {
        main();
    }
}
function ZB() {
    disz -= 0.1;
    if(vis == 0) {
        main();
    }
}
function XB() {
    sizex += 0.1;
    if(vis == 0) {
        main();
    }
}
function XS() {
    sizex -= 0.1;
    if(vis == 0) {
        main();
    }
}
function YB() {
    sizey += 0.1;
    if(vis == 0) {
        main();
    }
}
function YS() {
    sizey -= 0.1;
    if(vis == 0) {
        main();
    }
}
function ZB() {
    sizez += 0.1;
    if(vis == 0) {
        main();
    }
}
function ZS() {
    sizez -= 0.1;
    if(vis == 0) {
        main();
    }
}