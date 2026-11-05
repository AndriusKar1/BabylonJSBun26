import { Vector3, Quaternion } from "@babylonjs/core";

import type { SceneData } from "./interfaces";

// rotate box
let boxAngle: number = 45;
let boxSpeed: number = 0.001;

// move light in ellipse and cycle luma
let lightAngle: number = 0;
let lightSpeed: number = 0.005;
const lightXpos: number = 1;
const lightZpos: number = 5;

// vertical oscilation of meshes
let verticalSpeed: number = 0.006;
let verticalAngle: number = 0;
let verticalRangeY: number = 0.3;
let boxPositionY: number = 4;
let boxPositionX: number = 2;
let box2PositionY: number = 6;
let box2PositionX: number = 5;
let horizontalRangeX: number = 5;
let horizontalAngle: number = 100;
let horizontalAngle2: number = 50;
let spherePositionY: number = 1.5;
let spherePositionX: number = 2;

export default function createRunScene(runScene: SceneData) {
  runScene.scene.onAfterRenderObservable.add(() => {
    // rotate box
    const axis: Vector3 = new Vector3(0, 0, 1).normalize();
    const quat: Quaternion = Quaternion.RotationAxis(
      axis,
      boxAngle * 2 * Math.PI
    );
    runScene.box.rotationQuaternion = quat;
    boxAngle += boxSpeed;
    boxAngle %= 1;

    
    // move light in ellipse  and cycle luma
    runScene.lightSpot.position = new Vector3(
      lightXpos + 8 * Math.sin(lightAngle * 2 * Math.PI),
      20,
      lightZpos + 10 * Math.cos(lightAngle * 2 * Math.PI)
    );
    runScene.lightSpot.intensity = 0.7 * Math.sin(lightAngle * 2 * Math.PI);
    lightAngle += lightSpeed;
    lightAngle %= 1;

        // vertical oscilation of meshes
    runScene.box.position.y =
      boxPositionY + verticalRangeY * Math.sin(verticalAngle * 2 * Math.PI);
    runScene.sphere.position.y =
      spherePositionY + 5 * Math.sin(verticalAngle * 1 * Math.PI);
    verticalAngle += verticalSpeed;
    verticalAngle %= 1;
    runScene.sphere.position.x =
      spherePositionX + 25 * Math.sin(horizontalAngle * 2 * Math.PI);

    runScene.box.position.x =
      boxPositionX + horizontalRangeX * Math.sin(horizontalAngle * 10 * 360);
    horizontalAngle += verticalSpeed; // Using verticalSpeed for horizontal movement
    horizontalAngle %= 1;
    runScene.box2.position.x =
      box2PositionX + -5 * Math.sin(horizontalAngle2 * 2 * 10);
    horizontalAngle2 += verticalSpeed;
    horizontalAngle2 %= 1;
    runScene.box2.position.y =
      box2PositionY + 5 * Math.sin(verticalAngle * 1 * Math.PI);

  });
}


