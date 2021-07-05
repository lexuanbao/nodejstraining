export interface User {
    userId: any;
    fullNane: string;
    kanaName: string;
    birthDay: string;
    editFlag?: boolean; //Xử lí button edit ở list user (thêm ? để ko bắt buộc)
}