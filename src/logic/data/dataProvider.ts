//提供：数据
import * as vscode from"vscode";
import { CustomData, RawData } from "../../interfaces/datas";
import { getRawData } from "./rawdatageter";

export let cachedRawDatas:Record<string, RawData>;

export let cachedCustomDatas:Record<string, CustomData>;

export function initCustomDatas(data:Record<string, CustomData>){
    cachedCustomDatas = data;
}






