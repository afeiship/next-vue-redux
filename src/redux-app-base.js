import COMMAND from './const';
import React from 'react';
import nx from 'next-js-core2';

class ReduxAppBase {
  static attachEmiterSystem() {
    delete nx.event.init;
    nx.mix(ReduxAppBase.prototype, {
      __listeners__: {}
    }, nx.event);
  }

  constructor() {
    nx.mix(ReduxAppBase, this.commandMethods());
    this.attachCommands();
  }

  commandMethods() {
    return {
      command: (inName, inData) => {
        this.command(inName, inData, this);
      },
      onCommand: (inName, inHandler) => {
        return this.onCommand(inName, inHandler, this);
      }
    };
  }

  attachCommands() {
    this.on(COMMAND, (_, inArgs) => {
      this.command && this.command(inArgs.name, inArgs.data);
    });
  }
}

ReduxAppBase.attachEmiterSystem();

export default ReduxAppBase;
