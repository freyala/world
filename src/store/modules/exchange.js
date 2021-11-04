import {tokens} from "./exchange_tokens/tokens.js"

export default {
  // --------------------------------------------------------------------------
  // Everything Related to Swap Component -------------------------------------
  // to map this functions to components you must add:
  // ...mapGetters('exchange', ['functionName, ...'])
  // then to call the function in the component: this.functionName()
  // --------------------------------------------------------------------------
  namespaced: true,

  state: {
    step: {
      swap: true,
      swapModal: false,
      swapper: false
    },

    swap: {},

    allTokens: [ 
      { 
        name: 'Freyala Ecosystem Tokens',
        icon: 'https://firebasestorage.googleapis.com/v0/b/defi-kingdoms.appspot.com/o/tokens%2FXYA.png?alt=media',
        tokens: tokens
      }
    ]
  },

  getters: {
    // Retrieves All tokens or by user input
    retrieveTokens: (state) => (search) => {
      let filtered = [];
      let regex = RegExp(`\w?${search}`, 'i')
  
      state.allTokens.forEach(network => {
        let tokenFound = {}
        
        Object.entries(network.tokens).forEach(([k, v]) => {
          if (v.Symbol.match(regex)) {
            tokenFound[k] = v
          }
        });
        if (Object.keys(tokenFound).length > 0) {
          filtered.push({
            name: network.name,
            icon: network.icon,
            tokens: tokenFound
          })
        }
      });

      if (search !== '') { 
        return filtered
      } else { 
        return state.allTokens 
      }
    },

    // It retrieves the exact token requested
    findToken: (state) => (token) => { 
      let found
      state.allTokens.forEach(network => {        
        Object.entries(network.tokens).forEach(([k, v]) => {
          if (v.Symbol.match(token)) {
            found = v
          }
        });
      });
      return found
    },

    // It retrieves the current state of token selection
    getToken: (state) => {
      return state.swap
    },

    // get current step state
    getStepState: (state) => (step) => {
      return state.step[step]
    },
  },
  
  actions: {
    // Navigate through Swap feature
    goTo({ commit }, value) {
      commit('_goTo', value)
    },

    // Triggers the 'twin' method in the mutations to
    // change the state.swap
    setToken({ commit }, value) {
      commit('_setToken', value)
    },

    // Switch Tokens before executing the swap
    switchTokens({ commit }) {
      commit('_switchTokens')
    },

    // Resets the token selection
    resetTokens({ commit }) {
      commit('_resetTokens')
    }
  },

  mutations: {
    _goTo: (state, value) => {
      Object.keys(state.step).forEach((s) => {
        s === String(value) ? state.step[s] = true : state.step[s] = false
      });
    },

    _setToken: (state, value) => {
      state.swap[value.tokenRef] = value.token
    },

    _switchTokens: (state) => {
      [state.swap.token1, state.swap.token2] = [state.swap.token2, state.swap.token1]
    },

    _resetTokens: (state) => {
      state.swap = {}
    }
  },

  modules: {
    // ------------------------------------------------------------------------
    // Everything Related to Swapper Component --------------------------------
    // ------------------------------------------------------------------------
    swapper: {
      namespaced: true,

      state: {
        amount: {
          0: '1.0',
          1: '0.0'
        },
        balance: {
          0: '0.0',
          1: '0.0'
        },
        lastSelected: 0,
        slippageRate: '0.5',
        priceImpact: '0.0',
        priceRate: '0.0',
        path: null,
        warnings: {}
      },
      getters: {
        getInputAmount: (state) => (token) => {
          return state.amount[token];
        },
        getBalanceToken: (state) => (token) => {
          return state.balance[token];
        },
        getSlippageRate: (state) => {
          return state.slippageRate;
        },
        getPriceImpact: (state) => {
          return state.priceImpact;
        },
        getPriceRate: (state) => {
          return state.priceRate;
        },
        getThePath: (state) => {
          return state.path;
        },
        getWarnings: (state) => {
          return state.warnings;
        }
      },
      actions: {
        setLastSelected({commit}, value) {
          commit('_setLastSelected', value);
        },
        setInputAmount({commit}, value) {
          commit('_setInputAmount', value);
        },
        setSlippageRate({commit}, value) {
          commit('_setSlippageRate', value);
        },
        setBalanceToken({commit}, value) {
          commit('_setBalanceToken', value);
        },
        setPriceImpact({commit}, value) {
          commit('_setPriceImpact', value);
        },
        setPriceRate({commit}, value) {
          commit('_setPriceRate', value);
        },
        setThePath({commit}, value) {
          commit('_setThePath', value);
        },
        setWarning({commit}, value) {
          commit('_setWarning', value);
        },
        deleteWarning({commit}, value) {
          commit('_deleteWarning', value);
        },
        resetAll({commit}) {
          commit('_resetAll');
        }
      },
      mutations: {
        _setLastSelected: (state, value) => {
          state.lastSelected = value
        },
        _setInputAmount: (state, value) => {
          let token = Object.keys(value)[0];
          state.amount[token] = value[token]
        },
        _setSlippageRate: (state, value) => {
          state.slippageRate = value;
        },
        _setBalanceToken: (state, value) => {
          let token = Object.keys(value)[0];
          state.balance[token] = value[token];
        },
        _setPriceImpact: (state, value) => {
          state.priceImpact = value;
        },
        _setPriceRate: (state, value) => {
          state.priceRate = value;
        },
        _setThePath: (state, value) => {
          state.path = value;
        },
        _setWarning: (state, value) => {
          let warningType = Object.keys(value)[0];
          state.warnings[warningType] = value[warningType];
        },
        _deleteWarning: (state, type) => {
          delete state.warnings[type]
        },
        _resetAll: (state) => {
          state.amount[0] = '1.0';
          state.amount[1] = '0.0';
          state.balance[0] = '0.0';
          state.balance[1] = '0.0';
          state.slippageRate = '0.5';
          state.priceImpact = '0.0';
          state.priceRate = '0.0';
          state.path = null;
          state.warnings = {};
        }
      },

      modules: {
        buttons: {
          namespaced: true,
  
          state: {
            buttons: {
              approve: {
                disabled: true,
                approve: false,
                approved: false,
                approving: false,
              },
              swap: {
                disabled: true,
                swap: false,
                swapped: false,
                swapping: false,
                loading: false
              }
            }
          },
      
          getters: {
            getBtnState: (state) => (value) => {
              // Grabs the button name passed in as argument
              let btn = Object.keys(value)[0];
              // Grabs the desired button state passed in as argument
              let btnState = value[btn];
    
              return state.buttons[btn][btnState];
            }
          },
    
          actions: {
            setBtnState({ commit }, value) {
              commit('_setBtnState', value)
            },
    
            resetButton({ commit }, value) {
              commit('_resetButton', value)
            }
          },
    
          mutations: {
            _resetButton: (state, button) => {
              Object.keys(state.buttons[button]).forEach((s) => {
                s === 'disabled' ?
                  state.buttons[button][s] = true :
                  state.buttons[button][s] = false
              })
            },
    
            _setBtnState: (state, value) => {
              // Grabs the button name passed in as argument
              let btn = Object.keys(value)[0];
              // Grabs the desired button state passed in as argument
              let btnState = value[btn];
              
              // Iterates over the desired button state and check
              // if the state argument matches so it can be changed to true.
              // All other button states should be false, we cannot have more than
              // one true state per button.
              Object.keys(state.buttons[btn]).forEach((s) => {
                s === String(btnState) ?
                  state.buttons[btn][s] = true :
                  state.buttons[btn][s] = false
              })
            }
          }
        }
      }
    }
  }
}