export interface IGetItemBySection {
    length: number;
    section: string;
    items:   IItemData[];
}

export interface IItemData {
    id:          number;
    name:        string;
    description: string;
    quantity:    number;
    sectionId?:   string;
}

export interface IItem {
    id?:          number;
    name:        string;
    description: string;
    quantity:    number;
    section?:     string;
    sectionId?:   string;
}