var Mutable;
(function (Mutable) {
    var ƒ = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    let mutator;
    let angle = 0;
    let cmpTransform;
    function init() {
        Scenes.createMiniScene();
        Scenes.createViewport();
        cmpTransform = Scenes.node.cmpTransform;
        mutator = cmpTransform.getMutatorForAnimation();
        console.log("Mutator: ", mutator);
        let serialization = Scenes.node.cmpTransform.serialize();
        console.log("Serialization: ", serialization);
        let mttCamera;
        mttCamera = Scenes.camera.getComponent(ƒ.ComponentCamera).getMutator();
        console.log("mttCamera: ", mttCamera);
        let mttCameraTypes;
        mttCameraTypes = Scenes.camera.getComponent(ƒ.ComponentCamera).getMutatorAttributeTypes(mttCamera);
        console.log("mttCameraTypes: ", mttCameraTypes);
        let srlCamera = Scenes.camera.getComponent(ƒ.ComponentCamera).serialize();
        console.log("srlCamera: ", srlCamera);
        let srlNode = Scenes.node.serialize();
        console.log("srlNode: ", srlNode);
        animate();
    }
    function animate() {
        window.requestAnimationFrame(animate);
        angle += 0.03;
        mutator.translation["x"] = 5 * Math.sin(angle);
        mutator.scaling["y"] = Math.cos(1.7 * angle);
        cmpTransform.mutate(mutator);
        ƒ.RenderManager.update();
        Scenes.viewPort.draw();
    }
})(Mutable || (Mutable = {}));
//# sourceMappingURL=Mutable.js.map