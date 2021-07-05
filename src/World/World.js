import { createCamera } from './components/camera.js';
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import {Hand} from './components/Hand/Hand.js';
import {HandController} from './components/Hand/HandController.js'

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;
let hand_controller;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    const { ambientLight, mainLight } = createLights();
    // const train = new Train();
    const hand = new Hand();
    hand_controller =  new HandController(hand, controls);

    // loop.updatables.push(controls, train);
    scene.add(ambientLight, mainLight, hand);

    const resizer = new Resizer(container, camera, renderer);

    // add the helpers to the scene
    scene.add(createAxesHelper(), createGridHelper());
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  drawHand(predictions){
    if (!predictions || predictions.length == 0 ) return;
    hand_controller.drawHand(predictions[0]);
  }
}

export { World };
