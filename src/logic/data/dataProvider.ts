//提供：数据
//单独联系storagemanager和rawdatageter，分别管理用户和拓展数据
import * as vscode from"vscode";
import { CustomData, RawData } from "../../interfaces/datas";
import { getRawData } from "./rawdatageter";
import { getCustomData, update_CustomData } from "../storagemanager";

export let cachedRawDatas:Record<string, RawData>;
export let cachedCustomDatas:Record<string, CustomData>;

export function update(){
    //客户数据需要更新缓存
    update_CustomData();
    cachedCustomDatas = getCustomData();

    //原生数据直接拉取
    cachedRawDatas = getRawData().reduce((acc,item)=> {
        acc[item.id] = item;
         return acc;
    },{} as Record<string,RawData>);
}

