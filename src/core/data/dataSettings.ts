export type DataSettingsPartial = Partial<DataSettings>;

export class DataSettings {
    applyFilter = true;
    applyPaging = true;
    applySort = true;
    customGetData?:Function;	// Set when all applyFilter, applyPaging, applySort are set to false
}