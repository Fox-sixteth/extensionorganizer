//提供：数据
//单独联系storagemanager和rawdatageter，分别管理用户和拓展数据
import * as vscode from"vscode";
import { CustomData, RawData } from "../../interfaces/datas";
import { getRawData } from "./rawdatageter";

export let cachedRawDatas:Record<string, RawData>;
export let cachedCustomDatas:Record<string, CustomData>;

