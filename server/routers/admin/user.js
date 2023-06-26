"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/user', async function (req, res, next) {

    // const { page, page_size } = (0, utils_1.pagingData)({
    //     page: req.query.page,
    //     page_size: req.query.page_size
    // });
    const {account,createTimeStart,
        createTimeEnd,vipTimeStart,vipTimeEnd,svipTimeStart,svipTimeEnd} = req.query

    let {page,page_size,scoreMin,scoreMax} = req.query
    
    page = Number(page)
    page_size = Number(page_size)
    scoreMin = Number(scoreMin)
    scoreMax = Number(scoreMax)
    let where = {
        'account' : account,
        'integral>=': scoreMin,
        'integral<=': scoreMax,
        'create_time>=': createTimeStart,
        'create_time<=': createTimeEnd,
        'vip_expire_time>=': vipTimeStart,
        'vip_expire_time<=': vipTimeEnd,
        'svip_expire_time>=': svipTimeStart,
        'svip_expire_time<=': svipTimeEnd
      };
      
      if(account === ''){
        delete where['account'];
      }
      if (scoreMax === 0) {
        delete where['integral<='];
      }
      
      if (createTimeStart === '') {
        delete where['create_time>='];
      }
      
      if (createTimeEnd === '') {
        delete where['create_time<='];
      }
      
      if (vipTimeStart === '') {
        delete where['vip_expire_time>='];
      }
      
      if (vipTimeEnd === '') {
        delete where['vip_expire_time<='];
      }
      
      if (svipTimeStart === '') {
        delete where['svip_expire_time>='];
      }
      
      if (svipTimeEnd === '') {
        delete where['svip_expire_time<='];
      }
    const users = await models_1.userModel.getUsers({ page, page_size }, where);
    res.json((0, utils_1.httpBody)(0, users));
});
router.delete('/user/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.userModel.delUser(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.put('/user', async function (req, res, next) {
    const { id, account, avatar, integral, nickname, role, vip_expire_time, svip_expire_time } = req.body;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    // 修改用户
    const editRes = await models_1.userModel.editUser((0, utils_1.filterObjectNull)({
        id,
        account,
        avatar,
        integral,
        nickname,
        role,
        vip_expire_time,
        svip_expire_time
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
exports.default = router;
//# sourceMappingURL=user.js.map