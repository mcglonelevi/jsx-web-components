import jsx from './jsx';

class CustomElement extends HTMLElement {
    constructor(initialState = {}) {
        super();

        this.state = initialState;
        
        this.setState = this.setState;
        
        this.appendChild(this.render());
    }

    setState = (func) => {
        this.state = func(this.state);
        this.update();
    }

    update() {
        this.removeChild(this.firstChild);
        this.appendChild(this.render());
    }
}

class RedBox extends CustomElement {
    constructor() {
        super({
            count: 0,
            text: 'asdf',
        });
    }

    render() {
        return (
            <div
                onClick={() => {
                    this.setState((state) => ({
                        ...state,
                        count: state.count + 1,
                    }));
                }}
                style="background-color:red;"
            >
                test {this.state.count}
                <b>{this.state.text}</b>
                <input
                    type="text"
                    value={this.state.text}
                    onInput={(e) => {
                        this.setState((state) => ({
                            ...state,
                            text: e.target.value
                        })); 
                    }}
                >
                </input>
            </div>
        );
    }
}

customElements.define('custom-element', RedBox);
