class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
            this._config = config;
            this._initial = this._config.initial;
            this._previousStates = [];
            this._nextStates = [];
        } else {
            throw new TypeError("Invalid config");
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this._config.states){
            this._previousStates.push(this._initial);
            this._nextStates = [];
            this._initial = state;
        } else {
            throw new TypeError("State doesn't exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var transitions = this._config.states[this._initial].transitions;

        if(transitions[event]){
            this._previousStates.push(this._initial);
            this._nextStates = [];
            this._initial = transitions[event];
        } else {
            throw new Error();
        }

    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._initial = this._config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var states = this._config.states,
        currentState,
        transitions,
        result = [];

        if(!event){
            return Object.keys(states);
        }

        for(var state in states){
            transitions = states[state].transitions;

            for(var transition in transitions){
                if(event == transition){
                    result.push(state);
                }
            }
        }

        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._previousStates.length > 0){
            this._nextStates.push(this._initial);
            this._initial = this._previousStates.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._nextStates.length > 0){
            this._previousStates.push(this._initial);
            this._initial = this._nextStates.pop();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._previousStates = [];
        this._nextStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
