class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
            this._config = config;
            this._initial = this._config.initial;
            this._previousState = null;
        } else {
            throw new TypeError("Invalid config");
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this._config.states){
            this._previousState = this._config.initial;
            this._config.initial = state;
        } else {
            throw new TypeError("State doesn't exist");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var states = this._config.states,
        eventFound = false,
        currentState,
        transitions;

        this._previousState = this._config.initial;

        for(var state in states){
            currentState = states[state];
            transitions = currentState.transitions;

            for(var transition in transitions){
                if(event == transition){
                    this._config.initial = transitions[transition];
                    eventFound = true;
                }
            }
        }

        if(!eventFound){
            throw new Error("Event doesn't exist");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._config.initial = this._initial
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

        for(var state in states){
            currentState = states[state];
            transitions = currentState.transitions;

            for(var transition in transitions){
                if(event == transition){
                    result.push(state);
                }
            }
        }

        if(!event){
            result = Object.keys(states);
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._previousState){
            this._config.initial = this._previousState;
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
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
