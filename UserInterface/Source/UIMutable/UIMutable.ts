// / <reference types="../../../Core/Build/FudgeCore"/>
namespace FudgeUserInterface {
    import ƒ = FudgeCore;
    export abstract class UIMutable {
        protected timeUpdate: number = 190;
        protected root: HTMLElement;
        protected mutable: ƒ.Mutable;
        protected mutator: ƒ.Mutator;

        constructor(mutable: ƒ.Mutable) {
            this.root = document.createElement("div");
            this.mutable = mutable;
            this.mutator = mutable.getMutator();
            window.setInterval(this.refreshUI, this.timeUpdate);
            this.root.addEventListener("input", this.mutateOnInput);
        }

        protected mutateOnInput = (_e: Event) => {
            this.mutator = this.updateMutator(this.mutable, this.root);
            this.mutable.mutate(this.mutator);

        }

        protected refreshUI = (_e: Event) => {
            this.mutable.updateMutator(this.mutator);
            this.updateUI(this.mutable, this.root);
        }

        protected updateMutator(_mutable: ƒ.Mutable, _root: HTMLElement): ƒ.Mutator {
            let mutator: ƒ.Mutator = _mutable.getMutator();
            let mutatorTypes: ƒ.MutatorAttributeTypes = _mutable.getMutatorAttributeTypes(mutator);
            for (let key in mutator) {
                console.log(this.root.querySelector("#" + key));
                if (this.root.querySelector("#" + key) != null) {
                    let type: Object = mutatorTypes[key];
                    if (type instanceof Object) {
                        let selectElement: HTMLSelectElement = <HTMLSelectElement>_root.querySelector("#" + key);
                        selectElement.value = <string>mutator[key];
                    }
                    else {
                        let element: HTMLElement = _root.querySelector("#" + key);
                        let input: HTMLInputElement = <HTMLInputElement>element;
                        switch (type) {
                            case "Boolean":
                                mutator[key] = input.checked;
                                break;
                            case "String":
                            case "Number":
                                mutator[key] = input.value;
                                break;
                            case "Object":
                                let subMutable: ƒ.Mutable = (<ƒ.General>_mutable)[key];
                                mutator[key] = this.updateMutator(subMutable, element);
                                break;
                        }
                    }
                }
            }
            return mutator;
        }

        protected updateUI(_mutable: ƒ.Mutable, _root: HTMLElement): void {
            let mutator: ƒ.Mutator = _mutable.getMutator();
            let mutatorTypes: ƒ.MutatorAttributeTypes = _mutable.getMutatorAttributeTypes(mutator);
            for (let key in mutator) {
                if (this.root.querySelector("#" + key) != null) {
                    let type: Object = mutatorTypes[key];
                    if (type instanceof Object) {
                        let selectElement: HTMLSelectElement = <HTMLSelectElement>_root.querySelector("#" + key);
                        selectElement.value = <string>mutator[key];
                    }
                    else {
                        switch (type) {
                            case "Boolean":
                                let checkbox: HTMLInputElement = <HTMLInputElement>_root.querySelector("#" + key);
                                checkbox.checked = <boolean>mutator[key];
                                break;
                            case "String":
                                let textfield: HTMLInputElement = <HTMLInputElement>_root.querySelector("#" + key);
                                textfield.value = <string>mutator[key];
                                break;
                            case "Number":
                                let stepper: HTMLInputElement = <HTMLInputElement>_root.querySelector("#" + key);
                                stepper.value = <string>mutator[key];
                                break;
                            case "Object":
                                let fieldset: HTMLFieldSetElement = <HTMLFieldSetElement>_root.querySelector("#" + key);
                                let subMutable: ƒ.Mutable = (<any>_mutable)[key];
                                this.updateUI(subMutable, fieldset);
                                break;
                        }
                    }
                }
            }
        }
    }
}
