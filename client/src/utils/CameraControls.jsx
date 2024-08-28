import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, Quaternion, Raycaster } from "three";

const CameraControls = ({ clickedMesh, sceneRef, manualCameraPosition }) => {
  const originalPosition = useRef(new Vector3());
  const targetPosition = useRef(new Vector3());
  const zoomLevel = 1.2; // Adjust this for the desired zoom level
  const targetQuaternion = useRef(new Quaternion());
  const raycaster = useRef(new Raycaster());

  useFrame(({ camera, scene }) => {
    if (originalPosition.current.equals(new Vector3(0, 0, 0))) {
      originalPosition.current.copy(camera.position);
    }

    if (clickedMesh) {
      // Get the mesh's world position
      const meshPosition = new Vector3();
      clickedMesh.getWorldPosition(meshPosition);

      // Use manual camera position if provided, otherwise calculate it
      if (manualCameraPosition) {
        targetPosition.current.copy(manualCameraPosition);
      } else {
        // Calculate the target position for the camera
        const direction = new Vector3()
          .subVectors(camera.position, meshPosition)
          .normalize();
        targetPosition.current
          .copy(meshPosition)
          .add(direction.multiplyScalar(zoomLevel));
      }

      // Smoothly move the camera to the target position and look at the mesh
      camera.position.lerp(targetPosition.current, 0.1);
      camera.lookAt(meshPosition);

      if (camera.position.distanceTo(targetPosition.current) < 0.1) {
        camera.position.copy(targetPosition.current);
        camera.lookAt(meshPosition);
      }

      // Check if the clicked mesh is already in the camera's view
      const meshVisible = isMeshVisible(camera, clickedMesh);

      if (!meshVisible) {
        // Calculate the rotation around the Y-axis needed to align the scene with the mesh
        const meshPositionHorizontal = new Vector3(
          meshPosition.x,
          0,
          meshPosition.z
        );
        const cameraPositionHorizontal = new Vector3(
          camera.position.x,
          0,
          camera.position.z
        );

        const targetDirection = new Vector3()
          .subVectors(meshPositionHorizontal, cameraPositionHorizontal)
          .normalize();

        const yAxis = new Vector3(0, 0, 0);
        const rotationAngle = Math.atan2(targetDirection.x, targetDirection.z);
        const horizontalRotation = new Quaternion().setFromAxisAngle(yAxis, 0);
        targetQuaternion.current.slerp(horizontalRotation, 0.1);

        // Rotate the entire scene or the parent group
        if (sceneRef.current) {
          sceneRef.current.quaternion.copy(targetQuaternion.current);
        }
      }
    } else {
      // Return to the original camera position
      camera.position.lerp(originalPosition.current, 0.1);
      camera.lookAt(new Vector3(0, 0, 0));

      if (camera.position.distanceTo(originalPosition.current) < 0.1) {
        camera.position.copy(originalPosition.current);

        // Reset the scene rotation
        if (sceneRef.current) {
          sceneRef.current.quaternion.set(0, 0, 0, 1); // Reset rotation to identity quaternion
        }
      }
    }
  });

  // Function to check if the mesh is visible in the camera's view
  function isMeshVisible(camera, mesh) {
    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.current.intersectObject(mesh);
    return intersects.length > 0;
  }

  return null;
};

export default CameraControls;
