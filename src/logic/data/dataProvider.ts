//提供：数据
//单独联系storagemanager和rawdatageter，分别管理用户和拓展数据
import * as vscode from"vscode";
import { createOrganizedData, CustomData, OrganizedData, RawData } from "../../interfaces/datas";
import { getRawData } from "./rawdatageter";
import { getCustomData, update_CustomData } from "../storagemanager";

export let cachedRawData:Record<string, RawData>;
export let cachedCustomData:Record<string, CustomData>;
export let cachedOrganizedData:OrganizedData[] = [];

export function update(){
    //客户数据需要更新缓存
    update_CustomData();
    cachedCustomData = getCustomData();

    //原生数据直接拉取
    cachedRawData = getRawData().reduce((acc,item)=> {
        acc[item.id] = item;
         return acc;
    },{} as Record<string,RawData>);
}

export function getOrganizedData() {

    Object.values(cachedRawData||{}).forEach(rawItem => {
    cachedOrganizedData.push(
        createOrganizedData(rawItem,cachedCustomData[rawItem.id])
    );
});
}