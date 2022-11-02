import { Component, EventKeyboard, Input, input, KeyCode, _decorator, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Man')
export class Man extends Component {
    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {

    }

    onKeyDown(event: EventKeyboard) {
        const step = 50;
        const pos = this.node.position.clone();
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                pos.add3f(-step, 0, 0);
                break;

            case KeyCode.KEY_D:
                pos.add3f(step, 0, 0);
                break;

            case KeyCode.KEY_W:
                pos.add3f(0, step, 0);
                break;

            case KeyCode.KEY_S:
                pos.add3f(0, -step, 0);
                break;

            default:
                break;
        }

        this.node.setPosition(pos);
    }

    onKeyUp(event: EventKeyboard) {

    }
}
