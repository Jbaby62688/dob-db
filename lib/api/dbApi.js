'use strict';

const {
  Sequelize
} = require('sequelize');
const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');

class DbApi {
  static _clientMap = {};

  /**
   * @description 创建数据库客户端
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {String} param1.name 客户端名称
   * @param {Object} param1.config 客户端配置
   * @param {Object} param2
   * @param {Object} [param2.throwErrorFlag = true] 抛出错误标志
   * 
   * @returns {Boolean} 是否创建成功
   */
  static createClient(
    {
      name,
      config
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobDbApi::createClient';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger?.debug('name:', name);
      DobUtilApi.checkValue(
        {
          value: name
        },
        {
          type: DobUtilConstant.VALUE_TYPE_STRING,
          rule: {
            ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING
          }
        }
      );

      logger?.debug('config', config);
      DobUtilApi.checkValue(
        {
          value: config
        },
        {
          type: DobUtilConstant.VALUE_TYPE_OBJECT,
          rule: {
          }
        }
      );

      //创建客户端
      if (this._clientMap[name] === void 0) {
        this._clientMap[name] = new Sequelize(config);
      }

      //返回
      return true;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 获取数据库客户端
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {String} param1.name 客户端名称
   * @param {Object} param2
   * @param {Object} [param2.throwErrorFlag = true] 抛出错误标志
   * 
   * @returns {Object} 数据库客户端
   */
  static getClient(
    {
      name
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobDbApi::getClient';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger?.debug('name:', name);
      DobUtilApi.checkValue(
        {
          value: name
        },
        {
          type: DobUtilConstant.VALUE_TYPE_STRING,
          rule: {
            ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING
          }
        }
      );

      //获取客户端
      let client = this._clientMap[name] === undefined ? null : this._clientMap[name];

      //返回
      return client;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }

  /**
   * @description 销毁数据库客户端
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {String} param1.name 客户端名称
   * @param {Object} param2
   * @param {Object} [param2.throwErrorFlag = true] 抛出错误标志
   * 
   * @returns {Boolean} 
   */
  static async destroyClient(
    {
      name
    },
    {
      throwErrorFlag = true
    } = {}
  ) {
    const identifier = 'DobDbApi::destroyClient';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger?.debug('name:', name);
      DobUtilApi.checkValue(
        {
          value: name
        },
        {
          type: DobUtilConstant.VALUE_TYPE_STRING,
          rule: {
            ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING
          }
        }
      );

      //获取客户端
      let client = this.getClient(
        {
          name
        }
      );
  
      //销毁客户端
      delete this._clientMap[name];
      await client?.close();

      //返回
      return true;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = DbApi;