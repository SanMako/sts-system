import { MenuModel } from "/@/model/MenuModel";
import httpRequest from "/@/utils/HttpUtils";

const BASE_MENU_URL = "menu/v1/";

/**
 * 获取菜单树
 * @returns
 */
export const getMenuTreeList = () => {
  return httpRequest.GET(`${BASE_MENU_URL}getMenuTreeList`);
};

/**
 * 根据父id获取菜单列表
 */
export const getMenuListByParentId = (parentId: string) => {
  return httpRequest.GET(`${BASE_MENU_URL}getMenuByParentId`, { parentId });
};

/**
 * 新增菜单
 * @param menu
 * @returns
 */
export const saveMenu = (menu: MenuModel) => {
  return httpRequest.POST(`${BASE_MENU_URL}saveMenu`, menu);
};

/**
 * 根据roleId获取menuIds
 */
export const getMenuIdsByRoleId = (roleId: string) => {
  return httpRequest.GET(`${BASE_MENU_URL}getMenuIdsByRoleId/${roleId}`);
};

/**
 * 根据menuId删除menu
 */
export const deleteMenuByMenuId = (menuId: string) => {
  return httpRequest.DELETE(`${BASE_MENU_URL}deleteMenuByMenuId/${menuId}`);
};

/**
 * 更新菜单
 * @param user
 * @returns
 */
export const updateMenuByMenuId = (menu: MenuModel) => {
  return httpRequest.PUT(`${BASE_MENU_URL}updateMenuByMenuId`, menu);
};
