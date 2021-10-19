var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 13.0;\n' +
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
var real_points = [];
function init() {
    points.push(0.2,-0.3,0.0);
    points.push(0.2,0.2,0.0);
    points.push(-0.2,0.2,0.0);
    points.push(-0.2,-0.3,0.0);

    colors.push(1.0,0.0,0.0);
    colors.push(1.0,0.0,0.0);
    colors.push(1.0,0.0,0.0);
    colors.push(1.0,0.0,0.0);

    points.push(-0.05,-0.9,0.0);
    points.push(-0.05,-0.3,0.0);
    points.push(-0.17,-0.3,0.0);
    points.push(-0.17,-0.9,0.0);

    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);

    points.push(0.05,-0.9,0.0);
    points.push(0.05,-0.3,0.0);
    points.push(0.17,-0.3,0.0);
    points.push(0.17,-0.9,0.0);

    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);
    colors.push(0.0,1.0,0.0);

    points.push(0.35,-0.5,0.0);
    points.push(0.35,0.15,0.0);
    points.push(0.2,0.15,0.0);
    points.push(0.2,-0.5,0.0);

    colors.push(1.0,1.0,0.0);
    colors.push(1.0,1.0,0.0);
	colors.push(1.0,1.0,0.0);
	colors.push(1.0,1.0,0.0);

    points.push(-0.35,-0.5,0.0);
    points.push(-0.35,0.15,0.0);
    points.push(-0.2,0.15,0.0);
    points.push(-0.2,-0.5,0.0);
    
    colors.push(1.0,1.0,0.0);
    colors.push(1.0,1.0,0.0);
    colors.push(1.0,1.0,0.0);
    colors.push(1.0,1.0,0.0);


    points.push(0.1,0.2,0.0);
    points.push(0.1,0.4,0.0);
    points.push(-0.1,0.4,0.0);
    points.push(-0.1,0.2,0.0);

    colors.push(0.0,0.0,0.0);
	colors.push(0.0,0.0,0.0);
	colors.push(0.0,0.0,0.0);
	colors.push(0.0,0.0,0.0);

}
var f = 1;
function main() {
    if(f) {
        init();
        f = 0;
    }
    canvas = document.getElementById("gl");
    gl = getWebGLContext(canvas);
    gl.clearColor(1.0,1.0,1.0,1.0);
    if(!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shader.");
        return;
    }
    // console.log(points);
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
    // gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
    render();
}
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    gl.drawArrays(gl.TRIANGLE_FAN,4,4);
    gl.drawArrays(gl.TRIANGLE_FAN,8,4);
    gl.drawArrays(gl.TRIANGLE_FAN,12,4);
    gl.drawArrays(gl.TRIANGLE_FAN,16,4);
    gl.drawArrays(gl.TRIANGLE_FAN,20,4);
}
var id = null;
function jump() {
    if(id==null) id = setInterval(a,50);
}

function a() {
    // console.log(points);
    for(var i = 0; i < points.length; i += 3) {
        points[i] += 0.01;
    }
    main();
}
function stop() {
    clearInterval(id);
    id = null;
}
function re() {
    clearInterval(id);
    id = null;
    points = [];
    colors = [];
    f = 1;
    main();
}