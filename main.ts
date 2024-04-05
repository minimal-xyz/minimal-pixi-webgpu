import { Application, Geometry, Shader, Mesh } from "pixi.js";
import fractalShader from "./fractal.wgsl?raw";

let main = async () => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    // make sure to use the WebGPU renderer
    preference: "webgpu",
  });

  document.body.appendChild(app.canvas);

  const geometry = new Geometry({
    attributes: {
      // 4 points in 2D
      aPosition: [-400, -400, 400, -400, 400, 400, -400, 400],
      // 4 points in 2D, specifying the UV coordinates
      aUvs: [-1, -1, 1, -1, 1, 1, -1, 1],
    },
    // 2 triangles from aPosition
    indexBuffer: [0, 1, 2, 0, 2, 3],
  });

  const gpu = {
    vertex: {
      // vertex function name in the shader
      entryPoint: "vert_main",
      source: fractalShader,
    },
    fragment: {
      // fragment function name in the shader
      entryPoint: "frag_main",
      source: fractalShader,
    },
  };

  const shader = Shader.from({
    // empty for WebGL
    gl: undefined,
    gpu,
  });

  const mesh = new Mesh({
    geometry,
    shader,
  });

  mesh.position.set(window.innerWidth / 2, window.innerHeight / 2);

  window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    mesh.position.set(window.innerWidth / 2, window.innerHeight / 2);
  });

  app.stage.addChild(mesh);
};

window.onload = main;
