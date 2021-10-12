var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';
const { vec3 } = glMatrix;

var gl,canvas;
var points = [];
function main() {
    points=[];
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

    var vertices = ([
        -1.0,-1.0,0.0,
        0.0,1.0,0.0,
        1.0,-1.0,0.0,
    ])
    var p1 = vec3.fromValues(vertices[0],vertices[1],vertices[2]);
    var p2 = vec3.fromValues(vertices[3],vertices[4],vertices[5]);
    var p3 = vec3.fromValues(vertices[6],vertices[7],vertices[8]);

    var num = document.getElementById("show").value;
    // console.log(document.getElementById("show").value);
    divide(p1,p2,p3,num);
    console.log(points);
    var bufferId = gl.createBuffer();
    // 将缓冲区对象绑定到目标
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // 向缓冲区对象写入数据
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    // gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,points.length/3);
}
function divide(a,b,c,cnt) {
    if(cnt==0) {
        // gl.drawArrays(gl.TRIANGLES,);
        points.push(a[0],a[1],a[2]);
        points.push(b[0],b[1],b[2]);
        points.push(c[0],c[1],c[2]);
        // gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.drawArrays(gl.TRIANGLES,0,points.length/3);
        return;
    }
    // console.log(b[0]);
    var ab = vec3.create();
    var ab = vec3.lerp(ab,a,b,0.5);
    var ac = vec3.create();
    var ac = vec3.lerp(ac,a,c,0.5);
    var bc = vec3.create();
    var bc = vec3.lerp(bc,b,c,0.5);
    cnt--;
    divide(a,ab,ac,cnt);
    divide(b,ab,bc,cnt);
    divide(c,bc,ac,cnt);
}
