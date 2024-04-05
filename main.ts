import { Application, Geometry, Shader, Mesh } from "pixi.js";
import fractalShader from "./fractal.wgsl?raw";

let main = async () => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    preference: "webgpu",
  });

  document.body.appendChild(app.canvas);

  const geometry = new Geometry({
    attributes: {
      aPosition: [-400, -400, 400, -400, 400, 400, -400, 400],
      aUvs: [-1, -1, 1, -1, 1, 1, -1, 1],
    },
    indexBuffer: [0, 1, 2, 0, 2, 3],
  });

  const gpu = {
    vertex: {
      entryPoint: "vert_main",
      source: fractalShader,
    },
    fragment: {
      entryPoint: "frag_main",
      source: fractalShader,
    },
  };

  const shader = Shader.from({
    gl: undefined,
    gpu,
  });

  const triangle = new Mesh({
    geometry,
    shader,
  });

  triangle.position.set(400, 300);

  app.stage.addChild(triangle);
};

window.onload = main;
