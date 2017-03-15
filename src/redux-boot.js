var nx = require('next-js-core2');
var createStore=require('redux').createStore;
var bindActionCreators=require('redux').bindActionCreators;
var applyMiddleware = require('redux').applyMiddleware;
var ReduxThunk = require('redux-thunk').default;
var States = require('next-redux-base').ReduxStates;
var Actions = require('next-redux-base').ReduxActions;
var Reducers = require('next-redux-base').ReduxReducers;
var ReduxAppBase = require('./redux-app-base');

var ReduxBoot = nx.declare({
  statics:{
    run:function(inApp,inOptions){
      return new ReduxBoot(inApp,inOptions);
    }
  },
  methods:{
    init(inApp,inOptions){
      this._app = inApp;
      this._store = createStore(
        this.reducers.bind(this),
        applyMiddleware(ReduxThunk)
      );
      this._options = inOptions || {};
      this.subscribe();
      this.renderTo();
    },
    reducers:function (inState,inAction) {
      var initialState = this._app.initialState();
      return Reducers( inState || initialState ,inAction);
    },
    subscribe: function() {
      this._store.subscribe(this.renderTo.bind(this));
    },
    renderTo: function() {
      var self = this;
      Object.assign(ReduxAppBase,{
        store: self._store,
        getState:self._store.getState.bind(self),
        dispatch:self._store.dispatch.bind(self),
        actions:bindActionCreators(Actions, self._store.dispatch),
        update: States.getUpdate.bind(self,self._store),
        root: States.getRoot.bind(self,self._store),
        memory: States.getMemory.bind(self,self._store),
        request: States.getRequest.bind(self,self._store),
        local: States.getLocal.bind(self),
        session: States.getSession.bind(self),
      });
      new this._options.vue(
        Object.assign({
          render:function(createElement){
            return createElement(self._app);
          }
        },this._options)
      );
    }
  }
});

module.exports = ReduxBoot;
