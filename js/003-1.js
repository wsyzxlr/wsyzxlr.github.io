var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '   gl_Position = u_ModelMatrix * a_Position;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';
const { vec3 } = glMatrix;

var gl,canvas;
var angle = 0;
var vertics;
var id;
var one = 3;
function main() {
    canvas = document.getElementById("gl");
    gl = getWebGLContext(canvas);
    if(!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shader.");
        return;

    }

    vertices = new Float32Array([
        0,  1,  0,
        -1,  0,  0,
        1,  0,  0,
        0, -1,  0
    ]);


    console.log(vertices);
    var bufferId = gl.createBuffer();
    // 将缓冲区对象绑定到目标
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // 向缓冲区对象写入数据

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // 连接a_Position变量与分配给它的缓冲区对象

    gl.enableVertexAttribArray(a_Position);

    render();
}
function render() {
    angle += one;
    var modelMatrix = new Matrix4();
    modelMatrix.setRotate(angle,0,0,1);

    var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');

    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    // gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP,0, 4);
    id = window.requestAnimFrame(render);
}

function stop() {
    window.cancelAnimationFrame(id);
    ok = 0;
}
function start() {
    if(!ok) {
        id = window.requestAnimFrame(render);
        ok = 1;
    }
}
function change() {
    if(!ok) return;
    one = -one;
}