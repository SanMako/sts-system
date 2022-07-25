import { RoleMenuRelation } from "/@/model/RoleModel";
import httpRequest from "/@/utils/HttpUtils";

const BASE_ROLE_URL = "role/v1/";

/**
 * 分页查询role列表
 * @param pageSize
 * @param currentPageNo
 * @param conditions
 * @returns
 */
export const getRolePageList = (
  pageSize?: number,
  currentPageNo?: number,
  conditions?: {}
) => {
  return httpRequest.GET(
    `${BASE_ROLE_URL}getRolePageList/${pageSize}/${currentPageNo}`,
    conditions
  );
};

/**
 * 根据roleId删除角色
 * @param roleId
 * @returns
 */
export const deleteRoleByRoleId = (roleId: string) => {
  return httpRequest.DELETE(`${BASE_ROLE_URL}deleteRoleByRoleId/${roleId}`);
};

/**
 * 新增角色
 * @param menu
 * @returns
 */
export const saveRole = (role: RoleMenuRelation) => {
  return httpRequest.POST(`${BASE_ROLE_URL}saveRole`, role);
};

/**
 * 根据id角色
 * @param menu
 * @returns
 */
export const getRoleByRoleId = (roleId: string) => {
  return httpRequest.GET(`${BASE_ROLE_URL}getRoleByRoleId/${roleId}`);
};

/**
 * 新增权限菜单映射
 */
export const bindingRoleMenu = (roleId: string, menuIds: string[]) => {
  return httpRequest.POST(`${BASE_ROLE_URL}bindingRoleMenu`, {
    roleId,
    menuIds,
  });
};

/**
 * 删除权限菜单映射
 */
export const unBundlingRoleMenu = (roleId: string, menuIds: string[]) => {
  return httpRequest.DELETE(`${BASE_ROLE_URL}unBundlingRoleMenu`, {
    roleId,
    menuIds,
  });
};
